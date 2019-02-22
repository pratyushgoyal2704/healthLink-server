//  InCo-operate Object Class Structure Eventually 
const graphql = require('graphql');
const _ = require('lodash');
const axios = require('axios');
const User = require('./User.js');

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
        sport: { type: GraphQLString }
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        sport: { type: GraphQLString }
    })
});

const AvatarType = new GraphQLObjectType ({
    name: 'Activity',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    })
});

const ActivityType = new GraphQLObjectType({
    name: 'Activity',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
    })
});

const FitStatsType = new GraphQLObjectType({
    name: 'FitStats',
    fields: () => ({
        id: { type: GraphQLString },
        target: {}
    })
});

const GuildTaskType = new GraphQLObjectType ({
    name: 'GuildTask',
    fields: () => ({
        id: { type: GraphQLString },
        target: {}
    })
})

const EnlistmentType = new GraphQLObjectType({
    name: 'Enlistment',
    fields: () => ({
        id: { type: GraphQLString },
        target: {}
    })
});

const GuildType = new GraphQLObjectType({
    name: 'Guild',
    fields: () => ({
        id: { type: GraphQLString },
        target: {}
    })
})

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