const mongoose = require('mongoose');
const graphql = require('graphql');

const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLList
} = graphql;

const UserDetail = mongoose.model('userdetail');
const List = mongoose.model('list');

const ListType = require('./list');
const UserDetailType = require('./userDetail');

const BoardType = new GraphQLObjectType({
	name: 'BoardType',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		user: { type: GraphQLID },
		userDetail: {
			type: UserDetailType,
			resolve(parentValue) {
				return UserDetail.findById(parentValue.user);
			}
		},
		lists: {
			type: new GraphQLList(ListType),
			resolve(parentValue) {
				return List.find({
					board: parentValue.id
				})
			}
		}
	})
});

module.exports = BoardType;