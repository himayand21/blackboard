const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString
} = graphql;

const CommentType = new GraphQLObjectType({
    name: 'CommentType',
    fields: () => ({
        id: {type: GraphQLID},
        content: {type: GraphQLString},
        sender: {type: GraphQLID},
        note: {type: GraphQLID}
    })
});

module.exports = CommentType;