import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import EditorSection from './EditorSection';
import BasicInfoForm from './Forms/BasicInfoForm';
import SocialMediaAccountForm from './Forms/SocialMediaAccountsForm';
import { useFirestoreContext } from '../../context/FirestoreContext';
import PhotosForm from './Forms/PhotosForm';
import PromotionsForm from './Forms/PromotionsForm';

const EditProfile = () => {
	const [expanded, setExpanded] = useState(null);
	const { userData } = useAuthContext();
	const { creatorsProtectedData, getCreatorsProtectedData } =
		useFirestoreContext();

	const handleSectionClick = (section) => {
		expanded == section ? setExpanded(null) : setExpanded(section);
	};

	useEffect(() => {
		console.log(userData);
		getCreatorsProtectedData(userData?.protected_data_id);
	}, [userData]);

	return (
		<div className="flex flex-col bg-stone-900 h-full text-white w-full items-center justify-center gap-4">
			<h2 className="text-2xl mb-2">Edit Your Brand Profile</h2>
			<Link
				to={`/creators/${userData?.protected_data_id}`}
				className="px-3 py-2 mb-10 border border-amber-400 text-amber-400 rounded-lg hover:bg-black"
			>
				View Profile
			</Link>
			<EditorSection
				sectionTitle="Basic Info"
				expanded={expanded}
				handleSectionClick={handleSectionClick}
			>
				<BasicInfoForm creatorsProtectedData={creatorsProtectedData} />
			</EditorSection>
			<EditorSection
				sectionTitle="Social Media Accounts"
				expanded={expanded}
				handleSectionClick={handleSectionClick}
			>
				<SocialMediaAccountForm creatorsProtectedData={creatorsProtectedData} />
			</EditorSection>
			<EditorSection
				sectionTitle="Photos"
				expanded={expanded}
				handleSectionClick={handleSectionClick}
			>
				<PhotosForm images={creatorsProtectedData?.images} />
			</EditorSection>
			<EditorSection
				sectionTitle="Promotions"
				expanded={expanded}
				handleSectionClick={handleSectionClick}
			>
				<PromotionsForm />
			</EditorSection>
		</div>
	);
};

export default EditProfile;
