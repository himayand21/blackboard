import React from 'react';
import PropTypes from 'prop-types';
import {useRouteMatch, Switch, Route, withRouter} from 'react-router-dom';
import {graphql} from 'react-apollo';

import query from '../../queries/boardDetails';

import {Notes} from './Notes';
import {AddNote} from './AddNote';
import {EditNote} from './EditNote';
import {Note} from './Note';

const BoardComponent = (props) => {
    const match = useRouteMatch();
    const backURL = match.url;
    const {boardId} = match.params;

    const {data} = props;
    const {loading, board} = data;

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

    const {notes, color, name} = board;

    return (
        <Switch>
            <Route path={`${match.path}/new`}>
                <AddNote
                    backURL={backURL}
                    color={color}
                    boardId={boardId}
                />
            </Route>
            <Route path={`${match.path}/:noteId/edit`}>
                <EditNote />
            </Route>
            <Route path={`${match.path}/:noteId`}>
                <Note />
            </Route>
            <Route path={match.path}>
                <Notes
                    color={color}
                    notes={notes}
                    boardName={name}
                />
            </Route>
        </Switch>
    );
};

BoardComponent.propTypes = {
    data: PropTypes.object
};

export const Board = withRouter(graphql(query, {
    options: (props) => ({
        variables: {
            id: props.match.params.boardId
        }
    })
})(BoardComponent));