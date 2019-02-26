const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type Key {
        _id: ID!
        val: String!
    }

    type User {
        _id: ID!
        name: String!
        username: String!
        email: String!
        passsword: String
        tokens: [Token!]
        sport: String!
        stats: [Stat!]
        requests: [Request!]
    }

    type Stat {
        _id: ID!
        name: String!
        description: String!
        value: String!
        holder: User!
    }

    type Connection {
        _id: ID!
        name: String!
        kind: String!
        key: Key!
        party: [Party!]!
        request: Request
    }

    type Party {
        _id: ID!
        members: [String!]
    }

    type Request {
        _id: ID!
        username: String!
        kind: String!
        party: Party!
    }

    type Token {
        _id: ID!
        type: String!
        value: String!
    }

    input KeyInput {
        val: String!
    }

    input UserInput {
        email: String!
        password: String!
        sport: String!
        name: String!
        username: String!
    }

    input StatInput {
        name: String!
        description: String!
        value: String!
    }

    input TokenInput {
        type: String!
        value: String!
    }

    input ConnectionInput {
        name: String!
        kind: String!
        key: KeyInput!
        party: [String!]!
    }

    input CompleteRequestInput {
        _id: ID!
        reqID: String!
    }

    input DeleteRequestInput {
        _id: ID!
        reqID: String!
    }

    input SyncFitInput {
        username: String!
        token: TokenInput!
    }

    type RootQuery {
        stats: [Stat!]!
        requests: [Request!]! 
    }

    type RootMutation {
        createStat(statInput: StatInput): Stat
        createUser(userInput: UserInput): User
        createConnection(connectionInput: ConnectionInput): Request
        completeRequest(completeRequestInput: CompleteRequestInput): Request
        deleteRequest(deleteRequestInput: DeleteRequestInput): Request
        syncFit(syncFitInput: SyncFitInput): [Stat!]
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

`)
