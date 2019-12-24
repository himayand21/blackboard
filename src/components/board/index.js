import {connect} from 'react-redux';
import {BoardComponent} from './BoardComponent';
import './board.scss';
import {
    showAddList,
    showEditBoard,
    removeBoard
} from '../../actions';

const mapStateToProps = (state) => {
	const {lists} = state;
	return ({
        lists
    });
}

export const Board = connect(
    mapStateToProps,
    {
        showAddList,
        showEditBoard,
        removeBoard
    }
)(BoardComponent);