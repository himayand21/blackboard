const graphql = require('graphql');
const mongoose = require('mongoose');

const {
	GraphQLID,
	GraphQLString
} = graphql;

const Card = mongoose.model('card');
const Comment = mongoose.model('comment');

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
	},
	moveCard: {
		type: CardType,
		args: {
			id: { type: GraphQLID },
			list: { type: GraphQLID }
		},
		resolve(parentValue, {
			id,
			list
		}) {
			return Card.findByIdAndUpdate(id, {
				$set: {
					list
				}
			}, { 'new': true })
		}
	},
	deleteCard: {
		type: CardType,
		args: {
			id: { type: GraphQLID }
		},
		resolve(parentValue, { id }) {
			return Card.findById(id, function (err, card) {
				Comment.deleteMany({ card: card._id }, function (err) {
					card.deleteOne();
				})
			});
		}
	}
}

module.exports = cardMutation;