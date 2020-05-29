const mongoose = require('mongoose');
const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = graphql;

const Note = mongoose.model('note');
const UserDetail = mongoose.model('userdetail');

const BoardType = new GraphQLObjectType({
    name: 'BoardType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        user: {type: GraphQLID},
        color: {type: GraphQLString},
        time: {type: GraphQLString},
        notes: {
            type: new GraphQLList(require('./note')),
            resolve(parentValue) {
                return Note.find({
                    board: parentValue.id
                }).sort('-time');
            }
        },
        userDetails: {
            type: require('./userDetail'),
            resolve(parentValue) {
                return UserDetail.findById(parentValue.user);
            }
        }
    })
});

module.exports = BoardType;