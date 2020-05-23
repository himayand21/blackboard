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
            id: {type: GraphQLID},
            name: {type: GraphQLString}
        },
        resolve(parentValue, {
            id: _id,
            name
        }) {
            return new UserDetail({
                _id,
                name
            }).save();
        }
    },
    updateUser: {
        type: UserDetailType,
        args: {
            id: {type: GraphQLID},
            name: {type: GraphQLString}
        },
        resolve(parentValue, {id, name}) {
            return UserDetail.findByIdAndUpdate(id, {
                $set: {
                    name
                }
            }, {'new': true});
        }
    }
};

module.exports = userDetailMutations;