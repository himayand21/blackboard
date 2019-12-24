import {connect} from 'react-redux';
import {ListComponent} from './ListComponent';
import './list.scss';
import {showAddCard} from '../../actions';

const mapStateToProps = (state) => {
	const {cards} = state;
	return ({
        cards
    });
}

export const List = connect(
    mapStateToProps,
    {showAddCard}
)(ListComponent);