import React, { useEffect } from 'react';
import CreatorCard from '../Cards/CreatorCard';
import { ImSpinner } from 'react-icons/im';
import { useFirestoreContext } from '../../context/FirestoreContext';
import { useMenuContext } from '../../context/MenuContext';

const CreatorCardList = () => {
	const { state } = useFirestoreContext();
	const { menuState } = useMenuContext();
	const { creators } = state;
	const { activeFilter, searchTerm } = menuState;

	return (
		<div
			className={
				!creators
					? 'flex flex-row items-center justify-center'
					: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 w-90 gap-4 items-center justify-center mx-0 lg:mx-10 z-0 text-gray-800'
			}
		>
			{!creators ? (
				<div className="flex flex-col items-center justify-center mt-20 gap-3">
					<ImSpinner size={48} className="animate-spin" />
					Finding creators...
				</div>
			) : (
				<>
					{searchTerm
						? creators
								.filter((creator) =>
									creator.name.toLowerCase().includes(searchTerm.toLowerCase())
								)
								.map((creator) => (
									<CreatorCard key={creator.id} creator={creator} />
								))
						: activeFilter
						? creators
								.filter((creator) => creator.topics?.includes(activeFilter))
								.map((creator) => (
									<CreatorCard key={creator.id} creator={creator} />
								))
						: creators.map((creator) => (
								<CreatorCard key={creator.id} creator={creator} />
						  ))}
				</>
			)}
		</div>
	);
};

export default CreatorCardList;
