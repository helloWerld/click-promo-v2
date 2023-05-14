import React, { useState, useEffect } from 'react';
import CreatorTopicFilter from '../components/Filters/CreatorTopicFilter';
import { CreatorCardList } from '../components/Lists';
import Footer from '../components/Menus/Footer';
import { useMenuContext } from '../context/MenuContext';

const HomePage = () => {
	return (
		<div className="mb-12">
			<CreatorTopicFilter />
			<CreatorCardList />
			<Footer />
		</div>
	);
};

export default HomePage;
