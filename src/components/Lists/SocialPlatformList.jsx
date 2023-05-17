import React, { useState, useEffect } from 'react';
import reference from '../../misc/reference';
import { BsPeopleFill } from 'react-icons/bs';

const SocialPlatformList = ({ creatorSocials, subs, fill, onclick }) => {
	const [allPlatforms, setAllPlatforms] = useState(null);
	useEffect(() => {
		setAllPlatforms(reference?.allPlatforms);
	}, []);
	return (
		<div className="flex flex-row gap-1">
			{subs
				? creatorSocials?.map((social) => (
						<div
							key={social.socialName}
							className="flex flex-col text-3xl transition-all duration-300 ease-in-out items-center mr-8 cursor-pointer grayscale hover:grayscale-0 hover:scale-110"
							onClick={() => {
								window.open(`${social?.url}`, '_blank');
							}}
						>
							{fill
								? allPlatforms?.filter(
										(socialPlatform) =>
											socialPlatform.name === social.socialName
								  )[0].fill
								: allPlatforms?.filter(
										(socialPlatform) =>
											socialPlatform.name === social.socialName
								  )[0]?.fill}
							<div className="flex text-sm flex-row items-center mt-2 gap-1">
								<BsPeopleFill />
								<p className="text-xs">
									{`${social?.subCount?.toLocaleString()}`}
								</p>
							</div>
						</div>
				  ))
				: creatorSocials?.map((social) => (
						<div
							key={social.socialName}
							className="flex flex-col items-center"
							onClick={() => onclick(social.socialName)}
						>
							{fill
								? allPlatforms?.filter(
										(socialPlatform) =>
											socialPlatform.name === social.socialName
								  )[0]?.fill
								: allPlatforms?.filter(
										(socialPlatform) =>
											socialPlatform.name === social.socialName
								  )[0]?.icon}
						</div>
				  ))}
		</div>
	);
};

export default SocialPlatformList;
