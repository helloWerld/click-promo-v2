import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import reference from '../../misc/reference';

const PromoDetailModal = ({ closeModal, promotion }) => {
	const [allPlatforms, setAllPlatforms] = useState(null);
	useEffect(() => {
		setAllPlatforms(reference?.allPlatforms);
	}, []);
	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	});

	return (
		<div
			className={
				'fixed top-0 right-0 left-0 bottom-0 flex w-full h-full bg-gray-800/50 z-30 items-center justify-center p-0 m-0 bg-scroll'
			}
			onClick={closeModal}
		>
			<div
				className="flex flex-col bg-white rounded-xl w-1/3 h-auto z-40 rounded-lg border border-gray-600 shadow-xl"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex flex-row relative h-14 items-center mx-5">
					<AiOutlineClose
						size={18}
						className="absolute cursor-pointer"
						onClick={closeModal}
					/>
					<p className="mx-auto font-semibold">Details</p>
				</div>
				<hr />
				<div className="flex flex-col mx-5 my-8 px-4 gap-1">
					<div className="flex flex-col w-full text-center items-center justify-center text-5xl">
						{
							allPlatforms?.filter(
								(item) => item.name == promotion?.socialName
							)[0].fill
						}
						<h2 className="text-2xl">{`${promotion.socialName} Promotion`}</h2>
					</div>
					<hr className="border-1 border-black w-1/4 mx-auto mb-6" />
					<div className="flex flex-row justify-between w-full">
						<h2 className="text-2xl font-semibold">{promotion?.name}</h2>
						<p className="text-xl font-semibold">
							{USDollar.format(promotion?.priceInUsd)}
						</p>
					</div>
					<p>{promotion?.description}</p>
					<div className="flex flex-row items-center gap-2 mt-4">
						<h2 className="font-bold">Minimum Lead Time:</h2>
						<p className="">{promotion?.leadTime}</p>
					</div>
					<div className="flex flex-row items-center gap-2 mt-2">
						<h2 className="font-bold">Example:</h2>
						<a
							className="text-cyan-600 font-semibold"
							href={promotion?.exampleLink}
							target="_blank"
							rel="noopener noreferrer"
						>
							{promotion?.exampleLink}
						</a>
					</div>
					<h2 className="font-bold text-xl underline mt-4">What's Included</h2>
					{promotion?.whatsIncluded.map((item) => (
						<p className="w-full my-1" key={item}>{`• ${item}`}</p>
					))}
				</div>
			</div>
		</div>
	);
};

export default PromoDetailModal;
