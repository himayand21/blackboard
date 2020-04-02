import React from 'react';
import { graphql } from 'react-apollo';
import { useHistory } from "react-router-dom";

import { NavBar } from "../../components/navBar";
import {NameForm} from "./NameForm";
import {Boards} from './Boards';

import query from '../../queries/userDetails';
import mutation from "../../mutations/addUser";
import { Popup } from '../popup';

const MainComponent = (props) => {
	const history = useHistory();
	const { data, mutate, logout } = props;

	if (data.error) {
		history.push("/error");
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
		)
	}
	const { userDetail } = data;

	const userLogout = () => {
		const token = localStorage.getItem("blackboard-token");
		logout(token);
		localStorage.removeItem('blackboard-token');
	}

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
		})
	}

	return (
		<>
			<NavBar>
				{data.userDetail ?
					<div className="user-name">
						<span>{data.userDetail.name}</span>
						<Popup>
							<ul>
								<li>Edit Profile</li>
								<li onClick={userLogout}>Logout</li>
							</ul>
						</Popup>
					</div>
				: null}
			</NavBar>
			{userDetail ?
				<Boards id={props.id} /> :
				<NameForm
					data={data}
					addUser={addUser}
				/>
			}
		</>
	);
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