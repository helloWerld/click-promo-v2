import React from 'react';
import { Link } from 'react-router-dom';
import lost from '../assets/lost.gif';

const NotFoundPage = () => {
	return (
		<div className="flex flex-col w-full h-[94vh] md:justify-center text-center items-center relative">
			<h2 className="text-3xl mt-24 md:mt-0">404 Not Found</h2>
			<p>
				The page you are looking for does not exist or you do not have
				permission to view it.
			</p>
			<Link to="/">
				<div className="w-fit border border-black rounded-lg px-3 py-2 mt-5 hover:bg-gradient-to-tl hover:from-amber-300 hover:to-amber-600">
					Go Back to Home
				</div>
			</Link>
			<img
				src={lost}
				className="absolute bottom-0 right-0 h-[50vh] md:h-[60vh] -z-10"
			/>
		</div>
	);
};

export default NotFoundPage;
