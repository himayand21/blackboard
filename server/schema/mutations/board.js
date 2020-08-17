const graphql = require('graphql');
const mongoose = require('mongoose');

const {
    GraphQLID,
    GraphQLString
} = graphql;

const Board = mongoose.model('board');
const Note = mongoose.model('note');
const Comment = mongoose.model('comment');
const UserDetail = mongoose.model('userdetail');

const UserDetailType = require('../types/userDetail');
const BoardType = require('../types/board');

const boardMutation = {
    addBoard: {
        type: UserDetailType,
        args: {
            name: {type: GraphQLString},
            color: {type: GraphQLString}
        },
        async resolve(parentValue, args, context) {
            const {user: {id: userId}} = context;
            const board = new Board({
                ...args,
                user: userId,
                time: Date.now()
            });
            await board.save();
            return UserDetail.findById(userId);
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
        type: UserDetailType,
        args: {
            id: {type: GraphQLID}
        },
        async resolve(parentValue, {id}, context) {
            const {user: {id: userId}} = context;
            const board = Board.findById(id);
            await Note.find({board: id}, function(err, notes) {
                notes.forEach(function(note) {
                    // eslint-disable-next-line no-underscore-dangle
                    Comment.deleteMany({note: note._id});
                    note.deleteOne();
                });
            });
            await board.deleteOne();
            return UserDetail.findById(userId);
        }
    }
};

module.exports = boardMutation;