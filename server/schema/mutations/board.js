const graphql = require('graphql');
const mongoose = require('mongoose');

const {
	GraphQLID,
	GraphQLString
} = graphql;

const Board = mongoose.model('board');
const List = mongoose.model('list');
const Card = mongoose.model('card');
const Comment = mongoose.model('comment');

const BoardType = require('../types/board');

const boardMutation = {
	addBoard: {
		type: BoardType,
		args: {
			name: { type: GraphQLString },
			user: { type: GraphQLID }
		},
		resolve(parentValue, args) {
			return (new Board(args)).save();
		}
	},
	updateBoard: {
		type: BoardType,
		args: {
			name: { type: GraphQLString },
			id: { type: GraphQLID }
		},
		resolve(parentValue, {
			id,
			name
		}) {
			return Board.findByIdAndUpdate(id, {
				$set: {
					name
				}
			}, { 'new': true })
		}
	},
	deleteBoard: {
		type: BoardType,
		args: {
			id: { type: GraphQLID }
		},
		resolve(parentValue, { id }) {
			return Board.findById(id, function (err, board) {
				List.find({ board: board._id }, function (err, lists) {
					lists.forEach(function (list) {
						Card.find({ list: list._id }, function (err, cards) {
							cards.forEach(function (card) {
								Comment.deleteMany({ card: card._id }, function (err) {
									card.deleteOne();
								});
							});
						});
						list.deleteOne();
					})
				})
				board.deleteOne();
			})
		}
	}
}

module.exports = boardMutation;