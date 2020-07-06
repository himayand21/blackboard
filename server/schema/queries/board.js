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
            id: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve(parentValue, {id}, context) {
            const {user: {id: userId}} = context;
            return Board.findOne({
                _id: id,
                user: userId
            });
        }
    },
    boards: {
        type: new GraphQLList(BoardType),
        resolve(parentValue, args, context) {
            const {user: {id: userId}} = context;
            return Board.find({user: userId}).sort('-time');
        }
    }
};

module.exports = boardQuery;