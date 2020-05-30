const mongoose = require('mongoose');
const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList
} = graphql;

const UserDetail = mongoose.model('userdetail');
const Board = mongoose.model('board');

const UserDetailType = new GraphQLObjectType({
    name: 'UserDetailType',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        connections: {type: new GraphQLList(GraphQLID)},
        connectionDetails: {
            type: new GraphQLList(UserDetailType),
            resolve(parentValue) {
                return UserDetail.find({
                    _id: {
                        $in: parentValue.connections
                    }
                });
            }
        },
        boards: {
            type: new GraphQLList(require('./board')),
            resolve(parentValue) {
                return Board.find({
                    user: parentValue.id
                });
            }
        }
    })
});

module.exports = UserDetailType;