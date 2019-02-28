const express = require('express');
const graphqlHTTP = require('express-graphql');
const bodyParser = require('body-parser');

// const schema = require('./schema/schema.js');
const keys = require('./config/keys.js');
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

mongoose.connect(keys.mongoDB.dbURI);
mongoose.connection.once('open', () => {
    console.log('Connection to Atlas estabilished');
});

app.use('/graphql', graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));


app.listen(process.env.PORT || 8000, () => {
    console.log('Server Up & Running');
});