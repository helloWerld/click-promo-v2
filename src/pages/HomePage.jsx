import React, { useState, useEffect } from 'react';
import CreatorTopicFilter from '../components/Filters/CreatorTopicFilter';
import { CreatorCardList } from '../components/Lists';
import Footer from '../components/Menus/Footer';

const HomePage = () => {
	const [activeFilter, setActiveFilter] = useState('');

	function handleFilterSelection(filterTopic) {
		setActiveFilter(filterTopic);
	}

	return (
		<div className="mb-12">
			<CreatorTopicFilter
				activeFilter={activeFilter}
				setFilterSelection={handleFilterSelection}
			/>
			<CreatorCardList activeFilter={activeFilter} />
			<Footer />
		</div>
	);
};

export default HomePage;
