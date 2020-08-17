const graphql = require('graphql');
const mongoose = require('mongoose');

const {
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} = graphql;

const Note = mongoose.model('note');
const Comment = mongoose.model('comment');
const Board = mongoose.model('board');
const UserDetail = mongoose.model('userdetail');

const NoteType = require('../types/note');
const BoardType = require('../types/board');
const UserDetailType = require('../types/userDetail');

const noteMutation = {
    addNote: {
        type: BoardType,
        args: {
            name: {type: GraphQLString},
            description: {type: GraphQLString},
            board: {type: GraphQLID},
            editor: {type: GraphQLString}
        },
        async resolve(parentValue, args, context) {
            const {user: {id: userId}} = context;
            const note = new Note({
                ...args,
                owner: userId,
                time: Date.now(),
                pinned: false
            });
            await note.save();
            return Board.findById(args.board);
        }
    },
    updateNote: {
        type: NoteType,
        args: {
            name: {type: GraphQLString},
            description: {type: GraphQLString},
            id: {type: GraphQLID},
            editor: {type: GraphQLString}
        },
        resolve(parentValue, {
            id,
            name,
            description,
            editor
        }) {
            return Note.findByIdAndUpdate(id, {
                $set: {
                    name,
                    description,
                    editor,
                    time: Date.now()
                }
            }, {'new': true});
        }
    },
    moveNote: {
        type: NoteType,
        args: {
            board: {type: GraphQLID},
            id: {type: GraphQLID}
        },
        resolve(parentValue, {
            id,
            board
        }) {
            return Note.findByIdAndUpdate(id, {
                $set: {
                    board
                }
            }, {'new': true});
        }
    },
    shareNote: {
        type: NoteType,
        args: {
            id: {type: GraphQLID},
            sharingWith: {type: GraphQLID}
        },
        async resolve(parentValue, {
            id,
            sharingWith
        }, context) {
            const {user: {id: userId}} = context;
            await UserDetail.findByIdAndUpdate(userId, {
                $addToSet: {
                    connections: sharingWith
                }
            });
            return Note.findByIdAndUpdate(id, {
                $addToSet: {
                    sharedWith: sharingWith
                }
            }, {'new': true});
        }
    },
    unshareNote: {
        type: NoteType,
        args: {
            id: {type: GraphQLID},
            unsharingWith: {type: GraphQLID}
        },
        async resolve(parentValue, {
            id,
            unsharingWith
        }) {
            return Note.findByIdAndUpdate(id, {
                $pull: {
                    sharedWith: unsharingWith
                }
            }, {'new': true});
        }
    },
    deleteNote: {
        type: UserDetailType,
        args: {
            id: {type: GraphQLID}
        },
        async resolve(parentValue, {id}, context) {
            const {user: {id: userId}} = context;
            const note = Note.findById(id);
            // eslint-disable-next-line no-underscore-dangle
            await Comment.deleteMany({note: id});
            await note.deleteOne();
            return UserDetail.findById(userId);
        }
    },
    togglePinNote: {
        type: UserDetailType,
        args: {
            pinned: {type: GraphQLBoolean},
            id: {type: GraphQLID}
        },
        async resolve(parentValue, {pinned, id}, context) {
            const {user: {id: userId}} = context;
            await Note.findByIdAndUpdate(id, {
                $set: {
                    pinned
                }
            }, {'new': true});
            return UserDetail.findById(userId);
        }
    },
    toggleShareWithEveryone: {
        type: NoteType,
        args: {
            sharedWithEveryone: {type: GraphQLBoolean},
            id: {type: GraphQLID}
        },
        resolve(parentValue, {sharedWithEveryone, id}) {
            return Note.findByIdAndUpdate(id, {
                $set: {
                    sharedWithEveryone
                }
            }, {'new': true});
        }
    }
};

module.exports = noteMutation;