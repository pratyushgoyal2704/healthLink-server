const { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type Key {
        _id: ID!
        kind: String!
        value: String!
    }

    type User {
        _id: ID!
        name: String!
        key: Key!
        username: String!
        email: String!
        passsword: String
        tokens: [Token!]
        sport: String!
        stats: [Stat!]
        requests: [Request!]
        history: History
    }

    type Stat {
        _id: ID!
        date: String!
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
        sender: String!
        receiver: String!
    }

    type Request {
        _id: ID!
        kind: String!
        sender: String!
        receiver: String!
        key: Key!
    }

    type Token {
        _id: ID!
        kind: String!
        value: String!
    }

    type History {
        _id: ID!
        duration: Int!
        lastInput: String!
        lastSynced: String!
        holder: User!
    }

    input KeyInput {
        kind: String!
        value: String!
    }

    input UpdateHistoryInput {
        duration: Int!
        lastInput: String!
        lastSynced: String!
        holder: UserInput!
    }

    input UserInput {
        email: String!
        password: String!
        sport: String!
        name: String!
        username: String!
        clients: [String!]!
        tokensInput: [TokenInput!]!
    }

    input StatInput {
        day: String!
        name: String!
        description: String!
        value: String!
    }

    input StatsInput {
        stats: [StatInput!]!   
    }

    input TokenInput {
        kind: String!
        value: String!
    }

    input TokensInput {
        tokens: [TokenInput]!
    }

    input PartyInput {
        type: String!
    }

    input ConnectionInput {
        name: String!
        kind: String!
        key: KeyInput!
        party: [String!]!
    }

    input CreateRequestInput {
        _id: ID!
        kind: String!
        sender: String!
        Reciever: String!
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

    input PushIntoHistoryInput {
        kind: String!
        duration: Int!
        stats: StatsInput!
        lastSynced: String,
        lastInput: String
    }

    type AuthData {
        userId: ID!
        token: Key!
        tokenExpiration: Int!
    }

    type RootQuery {
        stats: [Stat!]!
        requests: [Request!]! 
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createStat(statInput: StatInput): Stat
        createUser(userInput: UserInput): User
        createConnection(connectionInput: ConnectionInput): Request
        completeRequest(completeRequestInput: CompleteRequestInput): Request
        deleteRequest(deleteRequestInput: DeleteRequestInput): Request
        syncFit(syncFitInput: SyncFitInput): [Stat!]
        pushIntoHistory(pushIntoHistoryInput: PushIntoHistoryInput): History
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }

`)
