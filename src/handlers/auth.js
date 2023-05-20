import {
	signInWithPopup,
	signOut,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../lib/firebase.config';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase.config';

const googleProvider = new GoogleAuthProvider();

const FirebaseAuth = {
	// Email Authentication
	//Sign Up with Email Password
	signUpWithEmail: (...args) => {
		const [email, password] = args;
		return new Promise((resolve) => {
			console.log('creating new user');
			createUserWithEmailAndPassword(auth, email, password)
				.then((response) => {
					resolve({ isError: false, user: response.user });
				})
				.catch((error) => {
					resolve({ isError: true, error });
				});
		});
	},
	// Login with Email Password
	signInWithEmail: (...args) => {
		const [email, password] = args;
		return new Promise((resolve) => {
			console.log('logged in with email');
			signInWithEmailAndPassword(auth, email, password)
				.then((response) => {
					resolve({ isError: false, user: response.user });
				})
				.catch((error) => {
					resolve({ isError: true, error });
				});
		});
	},
	// Google Authentication
	signInWithGoogle: () => {
		return new Promise((resolve) => {
			signInWithPopup(auth, googleProvider)
				.then((response) => {
					resolve({ isError: false, user: response?.user });
				})
				.catch((error) => {
					resolve({ isError: true, error });
				});
		});
	},

	// Logout
	signOut: () => {
		return new Promise((resolve) => {
			signOut(auth)
				.then(() => {
					console.log('user logged out');
					resolve();
				})
				.catch(console.error);
		});
	},

	// Set Current User on Auth State Change
	getCurrentUser: () => {
		return new Promise((resolve) => {
			return auth.onAuthStateChanged(resolve);
		});
	},

	// Set Current UserData on Auth State Change
	readCurrentUserData: () => {
		console.log('read current user data', auth.currentUser);
		if (auth.currentUser.uid != null) {
			console.log(auth.currentUser.uid);
			const userId = auth.currentUser.uid;
			console.log(userId);
			const ref = doc(db, 'user_data', userId);
			return new Promise(async (resolve) => {
				try {
					const docSnap = await getDoc(ref);
					resolve({ isError: false, data: docSnap.data() });
				} catch (error) {
					resolve({ isError: true, error: error });
				}
			});
		} else {
			return null;
		}
	},
};
export default FirebaseAuth;
