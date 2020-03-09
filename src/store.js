import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

export const StateContext = createContext();

const initialState = {
	show: false,
	childKey: null
};

const StoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StateContext.Provider
			value={{
				state,
				dispatch
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export default StoreProvider;
