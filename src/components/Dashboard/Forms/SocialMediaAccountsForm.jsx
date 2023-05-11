import React from 'react';

const SocialMediaAccountForm = ({ creatorsProtectedData }) => {
	return (
		<form className="w-full flex flex-col my-5 px-12 gap-8">
			<div className="flex flex-row items-start">
				<label className="w-1/3 text-xl text-start">YouTube URL</label>
				<input type="text" className="w-2/3 rounded-xl py-1 px-2 text-black" />
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/3 text-xl text-start">Twitter URL</label>
				<input type="text" className="w-2/3 rounded-xl py-1 px-2 text-black" />
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/3 text-xl text-start">Facebook URL</label>
				<input type="text" className="w-2/3 rounded-xl py-1 px-2 text-black" />
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/3 text-xl text-start">Instagram URL</label>
				<input type="text" className="w-2/3 rounded-xl py-1 px-2 text-black" />
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/3 text-xl text-start">TikTok URL</label>
				<input type="text" className="w-2/3 rounded-xl py-1 px-2 text-black" />
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/3 text-xl text-start">Discord URL</label>
				<input type="text" className="w-2/3 rounded-xl py-1 px-2 text-black" />
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/3 text-xl text-start">Telegram URL</label>
				<input type="text" className="w-2/3 rounded-xl py-1 px-2 text-black" />
			</div>
			<div className="flex flex-row items-center">
				<label className="w-1/3 text-xl text-start">Reddit URL</label>
				<input type="text" className="w-2/3 rounded-xl py-1 px-2 text-black" />
			</div>
			<button className="w-32 ml-auto border border-amber-400 rounded-lg px-3 py-2 text-amber-400 hover:bg-amber-400 hover:text-black">
				Save
			</button>
		</form>
	);
};

export default SocialMediaAccountForm;
