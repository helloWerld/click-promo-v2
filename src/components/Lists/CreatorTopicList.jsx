import React, { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';

import { useFirestoreContext } from '../../context/FirestoreContext';
import reference from '../../misc/reference';

const CreatorTopicList = ({ topics, iconSize }) => {
	const [allTopics, setAllTopics] = useState();

	useEffect(() => {
		setAllTopics(reference?.allTopics);
	}, []);

	return (
		<div className="flex flex-row w-min gap-3">
			{topics?.map((creatorTopic) => (
				<div
					key={creatorTopic}
					className="flex flex-col text-xl items-center justify-center"
				>
					<Tooltip
						title={
							allTopics?.filter((topic) =>
								topic?.name?.toLowerCase().includes(creatorTopic.toLowerCase())
							)[0].name
						}
						arrow
					>
						<div>
							{
								allTopics?.filter((topic) =>
									topic.name.toLowerCase().includes(creatorTopic.toLowerCase())
								)[0].icon
							}
						</div>
					</Tooltip>
				</div>
			))}
		</div>
	);
};

export default CreatorTopicList;
