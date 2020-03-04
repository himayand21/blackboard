const graphql = require('graphql');
const mongoose = require('mongoose');

const {
	GraphQLID,
	GraphQLString
} = graphql;

const List = mongoose.model('list');
const Card = mongoose.model('card');
const Comment = mongoose.model('comment');

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
			id: { type: GraphQLID }
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
	},
	deleteList: {
		type: ListType,
		args: {
			id: { type: GraphQLID }
		},
		resolve(parentValue, { id }) {
			return List.findById(id, function (err, list) {
				Card.find({ list: list._id }, function (err, cards) {
					cards.forEach(function (card) {
						Comment.deleteMany({ card: card._id }, function (err) {
							card.deleteOne();
						});
					});
				});
				list.deleteOne();
			});
		}
	}
}

module.exports = listMutation;