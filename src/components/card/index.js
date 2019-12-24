import {connect} from 'react-redux';
import {CardComponent} from './CardComponent';
import {
    addCommentToCard,
    showEditCard,
    removeCard
} from '../../actions';
import './card.scss';

const mapStateToProps = (state) => {
	const {comments} = state;
	return ({
        comments
    });
}

export const Card = connect(
    mapStateToProps,
    {
        addCommentToCard,
        showEditCard,
        removeCard
    }
)(CardComponent);