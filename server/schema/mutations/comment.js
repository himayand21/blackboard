const graphql = require('graphql');
const mongoose = require('mongoose');

const {
	GraphQLString,
	GraphQLID
} = graphql;

const Comment = mongoose.model('comment');
const CommentType = require('../types/comment');

const commentMutation = {
	addComment: {
		type: CommentType,
		args: {
			content: { type: GraphQLString },
			sender: { type: GraphQLID },
			card: { type: GraphQLID }
		},
		resolve(parentValue, args) {
			return (new Comment(args)).save();
		}
	}
}

module.exports = commentMutation;