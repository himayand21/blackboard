import {connect} from 'react-redux';
import {MainComponent} from './MainComponent';
import './main.scss';
import {showAddBoard} from '../../actions';

const mapStateToProps = (state) => {
	const {boards} = state;
	return ({
        boards
    });
}

export const Main = connect(
    mapStateToProps,
    {showAddBoard}
)(MainComponent);