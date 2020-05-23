const graphql = require('graphql');

const {
    GraphQLObjectType
} = graphql;

const userDetailMutations = require('./mutations/userDetail');
const boardMutations = require('./mutations/board');
const noteMutations = require('./mutations/note');
const commentMutations = require('./mutations/comment');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        ...userDetailMutations,
        ...boardMutations,
        ...noteMutations,
        ...commentMutations
    }
});

module.exports = mutation;