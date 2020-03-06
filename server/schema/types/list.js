const mongoose = require('mongoose');
const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList
} = graphql;

const Card = mongoose.model('card');

const ListType = new GraphQLObjectType({
	name: 'ListType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		board: { type: GraphQLID },
		cards: {
			type: new GraphQLList(require("./card")),
			resolve(parentValue) {
				return Card.find({
					list: parentValue.id
				})
			}
		}
	})
});

module.exports = ListType;