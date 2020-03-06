import { connect } from 'react-redux';
import { WelcomeComponent } from './WelcomeComponent';
import {
	showSignupModal,
	showLoginModal,
	hideModal
} from '../../actions';

export const Welcome = connect(
	null,
	{
		showSignupModal,
		showLoginModal,
		hideModal
	}
)(WelcomeComponent);