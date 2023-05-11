import React from 'react';

import {
	AiOutlineYoutube,
	AiOutlineFacebook,
	AiOutlineInstagram,
	AiOutlineReddit,
	AiFillYoutube,
	AiFillFacebook,
	AiFillInstagram,
} from 'react-icons/ai';
import { BsDiscord, BsPeopleFill, BsTwitter } from 'react-icons/bs';
import { FiTwitter } from 'react-icons/fi';
import { TbBrandTiktok, TbBrandDiscord, TbBrandTelegram } from 'react-icons/tb';
import { FaRedditAlien, FaTelegramPlane, FaTiktok } from 'react-icons/fa';

const SocialPlatformList = ({ creatorSocials, subs, size, fill, onclick }) => {
	const allPlatforms = [
		{
			name: 'Youtube',
			icon: <AiOutlineYoutube size={size} />,
			fill: <AiFillYoutube size={size} color="red" />,
		},
		{
			name: 'Twitter',
			icon: <FiTwitter size={size} />,
			fill: <BsTwitter size={size} color="#00a9e8" />,
		},
		{
			name: 'Facebook',
			icon: <AiOutlineFacebook size={size} />,
			fill: <AiFillFacebook size={size} color="#4664a5" />,
		},
		{
			name: 'Instagram',
			icon: <AiOutlineInstagram size={size} />,
			fill: <AiFillInstagram size={size} color="#8941a7" />,
		},
		{
			name: 'Tiktok',
			icon: <TbBrandTiktok size={size} />,
			fill: <FaTiktok size={size} color="#25ece7" />,
		},
		{
			name: 'Discord',
			icon: <TbBrandDiscord size={size} />,
			fill: <BsDiscord size={size} colro="#5562ea" />,
		},
		{
			name: 'Telegram',
			icon: <TbBrandTelegram size={size} />,
			fill: <FaTelegramPlane size={size} color="#28a5e5" />,
		},
		{
			name: 'Reddit',
			icon: <AiOutlineReddit size={size} />,
			fill: <FaRedditAlien size={size} color="#fe4a00" />,
		},
	];

	return (
		<div className="flex flex-row gap-1">
			{subs
				? creatorSocials?.map((social) => (
						<div
							key={social.socialName}
							className="flex flex-col transition-all duration-300 ease-in-out items-center mr-8 cursor-pointer grayscale hover:grayscale-0 hover:scale-110"
							onClick={() => {
								window.open(`${social.url}`, '_blank');
							}}
						>
							{fill
								? allPlatforms.filter(
										(socialPlatform) =>
											socialPlatform.name === social.socialName
								  )[0].fill
								: allPlatforms.filter(
										(socialPlatform) =>
											socialPlatform.name === social.socialName
								  )[0].fill}
							<div className="flex flex-row items-center mt-2 gap-1">
								<BsPeopleFill size={14} />
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
								? allPlatforms.filter(
										(socialPlatform) =>
											socialPlatform.name === social.socialName
								  )[0].fill
								: allPlatforms.filter(
										(socialPlatform) =>
											socialPlatform.name === social.socialName
								  )[0].icon}
						</div>
				  ))}
		</div>
	);
};

export default SocialPlatformList;
