const { ApolloServer } = require('apollo-server');
const db = require('./config/db')
const { typeDefs } = require('./config/schema/schema')
const { resolvers } = require('./config/resolver/resolver')
const port = 5000;
const server = new ApolloServer({
    typeDefs,
    resolvers
});
db.connect();
server.listen({ port }).then((res) => {
    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
});