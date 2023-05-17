import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { AiFillStar, AiFillHeart } from 'react-icons/ai';
import SocialPlatformList from '../Lists/SocialPlatformList';
import image from '../../assets/avatar.png';
import { useAuthContext } from '../../context/AuthContext';
import { useMenuContext } from '../../context/MenuContext';

const CreatorCard = ({ creator }) => {
	const { currentUser } = useAuthContext();
	const { menuState, dispatch } = useMenuContext();
	const {
		creator_protected_data_ID,
		name,
		avatar,
		overallRating,
		socials,
		message,
	} = creator;
	const [hover, setHover] = useState(false);
	const totalReach = useMemo(
		() =>
			socials
				.map((social) => social.subCount)
				.reduce((curr, acc) => Number(curr) + Number(acc), 0)
				.toLocaleString(),
		[socials]
	);

	return (
		<>
			<Link to={currentUser ? `/creators/${creator_protected_data_ID}` : '/'}>
				<div
					className="flex flex-col items-center h-auto w-auto p-2 hover:cursor-pointer mb-5 mx-2 relative"
					onMouseOver={() => setHover(true)}
					onMouseOut={() => setHover(false)}
				>
					{!currentUser && (
						<div
							className={`${
								hover ? 'visible' : 'invisible'
							} absolute w-full h-full top-0 bottom-0 right-0 left-0 bg-black/50 rounded-2xl z-20 items-center justify-center text-center flex flex-col gap-5`}
						>
							<h3 className="text-2xl w-2/3 text-white font-semibold mb-5">
								Login To View Details
							</h3>
							<div
								onClick={() => dispatch({ type: 'TOGGLE_LOGIN_MODAL' })}
								className="w-40 px-3 py-2 bg-gradient-to-tl from-amber-300 to-amber-600 text-black rounded-lg hover:scale-105"
							>
								Log In
							</div>
							<div
								onClick={() => dispatch({ type: 'TOGGLE_SIGNUP_MODAL' })}
								className="w-40 px-3 py-2 bg-black text-amber-400 rounded-lg hover:scale-105"
							>
								Create Account
							</div>
						</div>
					)}
					<div className="flex flex-col items-center relative h-full w-full overflow-clip rounded-2xl">
						{image ? (
							<img
								src={avatar}
								className="flex rounded-2xl top-0 w-full h-full object-cover aspect-square hover:scale-105 transition duration-700 ease-in-out"
							/>
						) : (
							<img
								src={image}
								className="flex rounded-2xl top-0 w-full h-full bg-gray-500"
							/>
						)}
					</div>
					<div className="flex flex-col w-full px-2 pt-2">
						<div className="flex flex-row items-center justify-between text-xl text-gray-800">
							<h2 className="font-bold text-black">{name}</h2>
							<div className="flex flex-row items-center gap-1">
								<AiFillStar />
								<p>{overallRating}</p>
							</div>
						</div>
						<div className="text-sm text-gray-600 mt-0">
							<h3>
								{`Total Reach:
								${totalReach}`}
							</h3>
							<div className="flex flex-row text-lg gap-1 my-1">
								<SocialPlatformList
									creatorSocials={socials}
									subs={false}
									size={18}
								/>
							</div>
							<h3 className="font-semibold text-sm text-gray-800 mt-1">
								{message}
							</h3>
						</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default CreatorCard;
