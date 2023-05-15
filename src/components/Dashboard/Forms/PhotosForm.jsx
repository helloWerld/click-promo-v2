import React, { useEffect, useState } from 'react';
import { useFirestoreContext } from '../../../context/FirestoreContext';
import { BsCardImage, BsTrash3Fill } from 'react-icons/bs';
import { IoMdImage } from 'react-icons/io';
import avatar from '../../../assets/avatar.png';
import Storage from '../../../handlers/storage';

const PhotosForm = () => {
	const { state, dispatch, saveProfileChanges } = useFirestoreContext();
	const { currentUserPublicInfo, currentUserProtectedInfo } = state;
	const { uploadFile, downloadFile } = Storage;
	const [saving, setSaving] = useState('Save Changes');
	const [imageUpload, setImageUpload] = useState(null);

	const handleImageUpload = (e) => {
		uploadFile({
			file: e.target.files[0],
			title: e.target.files[0].name,
			path: URL.createObjectURL(e.target.files[0]),
		})
			.then(downloadFile)
			.then((url) => {
				console.log('dispatching', url);
				setImageUpload(url);
			});
	};

	const handleAddToGallery = () => {
		dispatch({
			type: 'UPDATE_CURRENT_USER_PROTECTED_INFO',
			payload: {
				key: 'images',
				value: [...currentUserProtectedInfo.images, imageUpload],
			},
		});
		setImageUpload(null);
	};

	const handleDelete = (image) => {
		const newImages = currentUserProtectedInfo.images.filter(
			(item) => item != image
		);
		dispatch({
			type: 'UPDATE_CURRENT_USER_PROTECTED_INFO',
			payload: {
				key: 'images',
				value: newImages,
			},
		});
	};

	const handleChangeThumbnail = (image) => {
		const newImages = [
			image,
			...currentUserProtectedInfo.images.filter((item) => item != image),
		];
		dispatch({
			type: 'UPDATE_CURRENT_USER_PROTECTED_INFO',
			payload: {
				key: 'images',
				value: newImages,
			},
		});
	};

	useEffect(() => {
		if (saving == 'Saved!') {
			const delay = setTimeout(() => {
				setSaving('Save Changes');
			}, 2000);

			return () => clearTimeout(delay);
		}
	}, [saving]);

	return (
		<div className="flex flex-col w-full px-4 pb-4">
			<form className="flex items-center justify-center w-full px-8 gap-2">
				<div className="flex flex-col w-1/2 items-center justify-center">
					<div className="w-fit hover:bg-stone-800 p-8 rounded-xl cursor-pointer  hover:shadow-white/30 hover:shadow-sm transition duration-500 ease-in-out">
						<label
							htmlFor="image-upload"
							className="flex flex-col cursor-pointer text-center justify-center items-center gap-2"
						>
							<BsCardImage className="text-5xl" />
							<p>Upload New Image</p>
						</label>
						<input
							type="file"
							className="absolute h-0 w-0"
							name="image-upload"
							id="image-upload"
							onChange={handleImageUpload}
						/>
					</div>
				</div>
				<div className="flex flex-col w-1/2 text-center items-center justify-center">
					<p>Preview</p>
					<img
						className="w-full border-2 rounded-xl"
						src={imageUpload || avatar}
					/>
					<button
						type="button"
						onClick={handleAddToGallery}
						className={`w-fit border ${
							!imageUpload
								? 'border-gray-300 text-gray-300'
								: 'border-amber-400 text-amber-400 hover:bg-amber-400  hover:text-black'
						} mt-4 rounded-lg px-3 py-2`}
						disabled={!imageUpload}
					>
						Add To Gallery
					</button>
				</div>
			</form>
			<hr className="flex mx-auto w-11/12 my-4" />
			<h2 className="w-full text-center mt-2 mb-4 text-2xl font-semibold">
				Image Gallery
			</h2>

			<p className="w-1/2 text-center bg-amber-500 text-black pt-2 font-semibold rounded-t-lg">
				Thumbnail Image
			</p>
			<div className="flex flex-row">
				<div className="w-1/2 h-max text-center relative">
					<div
						onClick={() => handleDelete(0)}
						className="flex items-center justify-center absolute bottom-2 right-2 bg-rose-500/50 hover:bg-rose-500 h-12 w-12 rounded-tl border border-rose-500 cursor-pointer"
					>
						<BsTrash3Fill className=" text-3xl" />
					</div>
					<img
						className="w-full border-8 border-amber-500 aspect-square overflow-clip"
						src={currentUserProtectedInfo?.images[0]}
					/>
				</div>
				<div className="w-1/2 grid grid-cols-2 gap-2 pl-2">
					{currentUserProtectedInfo?.images?.slice(1, 5).map((image) => (
						<div
							key={image}
							className="relative flex h-full w-full aspect-square overflow-clip"
						>
							<div
								onClick={() => handleDelete(image)}
								className="flex items-center justify-center absolute bottom-0 right-0 bg-rose-500/50 hover:bg-rose-500 h-8 w-8 rounded-tl border border-rose-500 cursor-pointer"
							>
								<BsTrash3Fill className=" text-xl" />
							</div>
							<div
								onClick={(e) => handleChangeThumbnail(image)}
								className="flex items-center justify-center absolute bottom-0 left-0 bg-amber-500/50 hover:bg-amber-500 h-8 w-8 rounded-tr border border-amber-500 cursor-pointer"
							>
								<IoMdImage className=" text-xl" />
							</div>
							<img
								src={image}
								className="flex h-full w-full aspect-square object-cover border-2 border-white"
							/>
						</div>
					))}
				</div>
			</div>
			<div className="w-full grid grid-cols-4 gap-2 mt-2">
				{currentUserProtectedInfo?.images?.slice(5).map((image) => (
					<div
						key={image}
						className="relative flex h-full w-full aspect-square overflow-clip"
					>
						<div
							onClick={() => handleDelete(image)}
							className="flex items-center justify-center absolute bottom-0 right-0 bg-rose-500/50 hover:bg-rose-500 h-8 w-8 rounded-tl border border-rose-500 cursor-pointer"
						>
							<BsTrash3Fill className=" text-xl" />
						</div>
						<div
							onClick={(e) => handleChangeThumbnail(image)}
							className="flex items-center justify-center absolute bottom-0 left-0 bg-amber-500/50 hover:bg-amber-500 h-8 w-8 rounded-tr border border-amber-500 cursor-pointer"
						>
							<IoMdImage className=" text-xl" />
						</div>
						<img
							src={image}
							className="flex h-full w-full aspect-square object-cover border-2 border-white"
						/>
					</div>
				))}
			</div>
			<div className="flex flex-row justify-end w-full mt-4">
				<button
					type="submit"
					className="w-fit border border-amber-400 rounded-lg px-3 py-2 text-amber-400 hover:bg-amber-400 hover:text-black"
					onClick={() => {
						setSaving('Saving...');
						try {
							saveProfileChanges();
							setSaving('Saved!');
						} catch (error) {
							console.log(error);
						}
					}}
				>
					{saving}
				</button>
			</div>
		</div>
	);
};

export default PhotosForm;
