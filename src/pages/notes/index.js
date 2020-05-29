import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useRouteMatch, Switch, Route, useHistory} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';

import query from '../../queries/boardDetails';

import {ERROR} from '../../constants';

import {Notes} from './Notes';
import {ViewNote} from './common/ViewNote';
import {EditNote} from './admin/EditNote';

export const Board = (props) => {
    const history = useHistory();
    const match = useRouteMatch();

    const backURL = match.url;
    const {boardId} = match.params;

    const {loading, data, error} = useQuery(query, {
        variables: {
            id: boardId
        }
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
            <div className="boards-wrapper">
                <div className="loading-section">
                    <span className="loading-board-details">
                        Loading your Notes ...
                    </span>
                </div>
            </div>
        );
    }

    const {board} = data;
    const {notes, color, name} = board;
    const {user} = props;

    return (
        <Switch>
            <Route path={`${match.path}/:noteId/edit`}>
                <EditNote
                    color={color}
                    backURL={backURL}
                    owner={user}
                />
            </Route>
            <Route path={`${match.path}/:noteId`}>
                <ViewNote
                    color={color}
                    backURL={backURL}
                    user={user}
                />
            </Route>
            <Route path={match.path}>
                <Notes
                    color={color}
                    notes={notes}
                    boardName={name}
                    boardId={boardId}
                    owner={user}
                />
            </Route>
        </Switch>
    );
};

Board.propTypes = {
    user: PropTypes.string
};