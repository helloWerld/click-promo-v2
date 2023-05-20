import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Menus/Sidebar';
import Account from '../components/Dashboard/Account';
import { useMenuContext } from '../context/MenuContext';
import EditCreatorProfile from '../components/Dashboard/EditCreatorProfile';
import EditAdvertiserProfile from '../components/Dashboard/EditAdvertiserProfile';
import Requests from '../components/Dashboard/Requests';
import Reservations from '../components/Dashboard/Reservations';
import { useAuthContext } from '../context/AuthContext';

const DashboardPage = () => {
	const { menuState } = useMenuContext();
	const { userData, authenticate } = useAuthContext();
	const [openSection, setOpenSection] = useState();
	const { dashboard } = menuState;

	useEffect(() => {
		authenticate();
	}, []);

	useEffect(() => {
		switch (dashboard) {
			case 'Account':
				setOpenSection(<Account />);
				break;
			case 'Edit Profile':
				userData?.role == 'creator'
					? setOpenSection(<EditCreatorProfile />)
					: setOpenSection(<EditAdvertiserProfile />);
				break;
			case 'Requests':
				setOpenSection(<Requests />);
				break;
			case 'Reservations':
				setOpenSection(<Reservations />);
				break;
			default:
				setOpenSection(<Account />);
		}
	}, [dashboard]);

	return (
		<div className="flex flex-col-reverse md:flex-row h-screen">
			<Sidebar />
			{openSection}
		</div>
	);
};

export default DashboardPage;
