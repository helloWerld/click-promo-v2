import React from 'react';
import { useFirestoreContext } from '../../../context/FirestoreContext';
import reference from '../../../misc/reference';

const BasicInfoForm = () => {
	const { allTopics } = reference;

	const { state, dispatch, saveProfileChanges } = useFirestoreContext();
	const { currentUserPublicInfo, currentUserProtectedInfo } = state;

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
			<div className="flex flex-row items-start">
				<label className="w-1/3 text-xl text-start font-semibold">
					Brand Name
				</label>
				<input
					type="text"
					placeholder={currentUserProtectedInfo?.name}
					className="w-2/3 rounded-xl py-1 px-2 text-black"
					onChange={(e) => {
						dispatch({
							type: 'UPDATE_CURRENT_USER_PROTECTED_INFO',
							payload: {
								key: 'name',
								value: e.target.value,
							},
						});
						dispatch({
							type: 'UPDATE_CURRENT_USER_PUBLIC_INFO',
							payload: {
								key: 'name',
								value: e.target.value,
							},
						});
					}}
				/>
			</div>
			<div className="flex flex-row items-center">
				<label
					htmlFor="headline"
					className="w-1/3 text-xl text-start font-semibold"
				>
					Headline
				</label>
				<input
					id="headline"
					type="text"
					placeholder={currentUserProtectedInfo?.headline}
					className="w-2/3 rounded-xl py-1 px-2 text-black"
					onChange={(e) =>
						dispatch({
							type: 'UPDATE_CURRENT_USER_PROTECTED_INFO',
							payload: {
								key: 'headline',
								value: e.target.value,
							},
						})
					}
				/>
			</div>
			<div className="flex flex-row items-center">
				<div className="flex-flex-col w-1/3">
					<p className="w-full text-xl text-start font-semibold mb-1">
						Description
					</p>
					<p className="w-1/2 text-xs text-start">Describe your brand</p>
				</div>
				<textarea
					placeholder={currentUserProtectedInfo?.description}
					type="text"
					rows="5"
					className="w-2/3 rounded-xl py-1 px-2 text-black"
					onChange={(e) =>
						dispatch({
							type: 'UPDATE_CURRENT_USER_PROTECTED_INFO',
							payload: {
								key: 'description',
								value: e.target.value,
							},
						})
					}
				/>
			</div>
			<div className="flex flex-row items-center">
				<div className="flex-flex-col w-1/3">
					<p className="w-full text-xl text-start font-semibold mb-1">Topics</p>
					<p className="w-1/2 text-xs text-start">
						What topics do you regularly cover?
					</p>
				</div>
				<div className="flex flex-row w-2/3 flex-wrap justify-center">
					{allTopics.map((topic) => (
						<div key={topic.name}>
							<input
								id={topic.name}
								name={topic.name}
								value={topic.name}
								type="checkbox"
								className="rounded-xl py-1 px-2 text-black mr-2"
								checked={currentUserPublicInfo?.topics?.includes(topic.name)}
								onChange={() =>
									currentUserPublicInfo.topics.includes(topic.name)
										? dispatch({
												type: 'UPDATE_CURRENT_USER_PUBLIC_INFO',
												payload: {
													key: 'topics',
													value: [
														...state.currentUserPublicInfo.topics.filter(
															(item) => item != topic.name
														),
													],
												},
										  })
										: dispatch({
												type: 'UPDATE_CURRENT_USER_PUBLIC_INFO',
												payload: {
													key: 'topics',
													value: [
														...state.currentUserPublicInfo.topics,
														topic.name,
													],
												},
										  })
								}
							/>
							<label htmlFor={topic.name} className=" mr-5">
								{topic.name}
							</label>
						</div>
					))}
				</div>
			</div>
			<button
				type="submit"
				className="w-fit ml-auto border border-amber-400 rounded-lg px-3 py-2 text-amber-400 hover:bg-amber-400 hover:text-black"
			>
				Save Changes
			</button>
		</form>
	);
};

export default BasicInfoForm;
