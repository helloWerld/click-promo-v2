import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/bitpromo.png';
import { RxMagnifyingGlass, RxHamburgerMenu } from 'react-icons/rx';
import { RiAccountCircleFill } from 'react-icons/ri';
import { LoginModal, SignUpModal } from '../Modals';
import { useAuthContext } from '../../context/AuthContext';
import { useMenuContext } from '../../context/MenuContext';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';

const Navbar = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { logout, currentUser } = useAuthContext();
	const { menuState, dispatch } = useMenuContext();
	const [menuOpen, setMenuOpen] = useState(false);
	const { activeFilter, searchTerm, loginModalOpen, signUpModalOpen } =
		menuState;

	const handleLogOut = async () => {
		console.log('logout');
		await logout().then(navigate('/'));
	};

	return (
		<>
			<div
				className={`sticky top-0 z-40 ${
					currentUser
						? 'bg-gradient-to-br from-amber-600 via-amber-400 to-amber-300 shadow-lg'
						: 'bg-white'
				}`}
			>
				<div className="flex flex-row md:px-8 h-20 items-center justify-between">
					<div className="ml-5 w-36">
						<Link to="/">
							<img src={logo} alt="bit promo logo" />
						</Link>
					</div>
					{location.pathname === '/' && (
						<div className="hidden md:flex flex-row border rounded-full px-3 py-1 items-center gap-2 bg-white shadow-innerlg">
							<form className="flex flex-row items-center">
								<input
									type="text"
									placeholder="Search Creators..."
									className="mx-2 bg-transparent outline-none"
									onChange={(e) => {
										activeFilter &&
											dispatch({ type: 'SET_ACTIVE_FILTER', payload: null });
										dispatch({
											type: 'SET_SEARCH_TERM',
											payload: e.target.value,
										});
									}}
								/>
								<button className="p-2 text-lg bg-gradient-to-tl from-amber-300 to-amber-600 rounded-full hover:shadow-md">
									<RxMagnifyingGlass />
								</button>
							</form>
						</div>
					)}
					<div
						className={`text-black bg-gradient-to-tl from-amber-300 to-amber-600 flex flex-row items-center gap-2 rounded-full px-3 py-2 mr-5 hover:scale-105 hover:shadow-md cursor-pointer`}
						onClick={() => setMenuOpen(!menuOpen)}
					>
						<RxHamburgerMenu size={26} />
						<RiAccountCircleFill size={32} />
					</div>
					{menuOpen && (
						<div className="w-64 h-auto absolute top-20 right-12">
							<div
								className="flex flex-col w-auto h-auto bg-white border shadow-xl gap-3 w-64 rounded-2xl text-gray-600 py-3"
								onClick={() => setMenuOpen(false)}
							>
								{currentUser ? (
									<Link to="/dashboard" className="hover:bg-gray-100 py-3 px-5">
										Dashboard
									</Link>
								) : (
									<div
										className="flex flex-row items-center gap-3 hover:bg-gray-100 py-3 px-5 cursor-pointer"
										onClick={() => dispatch({ type: 'TOGGLE_SIGNUP_MODAL' })}
									>
										<AiOutlineUserAdd className="text-xl font-semibold" />{' '}
										Create Account
									</div>
								)}
								{currentUser ? (
									<p
										className="hover:bg-gray-100 py-3 px-5 cursor-pointer"
										onClick={handleLogOut}
									>
										Log Out
									</p>
								) : (
									<div
										className="flex flex-row items-center gap-3 hover:bg-gray-100 py-3 px-5 cursor-pointer"
										onClick={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}
									>
										<AiOutlineLogin className="text-xl font-semibold" /> Log In
									</div>
								)}
								<hr />
								<Link className="hover:bg-gray-100 py-3 px-5">
									How It Works...
								</Link>
								<Link className="hover:bg-gray-100 py-3 px-5">Help</Link>
							</div>
						</div>
					)}
				</div>
			</div>
			{loginModalOpen && <LoginModal />}
			{signUpModalOpen && <SignUpModal />}
		</>
	);
};

export default Navbar;
