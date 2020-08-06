require('@babel/polyfill');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const serverless = require('serverless-http');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const server = require('./auth');

const schema = require('./schema');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const netlifyPrefix = process.env.NETLIFY_PREFIX;

mongoose.Promise = global.Promise;

const {
    createSchema,
    checkAuth,
    generateProtectedRoutes,
    generateUnprotectedRoutes
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

app.use(express.static(__dirname + '/build'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(`${netlifyPrefix}/user`, generateUnprotectedRoutes(model));

app.use(csrf({cookie: true}));
app.use(function(err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);
    res.status(500).send({
        error: {
            key: 'server_error',
            message: 'Some error occured.',
            status: 500
        }
    });
});

app.use(`${netlifyPrefix}/csrf-token`, function(req, res) {
    res.status(200).send({
        token: req.csrfToken()
    });
});

app.use(`${netlifyPrefix}/auth`, generateProtectedRoutes(model));
app.use(`${netlifyPrefix}/graphql`, checkAuth(model), expressGraphQL((req) => ({
    schema,
    context: {user: req.user},
    graphiql: true
})));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

module.exports = app;
module.exports.handler = serverless(app);