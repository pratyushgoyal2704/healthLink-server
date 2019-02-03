const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema.js')
const keys = require('./config/keys.js');
const mongoose = require('mongoose');

const app = express();

mongoose.connect(keys.mongoDB.dbURI);
mongoose.connection.once('open', () => {
    console.log('Connection to mLab estabilished');
});

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(5500, () => {
    console.log('Server Up & Running');
});