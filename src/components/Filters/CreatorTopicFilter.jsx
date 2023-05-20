import React, { useState, useEffect, useRef } from 'react';
import { BsChevronRight, BsChevronLeft, BsFillGridFill } from 'react-icons/bs';
import { useMenuContext } from '../../context/MenuContext';
import reference from '../../misc/reference';

const CreatorTopicFilter = () => {
	const listRef = useRef(null);
	const { menuState, dispatch } = useMenuContext();
	const [allTopics, setAllTopics] = useState();

	const scrollToLeft = () => {
		listRef.current.scrollLeft -= 250; // Adjust the scroll amount as needed
	};

	const scrollToRight = () => {
		listRef.current.scrollLeft += 250; // Adjust the scroll amount as needed
	};

	useEffect(() => {
		setAllTopics(reference?.allTopics);
	}, []);

	return (
		<div className="sticky w-full top-20 z-30 bg-white flex px-14 py-2 h-22 items-center justify-between">
			<div
				className="flex flex-row items-center gap-8 w-full mx-2 overflow-x-auto scrollbar-hide pr-8 scroll-smooth"
				ref={listRef}
			>
				<div
					key="all topics"
					className={`flex flex-col cursor-pointer items-center text-gray-500 hover:text-gray-900 hover:scale-105 border-b-2 border-transparent`}
					onClick={() => dispatch({ type: 'SET_ACTIVE_FILTER', payload: null })}
				>
					<div className={`text-3xl`}>
						<BsFillGridFill />
					</div>
					<div className={`text-xs my-1 whitespace-nowrap`}>All</div>
				</div>
				{allTopics?.map((filterTopic) => (
					<div
						key={filterTopic.name}
						className={`flex flex-col cursor-pointer items-center text-gray-500 hover:text-gray-900 hover:scale-105 border-b-2 py-2 ${
							menuState.activeFilter === filterTopic.name
								? 'border-black font-semibold text-black'
								: 'border-transparent'
						}`}
						onClick={() =>
							dispatch({ type: 'SET_ACTIVE_FILTER', payload: filterTopic.name })
						}
					>
						<div
							className={`text-3xl ${
								menuState.activeFilter === filterTopic.name
									? 'font-semibold  text-gray-800'
									: ''
							}`}
						>
							{filterTopic.icon}
						</div>
						<div
							className={`text-xs my-1 whitespace-nowrap ${
								menuState.activeFilter === filterTopic.name
									? 'font-semibold  text-gray-800'
									: ''
							}`}
						>
							{filterTopic.name}
						</div>
					</div>
				))}
			</div>
			<div className="flex flex-row gap-2 items-center mb-1">
				<div className="w-8 -ml-10 h-16 bg-gradient-to-l from-white"></div>
				<div
					className="flex border border-gray-300 rounded-full w-10 h-10 items-center justify-center cursor-pointer hover:shadow-md"
					onClick={scrollToLeft}
				>
					<BsChevronLeft />
				</div>
				<div
					className="flex border border-gray-300 rounded-full w-10 h-10 items-center justify-center cursor-pointer hover:shadow-md"
					onClick={scrollToRight}
				>
					<BsChevronRight />
				</div>
			</div>
		</div>
	);
};

export default CreatorTopicFilter;
