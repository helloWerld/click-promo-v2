import React from 'react';
import Sidebar from '../components/Menus/Sidebar';
import Account from '../components/Dashboard/Account';
import { useMenuContext } from '../context/MenuContext';
import EditProfile from '../components/Dashboard/EditProfile';
import Requests from '../components/Dashboard/Requests';
import Reservations from '../components/Dashboard/Reservations';

const DashboardPage = () => {
	const { dashboard } = useMenuContext();

	return (
		<div className="flex flex-col-reverse md:flex-row h-screen">
			<Sidebar />
			{dashboard == 'Account' ? (
				<Account />
			) : dashboard == 'Edit Profile' ? (
				<EditProfile />
			) : dashboard == 'Requests' ? (
				<Requests />
			) : dashboard == 'Reservations' ? (
				<Reservations />
			) : (
				<Account />
			)}
		</div>
	);
};

export default DashboardPage;
