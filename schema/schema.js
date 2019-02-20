const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');
const User = require('./models/user');

const { 
    GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLList 
} = graphql

// To test GraphQL without Axios ( Data From APIs)
var targets = [
    { name: 'Aadi', sport: 'Cricket', id: '1'},
    { name: 'Potato', sport: 'Football', id: '2'},
    { name: 'Tomato', sport: 'Badminton', id: '3'},
    { name: 'Jake', sport: 'NineNine', id: '4'}
]

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        authClient: { type: GraphQLList }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        target: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve( parent, args ) {
                // return axios.get()
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Generic User who uses none of the SignIn APIs
        addTarget: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                sport: { type: GraphQLString }
            },
            resolve(parent, args){
                let user = new User({
                    name: args.name,
                    sport: args.sport
                });
                return user.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})