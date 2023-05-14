import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { FaFacebookF, FaGoogle, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { useMenuContext } from '../../context/MenuContext';
import bitpromo from '../../assets/bit-promo.png';

const SignUpModal = () => {
	const { loginWithEmail, loginWithGoogle } = useAuthContext();
	const [email, setEmail] = useState(null);
	const [password, setPassword] = useState(null);
	const [accountType, setAccountType] = useState('creator');
	const { state, dispatch } = useMenuContext();
	const navigate = useNavigate();

	const createAccountWithEmail = (e) => {
		e.preventDefault();
		try {
			loginWithEmail(email, password)
				.then(console.log(accountType))
				.then(dispatch({ type: 'TOGGLE_SIGNUP_MODAL' }));
		} catch (error) {
			console.error;
		}
	};

	const createAccountWithGoogle = (e) => {
		e.preventDefault();
		try {
			loginWithGoogle()
				.then(console.log(accountType))
				.then(dispatch({ type: 'TOGGLE_SIGNUP_MODAL' }));
		} catch (error) {
			console.error;
		}
	};

	return (
		<div
			className={
				'fixed top-0 right-0 left-0 bottom-0 flex w-full h-full bg-gray-800/50 z-30 items-center justify-center p-0 m-0 bg-scroll'
			}
			onClick={() => dispatch({ type: 'TOGGLE_SIGNUP_MODAL' })}
		>
			<div
				className="flex flex-col bg-white rounded-xl w-5/6 md:w-1/2 xl:w-1/3 3xl:w-1/4 h-auto z-40 rounded-lg border border-gray-600 shadow-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-col p-5">
					<AiOutlineClose
						size={18}
						className="cursor-pointer"
						onClick={() => dispatch({ type: 'TOGGLE_SIGNUP_MODAL' })}
					/>
					<img src={bitpromo} className="w-1/3 mb-5 mx-auto" />
					<div className="flex flex-col">
						<h2 className="text-xl font-semibold">
							Step 1: <span className="font-normal">Select Account Type</span>
						</h2>
						<div className="flex flex-row relative h-10 w-1/2 bg-black/10 rounded-xl my-3">
							<div
								className={`${
									accountType === 'creator' ? 'left-0' : 'translate-x-full'
								} absolute top-0 bottom-0 w-1/2 bg-black z-20 rounded-lg transition duration-700 ease-in-out`}
							></div>
							<p
								onClick={() => setAccountType('creator')}
								className={`${
									accountType === 'creator' ? 'text-amber-500' : 'text-black/50'
								} w-1/2 flex items-center justify-center font-semibold h-full z-30 cursor-pointer`}
							>
								Creator
							</p>
							<p
								onClick={() => setAccountType('advertiser')}
								className={`${
									accountType === 'advertiser'
										? 'text-amber-500'
										: 'text-black/50'
								} w-1/2 flex items-center justify-center font-semibold h-full z-30 cursor-pointer`}
							>
								Advertiser
							</p>
						</div>
					</div>
					<hr className="border my-3" />
					<h2 className="text-xl font-semibold">
						Step 2:{' '}
						<span className="font-normal">Create Your Account Login</span>
					</h2>
					<form className="flex flex-col gap-3 my-5">
						<input
							type="email"
							className="w-full h-12 rounded-lg border shadow-sm p-3"
							placeholder="Email"
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							type="password"
							className="w-full h-12 rounded-lg border shadow-sm p-3"
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							type="submit"
							className="bg-gradient-to-tl from-amber-300 to-amber-600 w-full h-12 rounded-lg shadow-sm mt-3  hover:scale-105 hover:shadow-md transition duration-700 ease-in-out"
							onClick={createAccountWithEmail}
						>
							Log In
						</button>
					</form>
					<div className="flex flex-row justify-center items-center gap-5">
						<p>or Continue with...</p>
					</div>
					<div className="flex flex-row flex-row gap-5 mt-5">
						<div
							onClick={createAccountWithGoogle}
							className="flex flex-row justify-center gap-3 cursor-pointer items-center w-full h-12 rounded-lg border border-black shadow-sm p-3 hover:bg-gradient-to-tl hover:from-amber-300 hover:to-amber-600"
						>
							<FaGoogle size={18} />
							<p>Google</p>
						</div>
						<div className="flex flex-row justify-center gap-3 cursor-pointer items-center w-full h-12 rounded-lg border border-black shadow-sm p-3  hover:bg-gradient-to-tl hover:from-amber-300 hover:to-amber-600">
							<FaTwitter size={18} />
							<p>Twitter</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpModal;
