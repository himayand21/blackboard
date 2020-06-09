import React from 'react';
import PropTypes from 'prop-types';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient} from 'apollo-boost';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';

import {Background} from '../../components/background';
import {NETLIFY_PREFIX} from '../../api/constants';

import {AUTH_TOKEN} from '../../constants';
import {Main} from './main';

const httpLink = createHttpLink({
    uri: `${NETLIFY_PREFIX}/graphql`
});

const authLink = setContext((_, {headers}) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    };
});

const client = new ApolloClient({
    shouldBatch: true,
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    dataIdFromObject: (o) => o.id
});

const Home = (props) => {
    const {withAuthProps} = props;
    const {user, logout} = withAuthProps;
    return (
        <ApolloProvider client={client}>
            <div className="home-screen">
                <Background />
                <div className="absolute">
                    {user ?
                        <Main
                            email={user.email}
                            id={user.id}
                            logout={logout}
                        /> : null}
                </div>
            </div>
        </ApolloProvider>
    );
};

Home.propTypes = {
    withAuthProps: PropTypes.object
};

export default Home;
