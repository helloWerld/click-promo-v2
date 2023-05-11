import { createContext, useMemo, useContext, useState } from 'react';

const Context = createContext();

const MenuProvider = ({ children }) => {
	const [activeFilter, setActiveFilter] = useState(null);
	const [searchTerm, setSearchTerm] = useState(null);
	const [loginModalOpen, setLoginModalOpen] = useState(false);
	const [signUpModalOpen, setSignUpModalOpen] = useState(false);
	const [dashboard, setDashboard] = useState('Account');

	const setFilterSelection = (filterName) => setActiveFilter(filterName);
	const search = (term) => setSearchTerm(term);
	const toggleLoginModal = () => setLoginModalOpen(!loginModalOpen);
	const toggleSignUpModal = () => setSignUpModalOpen(!signUpModalOpen);
	const selectDashboard = (selection) => setDashboard(selection);

	const value = useMemo(() => {
		return {
			activeFilter,
			setFilterSelection,
			search,
			searchTerm,
			loginModalOpen,
			signUpModalOpen,
			toggleLoginModal,
			toggleSignUpModal,
			selectDashboard,
			dashboard,
		};
	}, [
		search,
		searchTerm,
		loginModalOpen,
		signUpModalOpen,
		toggleLoginModal,
		toggleSignUpModal,
		selectDashboard,
		dashboard,
	]);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useMenuContext = () => {
	return useContext(Context);
};

export default MenuProvider;
