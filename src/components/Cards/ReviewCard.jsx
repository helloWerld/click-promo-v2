import React, { useEffect } from 'react';
import avatar from '../../assets/bitboy.png';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const Stars = ({ rating }) => {
	let display = null;
	switch (rating) {
		case 1:
			display = (
				<>
					<AiFillStar />
					<AiOutlineStar />
					<AiOutlineStar />
					<AiOutlineStar />
					<AiOutlineStar />
				</>
			);
			break;
		case 2:
			display = (
				<>
					<AiFillStar />
					<AiFillStar />
					<AiOutlineStar />
					<AiOutlineStar />
					<AiOutlineStar />
				</>
			);
			break;
		case 3:
			display = (
				<>
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiOutlineStar />
					<AiOutlineStar />
				</>
			);
			break;
		case 4:
			display = (
				<>
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiOutlineStar />
				</>
			);
			break;
		case 5:
			display = (
				<>
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
					<AiFillStar />
				</>
			);
			break;
		default:
			display = <></>;
	}
	return display;
};

const ReviewCard = ({ review }) => {
	return (
		<div className="flex flex-col justify-between shrink-0 w-96 h-fit border border-gray-300 hover:border-gray-400 hover:shadow-md rounded-xl p-6 overflow-clip">
			<div className="flex flex-row justify-between items-start">
				<div>
					<img src={avatar} className="h-12 w-12 rounded-full border-2 " />
					<div className="flex flex-row items-center text-2xl gap-1 mt-2">
						<Stars rating={review?.rating} />
					</div>
				</div>
				<div className="flex flex-col items-end text-xs font-semibold mt-1">
					<p className="font-bold text-sm">{review?.reviewedBy}</p>
					<p>5/2/23</p>
				</div>
			</div>
			<div>
				<h2 className="mt-3 text-lg font-semibold line-clamp-1">
					{review?.title}
				</h2>
				<p className="mt-2 line-clamp-3">{review?.description}</p>
			</div>
		</div>
	);
};

export default ReviewCard;
