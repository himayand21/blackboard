const mongoose = require('mongoose');
const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList
} = graphql;

const List = mongoose.model('list');

const BoardType = new GraphQLObjectType({
	name: 'BoardType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		user: { type: GraphQLID },
		lists: {
			type: new GraphQLList(require("./list")),
			resolve(parentValue) {
				return List.find({
					board: parentValue.id
				})
			}
		}
	})
});

module.exports = BoardType;