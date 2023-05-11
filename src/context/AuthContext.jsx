import { createContext, useContext, useMemo, useState } from 'react';
import FirebaseAuth from '../handlers/auth';

const {
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

	// Login Email/Password
	const loginWithEmail = (...args) =>
		signInWithEmail(...args)
			.then((response) => setCurrentUser(response))
			.then(() => getCurrentUserData());

	// Login/Signup with Google
	const loginWithGoogle = () =>
		signInWithGoogle()
			.then((response) => setCurrentUser(response))
			.then(getCurrentUserData);

	// Logout
	const logout = () =>
		signOut()
			.then(() => setCurrentUser(null))
			.then(() => setUserData(null));

	// Update User and UserData on Auth Changes
	const authenticate = () => {
		getCurrentUser()
			.then((response) => setCurrentUser(response))
			.then(getCurrentUserData);
	};

	// Retrieve and set signed in users's userData
	const getCurrentUserData = () => {
		readCurrentUserData().then((response) => {
			setUserData(response);
		});
	};

	const value = useMemo(
		() => {
			return {
				loginWithEmail,
				loginWithGoogle,
				logout,
				authenticate,
				currentUser,
				userData,
			};
		},
		[loginWithEmail, loginWithGoogle, logout, currentUser, userData],
		authenticate
	);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useAuthContext = () => {
	return useContext(Context);
};

export default AuthProvider;
