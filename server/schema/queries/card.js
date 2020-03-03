const mongoose = require('mongoose');
const graphql = require('graphql');
const {
	GraphQLList,
	GraphQLID,
	GraphQLNonNull
} = graphql;

const Card = mongoose.model('card');
const CardType = require('../types/card');

const cardQuery = {
	card: {
		type: CardType,
		args: {
			id: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, { id }) {
			return Card.findById(id);
		}
	},
	cards: {
		type: new GraphQLList(CardType),
		args: {
			list: { type: new GraphQLNonNull(GraphQLID) }
		},
		resolve(parentValue, { list }) {
			return Card.find({ list })
		}
	}
};

module.exports = cardQuery;