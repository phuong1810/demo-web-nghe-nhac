const { gql } = require('apollo-server');

const typeDefs = gql`

    type Category {
        id: ID!
        name: String!
        createdAt: String!
    }

    type Music {
        id: ID!
        name: String!
        singer: String
        thumbnailUrl: String
        status: String
        category: String
        createdAt: String
    }

    input MusicInput {
        name: String!
        singer: String
        thumbnailUrl: String
        status: String
        category: String
    }
    #Root type
    type Query{
        getCategories: [Category]
        getCategoriesById(id: String): Category
        getMusics: [Music]
        getMusicById(id: String): Music
        getUsers: [User]
    }

    type User { 
        id: ID!
        email: String!
        token: String!
        username: String!
        status: String!
        createdAt: String!
    }
    
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }

    
    
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!

        createMusic(musicInput: MusicInput): Music!
        updateMusic(id: String!, name: String!,singer: String,thumbnailUrl: String,status: String,category: String):Music!        
        deleteMusic(musicId: String!): String!

        createCategory(name: String!): Category!
        updateCategory(id: String!, name: String!):Category!        
        deleteCategory(categoryId: String!): String!
        
    }
`;

 {}module.exports = {typeDefs}