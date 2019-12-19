import {connect} from 'react-redux';
import {NavBarComponent} from './NavBarComponent';
import './navBar.scss';

const mapStateToProps = (state) => {
	const {user} = state;
	return ({ ...user });
}

export const NavBar = connect(
    mapStateToProps,
    null
)(NavBarComponent);