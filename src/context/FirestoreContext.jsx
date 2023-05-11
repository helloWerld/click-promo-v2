import { createContext, useState, useContext, useMemo } from 'react';
import Firestore from '../handlers/firestore';
const { readDocs, readDoc } = Firestore;

const Context = createContext();

const FirestoreProvider = ({ children }) => {
	const [creatorsPublicData, setCreatorsPublicData] = useState(null);
	const [creatorsProtectedData, setCreatorsProtectedData] = useState(null);
	const getCreatorsPublicData = () =>
		readDocs('creators_public_data').then((response) =>
			setCreatorsPublicData(response)
		);

	const getCreatorsProtectedData = (docId) => {
		try {
			readDoc(docId).then((response) => setCreatorsProtectedData(response));
		} catch (error) {
			console.error(error);
		}
	};

	const value = useMemo(() => {
		return {
			creatorsPublicData,
			creatorsProtectedData,
			getCreatorsProtectedData,
			getCreatorsPublicData,
		};
	}, [
		creatorsPublicData,
		getCreatorsPublicData,
		creatorsProtectedData,
		getCreatorsProtectedData,
	]);
	return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFirestoreContext = () => {
	return useContext(Context);
};

export default FirestoreProvider;
