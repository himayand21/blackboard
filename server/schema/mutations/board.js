const graphql = require('graphql');
const mongoose = require('mongoose');

const {
    GraphQLID,
    GraphQLString
} = graphql;

const Board = mongoose.model('board');
const Note = mongoose.model('note');
const Comment = mongoose.model('comment');

const BoardType = require('../types/board');

const boardMutation = {
    addBoard: {
        type: BoardType,
        args: {
            name: {type: GraphQLString},
            color: {type: GraphQLString}
        },
        resolve(parentValue, args, context) {
            const {user: {id: userId}} = context;
            return (new Board({
                ...args,
                user: userId,
                time: Date.now()
            })).save();
        }
    },
    updateBoard: {
        type: BoardType,
        args: {
            name: {type: GraphQLString},
            id: {type: GraphQLID},
            color: {type: GraphQLString}
        },
        resolve(parentValue, {
            id,
            name,
            color
        }) {
            return Board.findByIdAndUpdate(id, {
                $set: {
                    name,
                    color,
                    time: Date.now()
                }
            }, {'new': true});
        }
    },
    deleteBoard: {
        type: BoardType,
        args: {
            id: {type: GraphQLID}
        },
        resolve(parentValue, {id}) {
            return Board.findById(id, function(err, board) {
                // eslint-disable-next-line no-underscore-dangle
                Note.find({board: board._id}, function(err, notes) {
                    notes.forEach(function(note) {
                        // eslint-disable-next-line no-underscore-dangle
                        Comment.deleteMany({note: note._id});
                        note.deleteOne();
                    });
                });
                board.deleteOne();
            });
        }
    }
};

module.exports = boardMutation;