import React from 'react';
import {Card} from '../card';
import {Popup} from '../popup';

export const ListComponent = (props) => {
    const {
        cards,
        list,
        showAddCard,
        showEditList,
        removeList
    } = props;
    const {
        id: listId,
        name: listName
    } = list;
    const listCards = cards.filter(card => card.parent === listId);
	return (
        <section className="list-wrapper">
            <header className="list-header">
                <div className="list-name">{listName}</div>
                <Popup>
                    <button onClick={() => showEditList(list)}>Edit</button>
                    <button onClick={() => removeList({listId})}>Delete</button>
                </Popup>
            </header>
            <div className="cards-wrapper">
                {listCards.map((card, index) => (
                    <Card
                        key={`card-${card.id}`}
                        card={card}
                    />
                ))}
            </div>
            <footer className="card-footer">
                <button onClick={() => showAddCard(listId)}>
                    Add new Card
                </button>
            </footer>
        </section>
	)
};
