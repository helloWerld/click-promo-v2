import React from 'react';

const PhotosForm = ({ images }) => {
	return (
		<div>
			<div className="hidden md:grid grid-cols-4 gap-2 w-full px-4 pb-4">
				{images?.map((image) => (
					<div
						key={image}
						className="flex h-full w-full aspect-square overflow-clip"
					>
						<img
							src={image}
							className="flex h-full w-full aspect-square object-cover"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

export default PhotosForm;
