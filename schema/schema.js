//  InCo-operate Object Class Structure Eventually 
const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');
const User = require('../models/User');

// GraphQL Res
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

// Deal with all the Admin Objects that can interact with Mutation of Activities & can manually or through an automated process update Gamification & other Resources
const AdminType = new GraphQLObjectType ({
    name: 'Admin',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        privileges: { type: GraphQLList }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        authClient: { type: GraphQLList }
    })
});

// Misc Data 
// const dataCapsuleOneType = new GraphQLObjectType ({
//     name: 'DataCapsuleOne',
//     fields: () => ({
//         id: { type: GraphQLID },
//         data: { type: GraphQLString },
//     })
// });

// const dataCapsuleTwoType = new GraphQLObjectType({
//     name: 'DataCapsuleTwo',
//     fields: () => ({
//         id: { type: GraphQLID },
//         data: { type: GraphQLString },
//     })
// });

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
        },
        // Target Update for Google user
        addGoogleTarget: {
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
        },
        // Target update for Facebook user
        addFacebookTarget: {
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
        },
        // Target update for Github user
        addGithubTarget: {
            type: UserType,
            args: {
                name: { type: GraphQLString },
                accessToken: { type: GraphQLString }
            },
            resolve(parent, args){
                let user = new User({
                    name: args.name,
                    accessToken: args.acessToken
                });
                return user.save();
            }
        },
        // Target update for Twitter user
        addTwitterTarget: {
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
        },
        // Target update for LinkedIn user
        addLinkedInTarget: {
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
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})