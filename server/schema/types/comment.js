const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString
} = graphql;

const CommentType = new GraphQLObjectType({
	name: 'CommentType',
	fields: () => ({
		id: { type: GraphQLID },
		content: { type: GraphQLString },
		sender: { type: GraphQLID },
		card: { type: GraphQLID }
	})
});

module.exports = CommentType;