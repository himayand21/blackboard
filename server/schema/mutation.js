const graphql = require('graphql');

const {
	GraphQLObjectType
} = graphql;

const userDetailMutations = require('./mutations/userDetail');
const boardMutations = require('./mutations/board');
const listMutations = require('./mutations/list');
const cardMutations = require('./mutations/card');
const commentMutations = require('./mutations/comment');

const mutation = new GraphQLObjectType({
	name: 'Mutation',
	fields: {
		...userDetailMutations,
		...boardMutations,
		...listMutations,
		...cardMutations,
		...commentMutations
	}
});

module.exports = mutation;