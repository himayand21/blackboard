import {connect} from 'react-redux';
import {ListComponent} from './ListComponent';
import './list.scss';
import {
    showAddCard,
    showEditList,
    removeList
} from '../../actions';

const mapStateToProps = (state) => {
	const {cards} = state;
	return ({
        cards
    });
}

export const List = connect(
    mapStateToProps,
    {
        showAddCard,
        showEditList,
        removeList
    }
)(ListComponent);