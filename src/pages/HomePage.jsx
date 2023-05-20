import React, { useEffect } from 'react';
import CreatorTopicFilter from '../components/Filters/CreatorTopicFilter';
import { CreatorCardList } from '../components/Lists';
import Footer from '../components/Menus/Footer';
import { useFirestoreContext } from '../context/FirestoreContext';
import { useAuthContext } from '../context/AuthContext';

const HomePage = () => {
	const { getCreators } = useFirestoreContext();
	const { authenticate, currentUser } = useAuthContext();

	useEffect(() => {
		getCreators();
	}, []);

	useEffect(() => {
		authenticate();
	}, [currentUser]);

	return (
		<div className="mb-12">
			<CreatorTopicFilter />
			<CreatorCardList />
			<Footer />
		</div>
	);
};

export default HomePage;
