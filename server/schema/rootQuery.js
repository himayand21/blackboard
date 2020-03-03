const graphql = require('graphql');
const {
	GraphQLObjectType,
} = graphql;

const userDetailQuery = require('./queries/userDetail');
const boardQuery = require('./queries/board');
const listQuery = require('./queries/list');

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: () => ({
		...boardQuery,
		...userDetailQuery,
		...listQuery
	})
});

module.exports = RootQuery;