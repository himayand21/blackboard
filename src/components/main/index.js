import {connect} from 'react-redux';
import {MainComponent} from './MainComponent';
import './main.scss';

const mapStateToProps = (state) => {
	const {boards} = state;
	return ({
        boards
    });
}

export const Main = connect(
    mapStateToProps,
    null
)(MainComponent);