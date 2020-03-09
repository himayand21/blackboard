const mongoose = require('mongoose');
const graphql = require('graphql');
const {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull
} = graphql;

const Board = mongoose.model('board');
const BoardType = require('../types/board');

const boardQuery = {
	board: {
		type: BoardType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, { id }) {
			return Board.findById(id);
		}
	},
	boards: {
		type: new GraphQLList(BoardType),
		args: {
			user: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, { user }) {
			return Board.find({ user })
		}
	}
};

module.exports = boardQuery;