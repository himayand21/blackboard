import React from 'react';
import PropTypes from 'prop-types';
import {useRouteMatch, Switch, Route} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';

import getBoardDetails from '../../queries/boardDetails';

import {NotFound} from '../error/NotFound';

import {Notes} from './Notes';
import {ViewNote} from './common/ViewNote';
import {EditNote} from './admin/EditNote';

export const Board = (props) => {
    const match = useRouteMatch();

    const backURL = match.url;
    const {boardId} = match.params;

    const {loading, data, error} = useQuery(getBoardDetails, {
        variables: {
            id: boardId
        }
    });

    if (error) {
        return (
            <div className="screen-loader">
                <div className="loading-section">
                    <NotFound type="board" />
                </div>
            </div>
        );
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
                />
            </Route>
        </Switch>
    );
};

Board.propTypes = {
    user: PropTypes.string
};