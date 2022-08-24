const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

module.exports = (req) => {
  // context == { ... headers }
  if (req.body) {
    let listIgnore = ["login", "register", "getMusicsFE"];
    let operationName = req.body.operationName;
    if (operationName && !listIgnore.includes(operationName)) {
      const authHeader = req.headers.authorization;
      if (authHeader) {
        // Bearer ......
        const token = authHeader.split("Bearer ")[1];
        if (token) {
          try {
            const user = jwt.verify(token, "secret");
            return user;
          } catch (err) {
            throw new AuthenticationError("Invalid/Expired token");
          }
        }
        throw new Error("401 : Not authorized");
      }
      throw new Error("401 : Not authorized");
    }
  }
};
