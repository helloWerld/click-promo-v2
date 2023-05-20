import { createContext, useContext, useMemo, useState } from 'react';
import FirebaseAuth from '../handlers/auth';

const {
	signUpWithEmail,
	signInWithEmail,
	signInWithGoogle,
	signOut,
	getCurrentUser,
	readCurrentUserData,
} = FirebaseAuth;

const Context = createContext();

const AuthProvider = ({ children }) => {
	// Current User Authentication and UserData
	const [currentUser, setCurrentUser] = useState(null);
	const [userData, setUserData] = useState(null);

	// Sign Up with Email  /Password
	const signUpWithEmailPassword = (...args) =>
		signUpWithEmail(...args).then((response) => {
			if (response.isError) {
				return response;
			} else {
				setCurrentUser(response?.user);
				readCurrentUserData();
				return response;
			}
		});

	// Login Email/Password
	const loginWithEmail = (...args) =>
		signInWithEmail(...args).then((response) => {
			if (response.isError) {
				return response;
			} else {
				console.log(response);
				setCurrentUser(response?.user);
				readCurrentUserData();
			}
		});

	// Login/Signup with Google
	const loginWithGoogle = () =>
		signInWithGoogle().then(async (response) => {
			if (response.isError) {
				return response;
			} else {
				console.log(response);
				setCurrentUser(response.user);
				await readCurrentUserData();
				return response;
			}
		});

	// Logout
	const logout = () =>
		signOut()
			.then(() => setCurrentUser(null))
			.then(() => setUserData(null));

	// Update User and UserData on Auth Changes
	const authenticate = () =>
		getCurrentUser()
			.then(setCurrentUser)
			.then(readCurrentUserData)
			.then((response) => {
				if (!response.isError) {
					setUserData(response.data);
				}
			});

	const value = useMemo(
		() => {
			return {
				loginWithEmail,
				loginWithGoogle,
				logout,
				authenticate,
				currentUser,
				userData,
				signUpWithEmailPassword,
			};
		},
		[
			loginWithEmail,
			loginWithGoogle,
			logout,
			signUpWithEmailPassword,
			currentUser,
			userData,
		],
		authenticate
	);

	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => {
	return useContext(Context);
};

export default AuthProvider;
