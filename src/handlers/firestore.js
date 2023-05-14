import {
	doc,
	serverTimestamp,
	setDoc,
	getDoc,
	collection,
	getDocs,
} from 'firebase/firestore';
import { db } from '../lib/firebase.config';

const Firestore = {
	readDocs: (...args) => {
		const [collection_name] = args;
		let docs = [];
		const ref = collection(db, collection_name);
		return new Promise(async (resolve) => {
			try {
				const snapshots = await getDocs(ref);
				snapshots.forEach((doc) => {
					const d = { ...doc.data(), id: doc.id };
					docs.push(d);
				});
				resolve(docs);
			} catch (e) {
				console.log(e);
			}
		});
	},
	readDoc: (...args) => {
		const [docId, collection_name] = args;
		console.log(docId);
		const ref = doc(db, collection_name, docId.toString());
		return new Promise(async (resolve) => {
			try {
				const docSnap = await getDoc(ref);
				resolve(docSnap.data());
			} catch (e) {
				console.log(e);
			}
		});
	},
	writeDoc: (...args) => {
		const [inputs, collection_name, docId] = args;
		return new Promise(async (resolve) => {
			try {
				const docRef = doc(db, collection_name, docId);
				await setDoc(docRef, inputs);
				resolve('doc successfully updated');
			} catch (error) {
				console.error(error);
			}
		});
	},
	createNewAccount: (...args) => {
		const [inputs, collection_name] = args;
		return new Promise(async (resolve) => {
			const randomIndex = Math.floor(Math.random() * 10000000000);
			try {
				const docRef = doc(db, collection_name, `${randomIndex}`);
				await setDoc(docRef, { ...inputs, createdAt: serverTimestamp() });
				resolve('new doc successfully inserted');
			} catch (e) {
				console.error(e);
			}
		});
	},
	updateAccountInformation: (...args) => {},
};

export default Firestore;
