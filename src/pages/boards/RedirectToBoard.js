import React from 'react';
import {useRouteMatch, Redirect} from 'react-router-dom';
import {NOTES} from '../../constants';

export const RedirectToBoard = () => {
    const match = useRouteMatch();
    const backURL = match.url;

    return (
        <Redirect to={`${backURL}${NOTES}`} />
    );
};