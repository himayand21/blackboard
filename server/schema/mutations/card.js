const graphql = require('graphql');
const mongoose = require('mongoose');

const {
	GraphQLID,
	GraphQLString
} = graphql;

const Card = mongoose.model('card');
const CardType = require('../types/card');

const cardMutation = {
	addCard: {
		type: CardType,
		args: {
			name: { type: GraphQLString },
			description: { type: GraphQLString },
			list: { type: GraphQLID }
		},
		resolve(parentValue, args) {
			return (new Card(args)).save();
		}
	},
	updateCard: {
		type: CardType,
		args: {
			name: { type: GraphQLString },
			description: { type: GraphQLString },
			id: { type: GraphQLID }
		},
		resolve(parentValue, {
			id,
			name,
			description
		}) {
			return Card.findByIdAndUpdate(id, {
				$set: {
					name,
					description
				}
			}, { 'new': true })
		}
	}
}

module.exports = cardMutation;