import React from 'react';
import {Card} from '../card';

export const ListComponent = (props) => {
    const {cards, list, showAddCard} = props;
    const {
        cards: cardIds,
        id: listId,
        name: listName
    } = list;
    const listCards = cards.filter(card => cardIds.includes(card.id))
	return (
        <section className="list-wrapper">
            <header className="list-header">
                <div className="list-name">{listName}</div>
            </header>
            <div className="cards-wrapper">
                {listCards.map(card => <Card card={card} />)}
            </div>
            <footer className="card-footer">
                <button onClick={() => showAddCard(listId)}>
                    Add new Card
                </button>
            </footer>
        </section>
	)
};