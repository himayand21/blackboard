import {connect} from 'react-redux';
import {BoardComponent} from './BoardComponent';
import './board.scss';

const mapStateToProps = (state) => {
	const {lists} = state;
	return ({
        lists
    });
}

export const Board = connect(
    mapStateToProps,
    null
)(BoardComponent);