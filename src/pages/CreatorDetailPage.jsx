import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AiFillStar } from 'react-icons/ai';

import avatar from '../assets/avatar-transparent.png';

import { PhotoGallery, Demographics, Reviews } from '../components/Blocks';
import { ReservationCard } from '../components/Cards';
import {
	CreatorTopicList,
	SocialPlatformList,
	PromoOptionsList,
} from '../components/Lists';
import AppWrap from '../wrapper/AppWrap';
import { useFirestoreContext } from '../context/FirestoreContext';

const CreatorDetailPage = () => {
	const { state, getCreatorData } = useFirestoreContext();
	const { protectedId } = useParams();
	const [loading, setLoading] = useState(true);
	const { creatorPublicData, creatorProtectedData } = state;

	useEffect(() => {
		console.log(protectedId);
		setLoading(true);
		getCreatorData(protectedId);
		setLoading(false);
	}, [state.creators]);

	return (
		<>
			{loading ? (
				<div className="flex flex-col px-3 md:px-0">
					<div className="bg-gray-200 w-1/2 h-16 rounded-xl mt-10 p-2"></div>
					<div className="flex flex-row bg-gray-200 w-full h-160 rounded-xl mt-5 p-3 gap-2">
						<div className="w-full md:w-1/2 h-full bg-gray-400 rounded-xl">
							<img
								src={avatar}
								className="w-full h-full rounded-xl animate-pulse object-cover"
							/>
						</div>
						<div className="hidden md:grid grid-rows-2 grid-cols-2 w-1/2 h-full gap-2">
							<div className="w-full h-full bg-gray-400 rounded-xl animate-pulse"></div>
							<div className="w-full h-full bg-gray-400 rounded-xl animate-pulse"></div>
							<div className="w-full h-full bg-gray-400 rounded-xl animate-pulse"></div>
							<div className="w-full h-full bg-gray-400 rounded-xl animate-pulse"></div>
						</div>
					</div>
					<div className="flex flex-col md:flex-row gap-5">
						<div className="bg-gray-200 w-full md:w-2/3 h-160 rounded-xl mt-5 "></div>
						<div className="bg-gray-200 w-full md:w-1/3 h-160 rounded-xl mt-5 "></div>
					</div>
				</div>
			) : (
				<>
					<div className="flex justify-center text-gray-800 my-8">
						<div className="flex flex-col w-full">
							<h1 className="flex relative text-4xl font-bold mt-5 px-3 md:px-0 inline items-center">
								{creatorProtectedData?.name}
							</h1>
							<div className="flex flex-row items-center gap-3 mt-2 px-3 md:px-0">
								<div className="flex flex-row items-center">
									<AiFillStar />
									<p>{creatorProtectedData?.overallRating}</p>
								</div>
								<p className="underline">
									{creatorProtectedData?.numberOfReviews} Reviews
								</p>
							</div>
							<div className="flex flex-row justify-center mt-5">
								<PhotoGallery images={creatorProtectedData?.images} />
							</div>
							<div className="flex flex-col px-5 md:px-0 md:flex-row md:mt-10 gap-5 md:gap-12">
								<div className="w-full md:w-3/5 mt-5 md:mt-0">
									<div className="relative text-xl md:text-2xl mb-4 font-semibold">
										{creatorProtectedData?.headline}
									</div>
									<div className="relative flex flex-row text-gray-600">
										<CreatorTopicList
											topics={creatorPublicData?.topics}
											iconSize={20}
										/>
									</div>
									<div className="relative text-sm md:text-base mt-5 text-gray-600">
										{creatorProtectedData?.description}
									</div>
									<hr className="my-6" />
									<div className="relative">
										<h2 className="font-semibold text-sm mb-2">Socials</h2>
										<SocialPlatformList
											creatorSocials={creatorPublicData?.socials}
											subs
										/>
									</div>
									<hr className="my-6" />
									<div className="relative">
										<PromoOptionsList
											creator={creatorPublicData}
											promotions={creatorProtectedData?.promotions}
										/>
									</div>
								</div>
								<div className="w-full h-full md:w-2/5 md:mt-0">
									<ReservationCard creator={creatorProtectedData} />
								</div>
							</div>
							<hr className="my-8 border border-gray-200" />
							<div className="flex flex-col px-3">
								{creatorProtectedData?.demographics && (
									<div className="flex flex-col gap-3 mb-5">
										<Demographics creator={creatorProtectedData} />
									</div>
								)}
								{true && (
									<div className="flex flex-col gap-3 mb-5">
										<Reviews reviews={creatorProtectedData?.reviews} />
									</div>
								)}
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default AppWrap(CreatorDetailPage);
