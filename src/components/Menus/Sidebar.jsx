import React from 'react';
import logo from '../../assets/bitpromo-white.png';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useMenuContext } from '../../context/MenuContext';
import { RiSettings3Fill, RiUser3Fill, RiHome2Fill } from 'react-icons/ri';
import { FaCalendarAlt } from 'react-icons/fa';
import { AiOutlineLogout } from 'react-icons/ai';
import { RiQuestionnaireFill } from 'react-icons/ri';

const Sidebar = () => {
	const { logout } = useAuthContext();
	const { menuState, dispatch } = useMenuContext();
	const navigate = useNavigate();
	const { dashboard } = menuState;

	const menuItems = [
		{
			name: 'Home',
			icon: <RiHome2Fill />,
		},
		{
			name: 'Account',
			icon: <RiSettings3Fill />,
		},
		{
			name: 'Edit Profile',
			icon: <RiUser3Fill />,
		},
		{
			name: 'Requests',
			icon: <RiQuestionnaireFill />,
		},
		{
			name: 'Reservations',
			icon: <FaCalendarAlt />,
		},
		{
			name: 'Log Out',
			icon: <AiOutlineLogout />,
		},
	];

	return (
		<div className="flex flex-row fixed md:relative bottom-0 md:flex-col h-2/12 w-full md:h-screen md:w-2/12 bg-black text-white justify-around md:justify-between md:border-x-2 md:border-black">
			<div className="hidden md:flex justify-center mt-4 px-1">
				<Link to="/">
					<img src={logo} className="w-40" />
				</Link>
			</div>
			<div className="flex flex-row w-full md:flex-col text-center border-t border-black md:border-none">
				{menuItems.map((menuItem) => (
					<div
						className={`${
							dashboard == menuItem.name
								? 'bg-black text-amber-400 font-bold'
								: 'bg-stone-900'
						} p-5 hover:bg-stone-950 cursor-pointer md:border-y md:border-white/10 w-1/6 md:w-full hover:font-semibold`}
						key={menuItem.name}
						value={menuItem.name}
						onClick={
							menuItem.name == 'Log Out'
								? () => {
										logout();
										navigate('/');
								  }
								: menuItem.name == 'Home'
								? () => navigate('/')
								: () =>
										dispatch({
											type: 'SET_DASHBOARD_SECTION',
											payload: menuItem.name,
										})
						}
					>
						<p className="hidden md:flex md:justify-center">{menuItem.name}</p>
						<div className="md:hidden flex justify-center text-3xl">
							{menuItem.icon}
						</div>
					</div>
				))}
			</div>
			<div className="hidden md:flex flex-row w-full justify-center text-sm text-center mb-4 gap-3">
				<p>Terms</p>
				<p>Support</p>
			</div>
		</div>
	);
};

export default Sidebar;
