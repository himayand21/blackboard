require('@babel/polyfill');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const cookieParser = require('cookie-parser');

const server = require('./auth');

const schema = require('./schema');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = global.Promise;

const {
    createSchema,
    checkAuth,
    createAuth
} = server;

const app = express();

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
const model = createSchema(db);

db.once('open', () => {
    console.log('Connected to MongoLab instance.');
}).on('error', (error) => console.log('Error connecting to MongoLab:', error));

app.listen(PORT, () => {
    console.log('Listening');
});

app.use(cookieParser());

app.use(express.static(__dirname + '/build'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const netlifyPrefix = process.env.NETLIFY_PREFIX;

app.use(`${netlifyPrefix}/user`, createAuth(model));
app.use(`${netlifyPrefix}/graphql`, checkAuth(model), expressGraphQL({
    schema,
    graphiql: true
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

module.exports = app;
module.exports.handler = serverless(app);