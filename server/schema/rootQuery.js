const graphql = require('graphql');

const {
    GraphQLObjectType,
} = graphql;

const userDetailQuery = require('./queries/userDetail');
const boardQuery = require('./queries/board');
const noteQuery = require('./queries/note');
const commentQuery = require('./queries/comment');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        ...boardQuery,
        ...userDetailQuery,
        ...noteQuery,
        ...commentQuery
    })
});

module.exports = RootQuery;