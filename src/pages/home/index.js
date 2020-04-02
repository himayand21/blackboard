import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { setContext } from "apollo-link-context";
import { InMemoryCache } from "apollo-cache-inmemory";

import { Main } from "../../components/main";
import { Background } from "../../components/background";

const httpLink = createHttpLink({
	uri: "/graphql"
});

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("blackboard-token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ""
		}
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
	dataIdFromObject: o => o.id
});

const Home = props => {
	const { withAuthProps } = props;
	const { user, logout } = withAuthProps;
	return (
		<ApolloProvider client={client}>
			<div className="home-screen">
				<Background />
				<div className="absolute">
					{user ?
						<Main
							id={user.id}
							logout={logout}
						/> : null}
				</div>
			</div>
		</ApolloProvider>
	);
};

export default Home;
