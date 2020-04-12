import React from 'react';
import PropTypes from 'prop-types';
import {graphql} from 'react-apollo';
import {useHistory, Route, useRouteMatch, Switch} from 'react-router-dom';

import {NavBar} from '../../components/navBar';
import {NameForm} from '../../components/nameForm';
import {Boards} from '../boards';
import {Board} from '../notes';

import query from '../../queries/userDetails';
import mutation from '../../mutations/addUser';
import {Popup} from '../../components/popup';

import {
    AUTH_TOKEN,
    REDIRECT_TOKEN,
    ERROR,
    NOTES
} from '../../constants';

const MainComponent = (props) => {
    const history = useHistory();
    const match = useRouteMatch();

    const {data, mutate, logout} = props;

    if (data.error) {
        history.push(ERROR);
    }
    if (data.loading) {
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

    const userLogout = () => {
        const token = localStorage.getItem(AUTH_TOKEN);
        logout(token);
        localStorage.removeItem(AUTH_TOKEN);
        sessionStorage.removeItem(REDIRECT_TOKEN);
    };

    const addUser = (name) => {
        mutate({
            variables: {
                id: props.id,
                name
            },
            refetchQueries: [{
                query,
                variables: {id: props.id}
            }]
        });
    };
    if (!userDetail) {
        return (
            <NameForm
                data={data}
                addUser={addUser}
            />
        );
    }

    return (
        <>
            <NavBar>
                <div className="user-name">
                    <span>{data.userDetail.name}</span>
                    <Popup>
                        <ul>
                            <li>Edit Profile</li>
                            <li onClick={userLogout}>Logout</li>
                        </ul>
                    </Popup>
                </div>
            </NavBar>
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

MainComponent.propTypes = {
    data: PropTypes.object,
    id: PropTypes.string,
    logout: PropTypes.func,
    mutate: PropTypes.func
};

export const Main = graphql(query, {
    options: (props) => ({
        variables: {
            id: props.id
        }
    })
})(graphql(mutation, {
    options: {
        awaitRefetchQueries: true
    }
})(MainComponent));