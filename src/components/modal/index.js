import {connect} from 'react-redux';
import {ModalComponent} from './ModalComponent';
import './modal.scss';
import {
    hideModal,
    handleFormChange,
    addCard,
    updateCard,
    addList,
    updateList,
    updateBoard,
    addBoard
} from '../../actions';

const mapStateToProps = (state) => {
	const {modal} = state;
	return ({
        ...modal
    });
}

export const Modal = connect(
    mapStateToProps,
    {
        hideModal,
        handleFormChange,
        addCard,
        updateCard,
        addList,
        updateList,
        updateBoard,
        addBoard
    }
)(ModalComponent);