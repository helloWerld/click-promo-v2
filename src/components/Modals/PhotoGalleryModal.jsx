import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const PhotoGalleryModal = ({ togglePhotoGalleryModal, images }) => {
	return (
		<div
			className={
				'fixed top-0 right-0 left-0 bottom-0 flex w-full h-full bg-gray-800/50 z-30 justify-center p-0 m-0 overflow-y-scroll scrollbar-hide'
			}
			onClick={togglePhotoGalleryModal}
		>
			<div
				className="flex flex-col bg-white h-max my-12 rounded-xl w-10/12 md:w-3/5 z-40 rounded-lg border border-gray-600 shadow-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-row relative h-14 items-center mx-5">
					<AiOutlineClose
						size={18}
						className="absolute cursor-pointer"
						onClick={togglePhotoGalleryModal}
					/>
					<p className="mx-auto font-semibold">Gallery</p>
				</div>
				<hr />
				<div className="flex flex-row lg:mx-12 my-12 flex-wrap gap-5">
					{images.map((image) => (
						<div key={image} className="w-full">
							<img src={image} className="lg:rounded-xl w-full" />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default PhotoGalleryModal;
