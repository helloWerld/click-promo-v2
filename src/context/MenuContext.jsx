import {
	createContext,
	useMemo,
	useContext,
	useState,
	useReducer,
} from 'react';

const Context = createContext();

const initialMenuState = {
	activeFilter: null,
	dashboard: 'Account',
	loginModalOpen: false,
	searchTerm: null,
	signUpModalOpen: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_ACTIVE_FILTER':
			console.log('set active filter ', action.payload);
			return { ...state, activeFilter: action.payload };
		case 'SET_SEARCH_TERM':
			console.log('set search term ', action.payload);
			return { ...state, searchTerm: action.payload };
		case 'TOGGLE_LOGIN_MODAL':
			return { ...state, loginModalOpen: !state.loginModalOpen };
		case 'TOGGLE_SIGNUP_MODAL':
			return { ...state, signUpModalOpen: !state.signUpModalOpen };
		case 'SET_DASHBOARD_SECTION':
			return { ...state, dashboard: action.payload };
		default:
			return state;
	}
};

const MenuProvider = ({ children }) => {
	const [menuState, dispatch] = useReducer(reducer, initialMenuState);

	const value = useMemo(() => {
		return {
			menuState,
			dispatch,
		};
	}, [menuState, dispatch]);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useMenuContext = () => {
	return useContext(Context);
};

export default MenuProvider;
