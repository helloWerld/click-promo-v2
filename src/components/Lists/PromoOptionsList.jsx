import React, { useState } from 'react';
import SocialPlatformList from './SocialPlatformList';
import PromoDetailModal from '../Modals/PromoDetailModal';
import { useFirestoreContext } from '../../context/FirestoreContext';

import { FaChevronDown } from 'react-icons/fa';

const PromoOptionsList = () => {
	const [filter, setFilter] = useState('all');
	const [showFilters, setShowFilters] = useState(false);
	const [showPlatform, setShowPlatform] = useState('');
	const [detailModal, setDetailModal] = useState('');
	const { state } = useFirestoreContext();

	const handleFilterSelection = (filterName) => {
		setFilter(filterName);
	};

	const closeDetailModal = () => {
		setDetailModal('');
	};

	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	});

	return (
		<>
			<div className="flex flex-col">
				<div className="flex flex-row justify-between items-center mb-3">
					<h2 className="font-semibold text-sm">Promo Options</h2>
					<div className="flex flex-row gap-5">
						<div
							className={`transition-all text-lg duration-300 ease-in-out cursor-pointer ${
								showFilters ? 'opacity-100' : 'opacity-0'
							}`}
						>
							<SocialPlatformList
								creatorSocials={state?.creatorPublicData?.socials}
								fill
								onclick={handleFilterSelection}
							/>
						</div>
						<div
							className="flex flex-row items-center gap-1 cursor-pointer"
							onClick={() => setShowFilters(!showFilters)}
						>
							{showFilters ? (
								<p className="text-sm" onClick={() => setFilter('all')}>
									Reset
								</p>
							) : (
								<p className="text-sm">Filter</p>
							)}
							<FaChevronDown
								size={10}
								className={`${showFilters && 'rotate-90'}`}
							/>
						</div>
					</div>
				</div>
				{state?.creatorProtectedData?.promotions
					?.filter((promotion) =>
						filter === 'all'
							? promotion
							: filter.toLowerCase() === promotion.socialName.toLowerCase()
					)
					.map((promotion) => (
						<div className="relative" key={promotion.name}>
							<div
								className={`text-3xl invisible md:visible absolute left-10 top-5 bottom-0 transition-all duration-700 ease-in-out -z-10 ${
									showPlatform == promotion.name ? '-ml-24' : ''
								}`}
							>
								<SocialPlatformList creatorSocials={[promotion]} fill />
							</div>
							<div
								className="bg-white hover:w-full border rounded-xl py-3 px-5 mb-3 hover:shadow-lg transition duration-700 ease-in-out cursor-pointer z-20"
								onMouseOver={() => setShowPlatform(promotion.name)}
								onMouseOut={() => setShowPlatform('')}
								onClick={() => setDetailModal(promotion)}
							>
								<div className="flex flex-row justify-between">
									<h2 className="text-xl font-semibold">{promotion.name}</h2>
									<p className="font-semibold">{`${USDollar.format(
										promotion.priceInUsd
									)}`}</p>
								</div>
								<p className="text-gray-700 line-clamp-1">
									{promotion.description}
								</p>
							</div>
						</div>
					))}
			</div>
			{detailModal && (
				<PromoDetailModal
					closeModal={closeDetailModal}
					promotion={
						state?.creatorProtectedData?.promotions?.filter(
							(promotion) => promotion == detailModal
						)[0]
					}
				/>
			)}
		</>
	);
};

export default PromoOptionsList;
