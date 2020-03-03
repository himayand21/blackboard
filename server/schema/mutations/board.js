const graphql = require('graphql');
const mongoose = require('mongoose');

const {
	GraphQLID,
	GraphQLString
} = graphql;

const Board = mongoose.model('board');
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
	}
}

module.exports = boardMutation;