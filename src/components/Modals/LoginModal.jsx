import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useMenuContext } from '../../context/MenuContext';
import { AiOutlineClose } from 'react-icons/ai';
import { FaGoogle, FaTwitter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import bitpromo from '../../assets/bit-promo.png';

const LoginModal = () => {
	const { logout, loginWithEmail, loginWithGoogle, userData } =
		useAuthContext();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState(null);
	const [buttonText, setButtonText] = useState('Log In');
	const { dispatch } = useMenuContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (buttonText == 'Login Failed, Try again.') {
			const delay = setTimeout(() => {
				setButtonText('Log In');
			}, 1000);

			return () => clearTimeout(delay);
		}
	}, [buttonText]);

	useEffect(() => {
		if (errorMessage != null) {
			const delay = setTimeout(() => {
				setErrorMessage(null);
			}, 5000);

			return () => clearTimeout(delay);
		}
	}, [errorMessage]);

	const signIn = (e) => {
		e.preventDefault();
		setButtonText('Logging In');
		loginWithEmail(email, password)
			.then(async (response) => {
				if (response) {
					setButtonText('Login Failed, Try again.');
					setErrorMessage(response.error.message);
				} else {
					console.log('success sign in');
					setButtonText('Log In');
					setErrorMessage('');
					await dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
					navigate('/');
				}
			})
			.catch((error) => console.error);
	};

	const loginUserWithGoogle = async () => {
		try {
			const response = await loginWithGoogle();
			console.log(response);

			if (response.isError) {
				console.log('response isError');
				setErrorMessage(response.error.message);
			} else {
				if (!userData?.role) {
					console.log('role not null');
					setErrorMessage('');
					await dispatch({ type: 'TOGGLE_LOGIN_MODAL' });
					navigate('/');
				} else {
					console.log('role null');
					logout();
					setErrorMessage('Account does not exist.');
				}
			}
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div
			className={
				'fixed top-0 right-0 left-0 bottom-0 flex w-full h-full bg-gray-800/50 z-40 items-center justify-center p-0 m-0 bg-scroll'
			}
			onClick={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}
		>
			<div
				className="flex flex-col bg-white rounded-xl w-5/6 md:w-1/2 xl:w-1/3 3xl:w-1/4 h-auto z-40 rounded-lg border border-gray-600 shadow-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-col p-5">
					<AiOutlineClose
						size={18}
						className="cursor-pointer"
						onClick={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}
					/>
					<img src={bitpromo} className="w-1/3 mb-8 mx-auto" />
					{errorMessage && (
						<div className="w-full text-center bg-rose-300 py-2 mb-4 rounded-xl">
							<p>{errorMessage}</p>
						</div>
					)}
					<h2 className="text-xl font-semibold">Login To Your Account</h2>
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
							onClick={signIn}
						>
							{buttonText}
						</button>
					</form>
					<div className="flex flex-row justify-center items-center gap-5">
						<p>or Continue with...</p>
					</div>
					<div className="flex flex-row flex-row gap-5 mt-5">
						<div
							onClick={loginUserWithGoogle}
							className="flex flex-row justify-center gap-3 cursor-pointer items-center w-full h-12 rounded-lg border border-black shadow-sm p-3 hover:bg-gradient-to-tl hover:from-amber-300 hover:to-amber-600"
						>
							<FaGoogle size={18} />
							<p>Google</p>
						</div>
						{/* <div className="flex flex-row justify-center gap-3 cursor-pointer items-center w-full h-12 rounded-lg border border-black shadow-sm p-3  hover:bg-gradient-to-tl hover:from-amber-300 hover:to-amber-600">
							<FaTwitter size={18} />
							<p>Twitter</p>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginModal;
