import { parseISO } from 'date-fns';
import React, { useState, useEffect } from 'react';
import format from 'date-fns/format';
import { useFirestoreContext } from '../../context/FirestoreContext';

const ReservationCard = ({ creator }) => {
	const [selectedPromo, setSelectedPromo] = useState({});
	const [selectedPromoDate, setSelectedPromoDate] = useState(null);
	const [promotions, setPromotions] = useState();

	const { creatorsProtectedData } = useFirestoreContext();

	useEffect(() => {
		setPromotions(creatorsProtectedData?.promotions);
	}, [creatorsProtectedData]);

	useEffect(() => {
		promotions && setSelectedPromo(promotions[0]);
	}, [promotions]);

	let USDollar = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	});

	return (
		<div className="sticky top-28 w-full h-auto border border-gray-300 rounded-lg p-5 bg-gradient-to-tl from-amber-300 to-amber-600/80 text-black md:bg-none md:text-gray-800 shadow-2xl">
			<div className="flex text-2xl font-semibold mb-8 mt-5 mx-auto items-center">
				{promotions ? (
					<p>
						{`${USDollar.format(selectedPromo?.priceInUsd)}`}
						<span className="font-light text-base">
							{' '}
							/ {selectedPromo?.name}{' '}
						</span>
					</p>
				) : (
					<p className="">Select a Promotion</p>
				)}
			</div>
			<div>
				<form className="flex flex-col w-full h-full">
					<div className="flex flex-col w-full h-full border border-gray-300 rounded-lg p-3 bg-white">
						<label htmlFor="promo" className="text-xs font-semibold">
							Promo Type
						</label>
						<select
							id="promo"
							name="promo"
							className="mt-1"
							onChange={(e) =>
								setSelectedPromo(
									promotions?.filter(
										(promotion) => e.target.value === promotion.name
									)[0]
								)
							}
						>
							{promotions?.map((promotion) => (
								<option key={promotion.name} value={promotion.name}>
									{promotion.name}
								</option>
							))}
						</select>
						<hr className="my-3" />
						<label htmlFor="promo-date" className="text-xs font-semibold">
							Publication Date
						</label>
						<input
							type="date"
							id="promo-date"
							className="mt-1"
							onChange={(e) => setSelectedPromoDate(e.target.value)}
						/>
					</div>
					<button className="w-full h-auto bg-black md:bg-gradient-to-tl md:from-amber-300 md:to-amber-600 md:text-black py-3 mt-4 rounded-lg text-white font-semibold hover:shadow-md hover:scale-105 transition duration-300 ease-in-out">
						Request
					</button>
					<p className="text-sm text-center text-light my-4">
						You won't be charged yet
					</p>
				</form>
				<div className="flex flex-col gap-3 my-5">
					<div className="flex flex-row md:text-gray-600 justify-between">
						<p>
							{selectedPromo?.name}{' '}
							{selectedPromoDate &&
								`on ${format(parseISO(selectedPromoDate), 'LLL dd, yyyy')}`}
						</p>
						<p>{`${USDollar.format(selectedPromo?.priceInUsd)}`}</p>
					</div>
				</div>
			</div>
			<hr className="my-6" />
			<div className="flex flex-row font-semibold justify-between mt-10 mb-3">
				<p>Total before taxes</p>
				<p>{USDollar.format(selectedPromo?.priceInUsd)}</p>
			</div>
		</div>
	);
};

export default ReservationCard;
