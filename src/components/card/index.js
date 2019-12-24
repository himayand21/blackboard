import {connect} from 'react-redux';
import {CardComponent} from './CardComponent';
import {
    addComment,
    showEditCard,
    removeCard,
    moveCardToList
} from '../../actions';
import './card.scss';

const mapStateToProps = (state) => {
	const {comments, lists} = state;
	return ({
        comments,
        lists
    });
}

export const Card = connect(
    mapStateToProps,
    {
        addComment,
        showEditCard,
        removeCard,
        moveCardToList
    }
)(CardComponent);