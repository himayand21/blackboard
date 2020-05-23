import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useQuery, useMutation} from '@apollo/react-hooks';
import {useHistory, Route, useRouteMatch, Switch} from 'react-router-dom';

import {NavBar} from '../../components/navBar';
import {Boards} from '../boards';
import {Board} from '../notes';

import query from '../../queries/userDetails';
import mutation from '../../mutations/addUser';
import {Popup} from '../../components/popup';
import {Modal} from '../../components/modal';

import {
    AUTH_TOKEN,
    REDIRECT_TOKEN,
    ERROR,
    NOTES
} from '../../constants';
import {Icon} from '../../components/icon';
import {Loader} from '../../components/loader';
import {NameForm} from './NameForm';
import {UpdateNameForm} from './UpdateNameForm';

export const Main = (props) => {
    const [clickPosition, setClickPosition] = useState({
        x: 0,
        y: 0
    });
    const [show, setShow] = useState(false);
    const [editVisible, setEditVisible] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);

    const history = useHistory();
    const match = useRouteMatch();

    const {id, logout, email} = props;

    const {data, loading, error} = useQuery(query, {
        variables: {
            id
        }
    });

    const [mutate, {loading: adding}] = useMutation(mutation, {
        awaitRefetchQueries: true
    });

    if (error) {
        history.push(ERROR);
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
        const token = localStorage.getItem(AUTH_TOKEN);
        setLoggingOut(true);
        await logout(token);
        localStorage.removeItem(AUTH_TOKEN);
        sessionStorage.removeItem(REDIRECT_TOKEN);
    };

    const addUser = (name) => {
        mutate({
            variables: {
                id,
                name
            },
            refetchQueries: [{
                query,
                variables: {id}
            }]
        });
    };

    if (!userDetail) {
        return (
            <NameForm
                data={data}
                addUser={addUser}
                email={email}
                adding={adding}
            />
        );
    }

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

    return (
        <>
            <NavBar>
                <div className="user-name">
                    <Icon name={data.userDetail.name} />
                    <span className="user-first-name">{data.userDetail.name}</span>
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
                            <li onClick={loggingOut ? null : userLogout}>
                                <span>Logout</span>
                                {loggingOut ? <Loader /> : null}
                            </li>
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
                    />
                </Modal>
            ) : null}
            <Switch>
                <Route path={`${match.path}/:boardId${NOTES}`}>
                    <Board />
                </Route>
                <Route path={match.path}>
                    <Boards id={props.id} />
                </Route>
            </Switch>
        </>
    );
};

Main.propTypes = {
    id: PropTypes.string,
    logout: PropTypes.func,
    email: PropTypes.string
};
