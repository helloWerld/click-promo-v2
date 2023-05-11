import React from 'react';
import { ImSpinner } from 'react-icons/im';

const Loading = () => {
	return (
		<div className="flex w-full h-full items-center justify-center">
			<ImSpinner className="text-3xl animate-spin" />
		</div>
	);
};

export default Loading;
