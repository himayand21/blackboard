const graphql = require('graphql');
const mongoose = require('mongoose');

const {
	GraphQLID,
	GraphQLString
} = graphql;

const List = mongoose.model('list');
const ListType = require('../types/list');

const listMutation = {
	addList: {
		type: ListType,
		args: {
			name: { type: GraphQLString },
			board: { type: GraphQLID }
		},
		resolve(parentValue, args) {
			return (new List(args)).save();
		}
	},
	updateList: {
		type: ListType,
		args: {
			name: { type: GraphQLString },
			id: {type: GraphQLID }
		},
		resolve(parentValue, {
			id,
			name
		}) {
			return List.findByIdAndUpdate(id, {
				$set: {
					name
				}
			}, { 'new': true })
		}
	}
}

module.exports = listMutation;