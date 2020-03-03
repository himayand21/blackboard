const mongoose = require('mongoose');
const graphql = require('graphql');
const {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull
} = graphql;

const List = mongoose.model('list');
const ListType = require('../types/list');

const listQuery = {
	list: {
		type: ListType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, { id }) {
			return List.findById(id);
		}
	},
	lists: {
		type: new GraphQLList(ListType),
		args: {
			board: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, { board }) {
			return List.find({ board })
		}
	}
};

module.exports = listQuery;