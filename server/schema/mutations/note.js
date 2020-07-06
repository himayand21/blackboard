const graphql = require('graphql');
const mongoose = require('mongoose');

const {
    GraphQLID,
    GraphQLString,
    GraphQLBoolean
} = graphql;

const Note = mongoose.model('note');
const Comment = mongoose.model('comment');
const UserDetail = mongoose.model('userdetail');

const NoteType = require('../types/note');

const noteMutation = {
    addNote: {
        type: NoteType,
        args: {
            name: {type: GraphQLString},
            description: {type: GraphQLString},
            board: {type: GraphQLID},
            editor: {type: GraphQLString}
        },
        resolve(parentValue, args, context) {
            const {user: {id: userId}} = context;
            return (new Note({
                ...args,
                owner: userId,
                time: Date.now(),
                pinned: false
            })).save();
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
                $push: {
                    connections: sharingWith
                }
            });
            return Note.findByIdAndUpdate(id, {
                $push: {
                    sharedWith: sharingWith
                }
            });
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
            });
        }
    },
    deleteNote: {
        type: NoteType,
        args: {
            id: {type: GraphQLID}
        },
        resolve(parentValue, {id}) {
            return Note.findById(id, function(err, note) {
                // eslint-disable-next-line no-underscore-dangle
                Comment.deleteMany({note: note._id});
                note.deleteOne();
            });
        }
    },
    togglePinNote: {
        type: NoteType,
        args: {
            pinned: {type: GraphQLBoolean},
            id: {type: GraphQLID}
        },
        resolve(parentValue, {pinned, id}) {
            return Note.findByIdAndUpdate(id, {
                $set: {
                    pinned
                }
            }, {'new': true});
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