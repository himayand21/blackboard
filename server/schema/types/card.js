const mongoose = require('mongoose');
const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList
} = graphql;

const Comment = mongoose.model('comment');

const CardType = new GraphQLObjectType({
	name: 'CardType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		list: { type: GraphQLID },
		comments: {
			type: new GraphQLList(require("./comment")),
			resolve(parentValue) {
				return Comment.find({
					card: parentValue.id
				})
			}
		}
	})
});

module.exports = CardType;