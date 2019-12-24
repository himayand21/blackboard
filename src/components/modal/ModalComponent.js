import React from "react";
import {
    ADD_CARD_MODAL,
    EDIT_CARD_MODAL
} from '../../constants/modalTypes';
import {capitaliseFirst} from '../../util/capitaliseFirst';

export const ModalComponent = (props) => {
    const {
        show,
        modalType,
        form,
        formError
    } = props;
    if (!show) return null;

    const {
        hideModal,
        handleFormChange,
        addCard,
        updateCard
    } = props;

    const getFormDetails = (modalType) => {
        switch (modalType) {
            case ADD_CARD_MODAL:
                return ({
                    header: 'Add new Card',
                    handleSubmit: addCard
                });
            case EDIT_CARD_MODAL:
                return ({
                    header: 'Edit Card',
                    handleSubmit: updateCard
                })
            default:
                return null
        }
    }

    const {
        header,
        handleSubmit
    } = getFormDetails(modalType);

    return (
        <main className="modal-wrapper">
            <div className="modal-section">
                <header className="modal-header">
                    <div className="modal-header-label">{header}</div>
                    <button onClick={hideModal}><i className="fa fa-times" /></button>
                </header>
                {form ?
                <section className="modal-content">
                    {Object.keys(form).map(elem => (
                        <div className="form-row">
                            <div
                                className="form-label"
                            >
                                {capitaliseFirst(elem)}
                            </div>
                            <input
                                className={formError === elem ? 'error-input' : ''}
                                value={form[elem]}
                                onChange={(e) => handleFormChange(e.target.value, elem)}
                            />
                        </div>
                    ))}
                </section> : null}
                <footer className="modal-footer">
                    <button onClick={hideModal}>Close</button>
                    <button onClick={handleSubmit}>Save</button>
                </footer>
            </div>
        </main>
    )
}