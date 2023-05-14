import React from 'react';
import { useFirestoreContext } from '../../../context/FirestoreContext';
import reference from '../../../misc/reference';

const SocialMediaAccountForm = () => {
	const { state, dispatch, saveProfileChanges } = useFirestoreContext();
	const { currentUserPublicInfo, currentUserProtectedInfo } = state;
	const { allSocials } = reference;

	const handleChange = (e) => {
		const newSocials = currentUserPublicInfo.socials.filter(
			(social) => social.socialName != e.target.id
		);

		dispatch({
			type: 'UPDATE_CURRENT_USER_PUBLIC_INFO',
			payload: {
				key: 'socials',
				value: [
					...newSocials,
					{
						socialName: e.target.id,
						subCount: null,
						url: e.target.value,
					},
				],
			},
		});
	};

	return (
		<form
			className="w-full flex flex-col my-5 px-12 gap-8"
			onSubmit={(e) => {
				e.preventDefault();
				console.log('submit');
				saveProfileChanges();
				e.target.reset();
			}}
		>
			{allSocials.map((social) => (
				<div className="flex flex-row items-start" key={social}>
					<label className="w-1/3 text-xl text-star font-semibold">{`${social} URL`}</label>
					<input
						type="text"
						name={social}
						id={social}
						placeholder={
							currentUserPublicInfo?.socials?.filter(
								(item) => item.socialName == social
							)[0]?.url
						}
						className="w-2/3 rounded-xl py-1 px-2 text-black"
						onChange={handleChange}
					/>
				</div>
			))}
			<button className="w-32 ml-auto border border-amber-400 rounded-lg px-3 py-2 text-amber-400 hover:bg-amber-400 hover:text-black">
				Save
			</button>
		</form>
	);
};

export default SocialMediaAccountForm;
