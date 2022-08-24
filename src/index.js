const { ApolloServer } = require("apollo-server");
const db = require("./config/db");
const { typeDefs } = require("./config/schema/schema");
const { resolvers } = require("./config/resolver/resolver");
const checkAuth = require("./validate/check-auth");
// const { existsSync, mkdirSync } = require("fs");
const port = 5000;
const path = require("path");
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: [
      "http://0.0.0.0:3000",
      "http://0.0.0.0",
      "https://0.0.0.0:3000",
      "https://0.0.0.0",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  },
  context: ({ req }) => {
    checkAuth(req);
  },
});
db.connect();

//existsSync(path.join(__dirname, "../images")) ||
//mkdirSync(path.join(__dirname, "../images"));

// app.use("/images", express.static(path.join(__dirname, "../images")));

server.listen({ port }).then((res) => {
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
});
