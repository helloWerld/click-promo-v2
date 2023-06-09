import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import EditorSection from './EditorSection';
import BasicInfoForm from './Forms/BasicInfoForm';
import SocialMediaAccountForm from './Forms/SocialMediaAccountsForm';
import { useFirestoreContext } from '../../context/FirestoreContext';
import PhotosForm from './Forms/PhotosForm';
import PromotionsForm from './Forms/PromotionsForm';

const EditCreatorProfile = () => {
	const [expanded, setExpanded] = useState(null);
	const { userData } = useAuthContext();
	const { setCurrentUserInfo } = useFirestoreContext();

	useEffect(() => {
		console.log('getting current user info');
		if (userData) {
			setCurrentUserInfo();
		}
	}, []);

	const handleSectionClick = (section) => {
		expanded == section ? setExpanded(null) : setExpanded(section);
	};

	return (
		<div className="flex items-start bg-stone-900 h-full w-full overflow-y-auto">
			<div className="flex flex-col bg-stone-900 text-white w-full items-center justify-center gap-4">
				<h2 className="text-2xl mb-2 md:mt-40">Edit Your Public Profile</h2>
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
					<BasicInfoForm />
				</EditorSection>
				<EditorSection
					sectionTitle="Social Media Accounts"
					expanded={expanded}
					handleSectionClick={handleSectionClick}
				>
					<SocialMediaAccountForm />
				</EditorSection>
				<EditorSection
					sectionTitle="Images"
					expanded={expanded}
					handleSectionClick={handleSectionClick}
				>
					<PhotosForm />
				</EditorSection>
				<EditorSection
					sectionTitle="Promotions"
					expanded={expanded}
					handleSectionClick={handleSectionClick}
				>
					<PromotionsForm />
				</EditorSection>
			</div>
		</div>
	);
};

export default EditCreatorProfile;
