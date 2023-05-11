import React, { useState } from 'react';
import SocialPlatformList from './SocialPlatformList';
import PromoDetailModal from '../Modals/PromoDetailModal';

import { FaChevronDown } from 'react-icons/fa';

const PromoOptionsList = ({ creator, promotions, title }) => {
	const [filter, setFilter] = useState('all');
	const [showFilters, setShowFilters] = useState(false);
	const [showPlatform, setShowPlatform] = useState('');
	const [showDetailModal, setDetailModal] = useState('');

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
					<h2 className="font-semibold text-sm">{title}</h2>
					<div className="flex flex-row gap-5">
						<div
							className={`transition-all duration-300 ease-in-out ${
								showFilters ? 'opacity-100' : 'opacity-0'
							}`}
						>
							<SocialPlatformList
								creatorSocials={creator?.socials}
								fill
								size={20}
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
				{promotions
					?.filter((promotion) =>
						filter === 'all'
							? promotion
							: filter.toLowerCase() === promotion.socialName.toLowerCase()
					)
					.map((promotion) => (
						<div className="relative" key={promotion.name}>
							<div
								className={`invisible md:visible absolute left-10 top-5 bottom-0 transition-all duration-700 ease-in-out -z-10 ${
									showPlatform == promotion.name ? '-ml-24' : ''
								}`}
							>
								<SocialPlatformList
									creatorSocials={[promotion]}
									size={34}
									fill
								/>
							</div>
							<div
								className="bg-white hover:w-full border rounded-xl py-3 px-5 mb-3 hover:shadow-lg transition duration-700 ease-in-out cursor-pointer z-20"
								onMouseOver={() => setShowPlatform(promotion.name)}
								onMouseOut={() => setShowPlatform('')}
								onClick={() => setDetailModal(promotion.name)}
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
			{showDetailModal && (
				<PromoDetailModal
					closeModal={closeDetailModal}
					promotion={promotions.filter((promotion) =>
						promotion.name.includes(showDetailModal)
					)}
				/>
			)}
		</>
	);
};

export default PromoOptionsList;
