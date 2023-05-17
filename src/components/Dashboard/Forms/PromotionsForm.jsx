import React, { useState } from 'react';
import reference from '../../../misc/reference';
import { useEffect } from 'react';
import { TiDelete } from 'react-icons/ti';
import { useFirestoreContext } from '../../../context/FirestoreContext';
import PromoDetailModal from '../../Modals/PromoDetailModal';

const PromotionsForm = () => {
	const { state, dispatch, saveProfileChanges } = useFirestoreContext();
	const [allPlatforms, setAllPlatforms] = useState(null);
	const [saving, setSaving] = useState('Save Changes');
	const [newItem, setNewItem] = useState(null);
	const [expand, setExpand] = useState(false);
	const [detailModal, setDetailModal] = useState('');
	const [inputs, setInputs] = useState({
		name: null,
		description: null,
		priceInUsd: null,
		socialName: null,
		exampleLink: null,
		leadTime: null,
		whatsIncluded: [],
	});

	const closeDetailModal = () => {
		setDetailModal('');
	};

	useEffect(() => {
		setAllPlatforms(reference?.allPlatforms);
	}, []);

	useEffect(() => {
		if (saving == 'Saved!') {
			const delay = setTimeout(() => {
				setSaving('Save Changes');
			}, 2000);

			return () => clearTimeout(delay);
		}
	}, [saving]);

	const leadTimes = [
		'< 24 hours',
		'1 - 3 days',
		'4 - 7 days',
		'1 - 2 weeks',
		'Over 2 weeks',
	];

	const handleOnChange = (key, value) => {
		setInputs({
			...inputs,
			[key]: value,
		});
	};

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	});

	return (
		<div className="w-full flex flex-col my-5 px-12">
			<div>
				<button
					type="button"
					className="border border-amber-500 rounded-lg px-3 py-2 text-amber-500 hover:text-black hover:bg-amber-500"
					onClick={() => setExpand(!expand)}
				>
					{!expand ? '+ New Promotion' : 'Close Form'}
				</button>
				{expand && (
					<div className="flex flex-col mt-8">
						<div className="flex flex-row text-xl items-center justify-start">
							<label className="w-1/3">Platform</label>
							<select
								name="platform"
								className="bg-transparent w-fit py-1 px-3 rounded-xl border"
								onChange={(e) => handleOnChange('socialName', e.target.value)}
								value={inputs.socialName || ''}
							>
								<option value="">Select</option>
								{allPlatforms?.map((platform) => (
									<option value={platform.name} key={platform.name}>
										{platform.name}
									</option>
								))}
							</select>
						</div>
						<div className="flex flex-row text-xl items-center justify-start mt-8">
							<label className="w-1/3">Name</label>
							<input
								type="text"
								name="promoName"
								id="promoName"
								placeholder=""
								value={inputs.name || ''}
								className="w-2/3 rounded-xl py-1 px-2 text-black"
								onChange={(e) => handleOnChange('name', e.target.value)}
							/>
						</div>
						<div className="flex flex-row text-xl items-center justify-start mt-8">
							<label className="w-1/3">Description</label>
							<textarea
								type="text"
								name="promoName"
								id="promoName"
								placeholder=""
								className="w-2/3 rounded-xl py-1 px-2 text-black"
								onChange={(e) => handleOnChange('description', e.target.value)}
								value={inputs.description || ''}
							/>
						</div>
						<div className="flex flex-row text-xl items-center justify-start mt-8">
							<label className="w-1/3">Price in USD ($)</label>
							<input
								type="number"
								name="promoName"
								id="promoName"
								placeholder=""
								className="w-2/3 rounded-xl py-1 px-2 text-black appearance-none"
								onChange={(e) => handleOnChange('priceInUsd', e.target.value)}
								value={inputs.priceInUsd || ''}
							/>
						</div>
						<div className="flex flex-row text-xl items-center justify-start mt-8">
							<label className="w-1/3">Lead Time</label>
							<select
								name="platform"
								className="bg-transparent w-fit py-1 px-3 rounded-xl border"
								onChange={(e) => handleOnChange('leadTime', e.target.value)}
								value={inputs.leadTime || ''}
							>
								<option value="">Select</option>
								{leadTimes?.map((time) => (
									<option value={time} key={time}>
										{time}
									</option>
								))}
							</select>
						</div>
						<div className="flex flex-row text-xl items-center justify-start mt-8">
							<label className="w-1/3">Example Link</label>
							<input
								type="text"
								name="promoName"
								id="promoName"
								placeholder=""
								className="w-2/3 rounded-xl py-1 px-2 text-black"
								onChange={(e) => handleOnChange('exampleLink', e.target.value)}
								value={inputs.exampleLink || ''}
							/>
						</div>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								newItem &&
									handleOnChange('whatsIncluded', [
										...inputs?.whatsIncluded,
										newItem,
									]);
								e.target.elements.promoName.value = '';
								setNewItem(null);
							}}
							className="flex flex-row text-xl items-center justify-start mt-8"
						>
							<label className="w-1/3">What's Included</label>
							<div className="flex flex-row w-2/3">
								<input
									type="text"
									name="promoName"
									id="promoName"
									placeholder=""
									className="grow rounded-l-xl py-1 px-2 text-black"
									onChange={(e) => setNewItem(e.target.value)}
								/>
								<button
									type="submit"
									className="w-1/12 bg-amber-500 rounded-r-xl hover:text-black"
								>
									+
								</button>
							</div>
						</form>
						<div className="flex flex-row w-full justify-end mt-4">
							<div className="flex flex-col w-2/3 float-end gap-1">
								{inputs?.whatsIncluded &&
									inputs.whatsIncluded.map((item) => (
										<div
											className="flex flex-row justify-between items-center"
											key={item}
										>
											<p>{`• ${item}`}</p>
											<TiDelete
												className="text-2xl text-rose-500 hover:scale-110 cursor-pointer"
												onClick={() =>
													setInputs({
														...inputs,
														whatsIncluded: inputs.whatsIncluded.filter(
															(listItem) => listItem != item
														),
													})
												}
											/>
										</div>
									))}
							</div>
						</div>
						<div className="w-full justify-end flex flex-row mt-4">
							<button
								type="button"
								onClick={() => {
									dispatch({
										type: 'UPDATE_CURRENT_USER_PROTECTED_INFO',
										payload: {
											key: 'promotions',
											value: [
												...state?.currentUserProtectedInfo?.promotions,
												inputs,
											],
										},
									});
									setInputs({
										name: null,
										description: null,
										priceInUsd: null,
										socialName: null,
										exampleLink: null,
										leadTime: null,
										whatsIncluded: [],
									});
								}}
								className={`w-fit border ${
									!inputs
										? 'border-gray-300 text-gray-300'
										: 'border-amber-400 text-amber-400 hover:bg-amber-400  hover:text-black'
								} mt-4 rounded-lg px-3 py-2`}
								disabled={!inputs}
							>
								Add Promotion
							</button>
						</div>
					</div>
				)}
			</div>
			<hr className="w-full my-4" />
			<h2 className="w-full text-center mt-2 mb-4 text-2xl font-semibold">
				Current Promotions
			</h2>
			<div className="flex flex-col">
				{state.currentUserProtectedInfo.promotions.length > 0 ? (
					state.currentUserProtectedInfo.promotions.map((promotion) => (
						<div
							className="flex flex-row items-center gap-1"
							key={`${promotion.socialName}${promotion.name}`}
							onClick={() => setDetailModal(promotion)}
						>
							<div className="flex flex-row w-full border border-amber-500 rounded-xl my-2 p-3 justify-between hover:bg-amber-500 hover:text-black cursor-pointer transition duration-500 ease-in-out">
								<div className="flex flex-row gap-6">
									<div className="flex text-3xl items-center">
										{
											allPlatforms?.filter(
												(platform) => platform.name == promotion.socialName
											)[0].icon
										}
									</div>
									<div className="flex flex-col">
										<p className="font-semibold text-lg">{promotion.name}</p>
										<p className="text-sm">{promotion.description}</p>
									</div>
								</div>
								<p className="text-lg font-semibold">
									{formatter.format(promotion.priceInUsd)}
								</p>
							</div>
							<TiDelete
								className="text-4xl text-rose-500 hover:scale-110 cursor-pointer"
								onClick={() =>
									dispatch({
										type: 'UPDATE_CURRENT_USER_PROTECTED_INFO',
										payload: {
											key: 'promotions',
											value: state.currentUserProtectedInfo.promotions.filter(
												(item) => item != promotion
											),
										},
									})
								}
							/>
						</div>
					))
				) : (
					<p className="w-full text-center">No promotions yet.</p>
				)}
			</div>

			<button
				className="w-fit ml-auto border border-amber-400 rounded-lg px-3 py-2 mt-4 text-amber-400 hover:bg-amber-400 hover:text-black"
				onClick={(e) => {
					e.preventDefault();
					setSaving('Saving...');
					saveProfileChanges();
					setSaving('Saved!');
				}}
			>
				{saving}
			</button>
			{detailModal && (
				<div className="text-black">
					<PromoDetailModal
						closeModal={closeDetailModal}
						promotion={detailModal}
					/>
				</div>
			)}
		</div>
	);
};

export default PromotionsForm;
