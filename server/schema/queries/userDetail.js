const mongoose = require('mongoose');
const graphql = require('graphql');

const {
    GraphQLID,
    GraphQLNonNull
} = graphql;

const UserDetail = mongoose.model('userdetail');
const UserDetailType = require('../types/userDetail');

const userDetailQuery = {
    userDetail: {
        type: UserDetailType,
        args: {
            id: {type: new GraphQLNonNull(GraphQLID)}
        },
        resolve(parentValue, {id}) {
            return UserDetail.findById(id);
        }
    }
};

module.exports = userDetailQuery;