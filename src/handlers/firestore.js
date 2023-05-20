import {
	doc,
	addDoc,
	serverTimestamp,
	setDoc,
	getDoc,
	collection,
	getDocs,
	updateDoc,
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
		const ref = doc(db, collection_name, docId);
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
				const response = await setDoc(docRef, inputs);
				resolve(response);
			} catch (error) {
				console.error(error);
			}
		});
	},
	createNewCreatorAccount: (...args) => {
		const [uid, email] = args;
		return new Promise(async (resolve) => {
			try {
				const protectedDocRef = await addDoc(
					collection(db, 'creators_protected_data'),
					{
						creator_public_data_ID: '',
						description: 'Add a description of your brand here...',
						headline: 'Add a headline here...',
						images: [
							'https://firebasestorage.googleapis.com/v0/b/bitpromo.appspot.com/o/avatar.png?alt=media&token=335b60cb-6991-4c82-8ce8-1731228af059',
						],
						name: email,
						promotions: [
							{
								name: 'Sample Promotion',
								description: 'A promotion of your brand on YouTube',
								exampleLink: 'https://www.google.com',
								leadTime: '1 - 3 days',
								priceInUsd: '2500',
								socialName: 'Youtube',
								whatsIncluded: ['3 minute promotion of your brand'],
							},
						],
					}
				);
				console.log(protectedDocRef);
				const publicDocRef = await addDoc(
					collection(db, 'creators_public_data'),
					{
						creator_protected_data_ID: protectedDocRef._key.path.segments[1],
						avatar:
							'https://firebasestorage.googleapis.com/v0/b/bitpromo.appspot.com/o/avatar.png?alt=media&token=335b60cb-6991-4c82-8ce8-1731228af059',
						message: 'New Creator!',
						name: email,
						socials: [
							{
								socialName: 'Youtube',
								subCount: 100,
								url: 'https://www.youtube.com',
							},
						],
						topics: ['Bitcoin', 'Crypto'],
					}
				);
				console.log(publicDocRef._key.path.segments[1]);
				await setDoc(doc(db, 'user_data', uid), {
					role: 'creator',
					public_data_id: publicDocRef._key.path.segments[1],
					protected_data_id: protectedDocRef._key.path.segments[1],
					email: email,
				});
				await updateDoc(protectedDocRef, {
					creator_public_data_ID: publicDocRef._key.path.segments[1],
				});
				resolve('new doc successfully inserted');
			} catch (e) {
				console.error(e);
			}
		});
	},
};

export default Firestore;
