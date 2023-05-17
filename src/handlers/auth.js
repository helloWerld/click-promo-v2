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
	signUpWithEmail: (...args) => {
		const [email, password] = args;
		return new Promise((resolve) => {
			try {
				console.log('creating new user');
				createUserWithEmailAndPassword(auth, email, password)
					.then((response) => {
						resolve(response.user);
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
					});
			} catch (error) {
				console.log(error);
			}
		});
	},
	signInWithEmail: (...args) => {
		const [email, password] = args;
		return new Promise((resolve) => {
			try {
				console.log('logged in with email');
				signInWithEmailAndPassword(auth, email, password)
					.then((response) => {
						resolve(response.user);
					})
					.catch((error) => {
						const errorCode = error.code;
						const errorMessage = error.message;
					});
			} catch (error) {
				console.log(error);
			}
		});
	},
	// Google Authentication
	signInWithGoogle: () => {
		return new Promise((resolve) => {
			signInWithPopup(auth, googleProvider)
				.then((response) => {
					resolve(response.user);
				})
				.catch(console.error);
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
		if (auth?.currentUser?.uid != null) {
			const userId = auth?.currentUser?.uid;
			const ref = doc(db, 'user_data', userId);
			return new Promise(async (resolve) => {
				try {
					const docSnap = await getDoc(ref);
					resolve(docSnap.data());
				} catch (e) {
					console.log(e);
				}
			});
		} else {
			return null;
		}
	},
};
export default FirebaseAuth;
