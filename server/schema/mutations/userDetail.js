const graphql = require('graphql');
const mongoose = require('mongoose');

const {
    GraphQLID,
    GraphQLString
} = graphql;

const UserDetail = mongoose.model('userdetail');
const UserDetailType = require('../types/userDetail');

const userDetailMutations = {
    addUser: {
        type: UserDetailType,
        args: {
            name: {type: GraphQLString},
            email: {type: GraphQLString}
        },
        resolve(parentValue, {
            name,
            email
        }, context) {
            const {user: {id: userId}} = context;
            return new UserDetail({
                _id: userId,
                name,
                email
            }).save();
        }
    },
    updateUser: {
        type: UserDetailType,
        args: {
            name: {type: GraphQLString}
        },
        resolve(parentValue, {name}, context) {
            const {user: {id: userId}} = context;
            return UserDetail.findByIdAndUpdate(userId, {
                $set: {
                    name
                }
            }, {'new': true});
        }
    },
    addConnection: {
        type: UserDetailType,
        args: {
            connection: {type: GraphQLID}
        },
        resolve(parentValue, {connection}, context) {
            const {user: {id: userId}} = context;
            return UserDetail.findByIdAndUpdate(userId, {
                $addToSet: {
                    connections: connection
                }
            }, {'new': true});
        }
    },
    removeConnection: {
        type: UserDetailType,
        args: {
            connection: {type: GraphQLID}
        },
        resolve(parentValue, {connection}, context) {
            const {user: {id: userId}} = context;
            return UserDetail.findByIdAndUpdate(userId, {
                $pull: {
                    connections: connection
                }
            }, {'new': true});
        }
    }
};

module.exports = userDetailMutations;