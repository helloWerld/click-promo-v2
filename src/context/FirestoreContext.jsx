import { createContext, useContext, useMemo, useReducer } from 'react';
import Firestore from '../handlers/firestore';
import { useAuthContext } from './AuthContext';

const { readDocs, readDoc, writeDoc } = Firestore;

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
				.then((response) =>
					state.creators == null
						? readDoc(
								response.creator_public_data_ID,
								'creators_public_data'
						  ).then((response) =>
								dispatch({
									type: 'SET_CREATOR_PUBLIC_DATA',
									payload: response,
								})
						  )
						: dispatch({
								type: 'SET_CREATOR_PUBLIC_DATA',
								payload: state.creators.filter(
									(creator) => creator?.id == response.creator_public_data_ID
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
					return response;
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
						return response;
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

	const value = useMemo(() => {
		return {
			state,
			dispatch,
			getCreatorData,
			getCreators,
			setCurrentUserInfo,
			saveProfileChanges,
		};
	}, [
		state,
		getCreators,
		getCreatorData,
		setCurrentUserInfo,
		saveProfileChanges,
	]);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFirestoreContext = () => {
	return useContext(Context);
};

export default FirestoreProvider;
