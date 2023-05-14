import React, { useState } from 'react';
import PhotoGalleryModal from '../Modals/PhotoGalleryModal';

import { TbGridDots } from 'react-icons/tb';

const PhotoGallery = ({ images }) => {
	const [showFullGallery, setShowFullGallery] = useState(false);
	const toggleShowFullGallery = () => {
		setShowFullGallery(!showFullGallery);
	};

	return (
		<div className="flex flex-row w-full h-full md:rounded-3xl overflow-clip relative bg-white">
			<div className="w-full md:w-1/2 md:mr-2 overflow-clip">
				{images && (
					<img
						src={images[0]}
						className="flex aspect-square w-full h-full object-cover hover:scale-110 transition duration-700 ease-in-out hover:saturate-150 cursor-pointer"
						onClick={toggleShowFullGallery}
					/>
				)}
			</div>
			<div className="hidden md:grid grid-cols-2 gap-2 w-1/2">
				{images?.slice(1).map((image) => (
					<div
						key={image}
						className="hidden md:flex h-full w-full aspect-square overflow-clip"
					>
						<img
							src={image}
							className="hidden md:flex h-full w-full aspect-square object-cover transition duration-700 ease-in-out hover:scale-110 hover:saturate-150 cursor-pointer"
							onClick={toggleShowFullGallery}
						/>
					</div>
				))}
			</div>
			<button
				className="absolute bottom-6 right-6 bg-white border border-black px-3 py-1 rounded-lg"
				onClick={toggleShowFullGallery}
			>
				<div className="flex flex-row items-center gap-2">
					<TbGridDots />
					Show all photos
				</div>
			</button>
			<div>
				{showFullGallery && (
					<PhotoGalleryModal
						togglePhotoGalleryModal={toggleShowFullGallery}
						images={images}
					/>
				)}
			</div>
		</div>
	);
};

export default PhotoGallery;
