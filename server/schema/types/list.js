const mongoose = require('mongoose');
const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = graphql;

const ListType = new GraphQLObjectType({
  name:  'ListType',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
	board: { type: GraphQLID }
  })
});

module.exports = ListType;