import { createContext, useContext, useMemo, useReducer } from 'react';
import Firestore from '../handlers/firestore';
import { useAuthContext } from './AuthContext';

const { readDocs, readDoc, writeDoc, createNewCreatorAccount } = Firestore;

const Context = createContext();

const initialState = {
	// list of all creators from database
	creators: null,
	// single creator's public data
	creatorPublicData: null,
	// single creator's protected data
	creatorProtectedData: null,
	// signed in user's protected data
	currentUserProtectedInfo: {
		creator_public_data_ID: '',
		description: '',
		headline: '',
		images: [],
		name: '',
		promotions: [],
		imageUpload: '',
	},
	//sign in users' public data
	currentUserPublicInfo: {
		avatar: '',
		creator_protected_data_ID: '',
		message: '',
		name: '',
		overallRating: null,
		socials: [],
		topics: [],
	},
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_CREATORS':
			return { ...state, creators: action.payload };
		case 'SET_CREATOR_PROTECTED_DATA':
			return { ...state, creatorProtectedData: action.payload };
		case 'SET_CREATOR_PUBLIC_DATA':
			return { ...state, creatorPublicData: action.payload };
		case 'SET_CURRENT_USER_PROTECTED_INFO':
			return { ...state, currentUserProtectedInfo: action.payload };
		case 'SET_CURRENT_USER_PUBLIC_INFO':
			return { ...state, currentUserPublicInfo: action.payload };
		case 'UPDATE_CURRENT_USER_PROTECTED_INFO':
			console.log('update current user protected');
			return {
				...state,
				currentUserProtectedInfo: {
					...state.currentUserProtectedInfo,
					[action.payload.key]: action.payload.value,
				},
			};
		case 'UPDATE_CURRENT_USER_PUBLIC_INFO':
			return {
				...state,
				currentUserPublicInfo: {
					...state.currentUserPublicInfo,
					[action.payload.key]: action.payload.value,
				},
			};
		default:
			return { ...state };
	}
};

const FirestoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { userData } = useAuthContext();

	const getCreators = () =>
		readDocs('creators_public_data').then((response) => {
			console.log(response);
			dispatch({ type: 'SET_CREATORS', payload: response });
		});

	const getCreatorData = (protectedId) => {
		try {
			readDoc(protectedId, 'creators_protected_data')
				.then((response) => {
					dispatch({ type: 'SET_CREATOR_PROTECTED_DATA', payload: response });
					return response;
				})
				.then(() =>
					dispatch({
						type: 'SET_CREATOR_PUBLIC_DATA',
						payload: state?.creators?.filter(
							(creator) => creator.creator_protected_data_ID == protectedId
						)[0],
					})
				);
		} catch (error) {
			console.error(error);
		}
	};

	const setCurrentUserInfo = () => {
		try {
			readDoc(
				userData.protected_data_id,
				userData.role == 'creator'
					? 'creators_protected_data'
					: 'advertisers_protected_data'
			)
				.then((response) => {
					dispatch({
						type: 'SET_CURRENT_USER_PROTECTED_INFO',
						payload: response,
					});
				})
				.then(
					readDoc(
						userData.public_data_id,
						userData.role == 'creator'
							? 'creators_public_data'
							: 'advertisers_public_data'
					).then((response) => {
						dispatch({
							type: 'SET_CURRENT_USER_PUBLIC_INFO',
							payload: response,
						});
					})
				);
		} catch (error) {
			console.error(error);
		}
	};

	const saveProfileChanges = () => {
		console.log('saving profile changes...');
		const protectedInputs = Object.fromEntries(
			Object.entries(state.currentUserProtectedInfo).filter(([key, value]) =>
				Boolean(value)
			)
		);
		const publicInputs = Object.fromEntries(
			Object.entries(state.currentUserPublicInfo).filter(([key, value]) =>
				Boolean(value)
			)
		);
		try {
			writeDoc(
				protectedInputs,
				'creators_protected_data',
				userData.protected_data_id
			)
				.then(
					writeDoc(
						publicInputs,
						'creators_public_data',
						userData.public_data_id
					)
				)
				.then((response) => {
					setCurrentUserInfo();
					console.log(response);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const createAdvertiserAccount = (user) => {
		console.log('create advertiser account');
	};

	const createCreatorAccount = (uid, email) => {
		createNewCreatorAccount(uid, email);
	};

	const value = useMemo(() => {
		return {
			state,
			dispatch,
			getCreatorData,
			getCreators,
			setCurrentUserInfo,
			saveProfileChanges,
			createAdvertiserAccount,
			createCreatorAccount,
		};
	}, [
		state,
		getCreators,
		getCreatorData,
		setCurrentUserInfo,
		saveProfileChanges,
		createAdvertiserAccount,
		createCreatorAccount,
	]);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFirestoreContext = () => {
	return useContext(Context);
};

export default FirestoreProvider;
