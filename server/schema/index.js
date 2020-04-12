const graphql = require('graphql');
// eslint-disable-next-line no-unused-vars
const models = require('../models');

const {GraphQLSchema} = graphql;

const RootQueryType = require('./rootQuery');
const mutation = require('./mutation');

module.exports = new GraphQLSchema({
    query: RootQueryType,
    mutation
});
