import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {useHistory, Route, useRouteMatch, Switch} from 'react-router-dom';

import {ViewNote} from '../../pages/notes/common/ViewNote';

import {NavBar} from '../../components/navBar';
import {Toast} from '../../components/toast/Toast';
import {withToast} from '../../components/toast/withToast';
import {Popup} from '../../components/popup';
import {Modal} from '../../components/modal';

import getUserDetails from '../../queries/userDetails';
import addUser from '../../mutations/addUser';

import {Boards} from '../boards';
import {Board} from '../notes';
import {Tour} from '../tour';
import {RedirectToBoard} from '../boards/RedirectToBoard';

import {
    REDIRECT_TOKEN,
    ERROR,
    NOTES,
    DASHBOARD
} from '../../constants';
import {Icon} from '../../components/icon';
import {Loader} from '../../components/loader';
import {NameForm} from './NameForm';
import {UpdateNameForm} from './UpdateNameForm';
import {ChangePassword} from './ChangePassword';
import {Connections} from './connections';

const MainComponent = (props) => {
    const [clickPosition, setClickPosition] = useState({
        x: 0,
        y: 0
    });
    const [show, setShow] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [changePasswordVisible, setChangePasswordVisible] = useState(false);
    const [connectionsVisible, setConnectionsVisible] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [showTour, setShowTour] = useState(false);

    const history = useHistory();
    const match = useRouteMatch();

    const {id, logout, email, csrfToken, addToast} = props;

    const {data, loading, error} = useQuery(getUserDetails);
    const [add, {loading: adding, error: mutationError}] = useMutation(addUser, {
        refetchQueries: [{
            query: getUserDetails
        }],
        awaitRefetchQueries: true
    });

    useEffect(() => {
        if (error) {
            history.push(ERROR);
        }
    }, [error]);

    if (error) {
        return null;
    }

    if (loading) {
        return (
            <div className="screen-loader">
                <div className="loading-section">
                    <span className="loading-user-details">
                        Fetching your details ...
                    </span>
                </div>
            </div>
        );
    }

    const {userDetail} = data;

    const userLogout = async () => {
        setLoggingOut(true);
        await logout();
        sessionStorage.removeItem(REDIRECT_TOKEN);
    };

    const handleAddUser = (name) => {
        add({
            variables: {
                id,
                name,
                email
            }
        });
    };

    if (!userDetail) {
        return (
            <>
                {mutationError ? (
                    <Toast content={{
                        message: 'Uh Oh! Failed to create your profile.',
                        type: 'error'
                    }} />
                ) : null}
                <NameForm
                    data={data}
                    addUser={handleAddUser}
                    email={email}
                    adding={adding}
                />
            </>
        );
    }

    const {
        name: userName,
        connectionDetails,
        connections: connectionIds
    } = userDetail;

    const showPopup = (event) => {
        const x = event.clientX;
        const y = event.clientY;
        setClickPosition({x, y});
        setShow(true);
    };

    const hidePopup = () => {
        setShow(false);
        setClickPosition({
            x: 0,
            y: 0
        });
    };

    const showEditForm = () => {
        setShow(false);
        setEditVisible(true);
    };
    const hideEditForm = () => setEditVisible(false);

    const showChangePassword = () => {
        setShow(false);
        setChangePasswordVisible(true);
    };
    const hideChangePassword = () => setChangePasswordVisible(false);

    const showConnections = () => {
        setShow(false);
        setConnectionsVisible(true);
    };
    const hideConnections = () => setConnectionsVisible(false);

    const onTitleClick = () => {
        sessionStorage.removeItem(REDIRECT_TOKEN);
        history.push(DASHBOARD);
    };

    const openGithubIssues = () => {
        const GITHUB_URL = 'https://github.com/himayand21/blackboard/issues';
        window.open(GITHUB_URL, '_blank');
    };

    const openTourModal = () => setShowTour(true);
    const hideTourModal = () => setShowTour(false);

    return (
        <>
            <NavBar onTitleClick={onTitleClick}>
                <div className="user-name">
                    <Icon name={userName} />
                    <span className="user-first-name">{userName}</span>
                    <Popup
                        show={show}
                        hidePopup={hidePopup}
                        position={{
                            right: (window.innerWidth - clickPosition.x),
                            top: clickPosition.y + 10
                        }}
                    >
                        <ul>
                            <li onClick={showEditForm}>Edit Profile</li>
                            <li onClick={showChangePassword}>Change Password</li>
                            <li onClick={showConnections}>My Connections</li>
                            <li onClick={loggingOut ? null : userLogout}>
                                <span>Logout</span>
                                {loggingOut ? <Loader /> : null}
                            </li>
                            <li className="popup-dividor" />
                            <li onClick={openTourModal}>Quick Tour</li>
                            <li onClick={openGithubIssues}>Report an Issue</li>
                        </ul>
                    </Popup>
                    <i className="fas fa-ellipsis-v popup-trigger" onClick={showPopup} />
                </div>
            </NavBar>
            {editVisible ? (
                <Modal
                    show={editVisible}
                    hideModal={hideEditForm}
                >
                    <UpdateNameForm
                        id={props.id}
                        hideModal={hideEditForm}
                        placeholder={userName}
                    />
                </Modal>
            ) : null}
            {showTour ? (
                <Modal
                    show={showTour}
                    hideModal={hideTourModal}
                >
                    <Tour />
                </Modal>
            ) : null}
            {changePasswordVisible ? (
                <Modal
                    show={changePasswordVisible}
                    hideModal={hideChangePassword}
                >
                    <ChangePassword
                        hideModal={hideChangePassword}
                        csrfToken={csrfToken}
                        addToast={addToast}
                    />
                </Modal>
            ) : null}
            {connectionsVisible ? (
                <Modal
                    show={connectionsVisible}
                    hideModal={hideConnections}
                >
                    <Connections
                        connections={connectionDetails}
                        connectionIds={connectionIds}
                    />
                </Modal>
            ) : null}
            <Switch>
                <Route path={`${match.path}/note/:noteId`}>
                    <ViewNote
                        backURL={`${match.path}`}
                        user={props.id}
                        boards={userDetail.boards}
                    />
                </Route>
                <Route path={`${match.path}/:boardId${NOTES}`}>
                    <Board
                        user={props.id}
                        boards={userDetail.boards}
                    />
                </Route>
                <Route exact path={`${match.path}/:boardId`}>
                    <RedirectToBoard />
                </Route>
                <Route exact path={match.path}>
                    <Boards data={userDetail} />
                </Route>
            </Switch>
        </>
    );
};

MainComponent.propTypes = {
    id: PropTypes.string,
    logout: PropTypes.func,
    email: PropTypes.string,
    csrfToken: PropTypes.string,
    addToast: PropTypes.func
};

export const Main = withToast(MainComponent);