import React, { useEffect } from 'react';

const BasicInfoForm = ({ creatorsProtectedData }) => {
	return (
		<form className="w-full flex flex-col my-5 px-12 gap-8">
			<div className="flex flex-row items-start">
				<label className="w-1/3 text-xl text-start">Brand Name</label>
				<input
					type="text"
					placeholder={creatorsProtectedData?.name}
					className="w-2/3 rounded-xl py-1 px-2 text-black"
				/>
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/3 text-xl text-start">Headline</label>
				<input
					type="text"
					placeholder={creatorsProtectedData?.headline}
					className="w-2/3 rounded-xl py-1 px-2 text-black"
				/>
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/3 text-xl text-start">Description</label>
				<textarea
					placeholder={creatorsProtectedData?.description}
					type="text"
					rows="5"
					className="w-2/3 rounded-xl py-1 px-2 text-black"
				/>
			</div>
			<div className="flex flex-row items-center">
				<p className="w-1/3 text-xl text-start">Topics</p>
				<div className="flex flex-row w-2/3 flex-wrap justify-center">
					<div>
						<input
							id="Bitcoin"
							name="Bitcoin"
							value="Bitcoin"
							type="checkbox"
							className=" rounded-xl py-1 px-2 text-black mr-2"
						/>
						<label for="Bitcoin" className=" mr-5">
							Bitcoin
						</label>
					</div>
				</div>
			</div>
			<button className="w-32 ml-auto border border-amber-400 rounded-lg px-3 py-2 text-amber-400 hover:bg-amber-400 hover:text-black">
				Save
			</button>
		</form>
	);
};

export default BasicInfoForm;
