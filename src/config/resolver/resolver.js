const categoryResolvers = require('./categories');
const musicResolvers = require('./musics');
const userResolvers = require('./users');

const resolvers = {
    Query: {
        ...categoryResolvers.Query,
        ...musicResolvers.Query,
        ...userResolvers.Query,
        
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...categoryResolvers.Mutation,
        ...musicResolvers.Mutation,
    }
};

module.exports = {resolvers}