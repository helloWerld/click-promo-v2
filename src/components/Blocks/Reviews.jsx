import React, { useEffect, useRef, useState } from 'react';
import ReviewCard from '../Cards/ReviewCard';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import avatar from '../../assets/avatar.png';
import { useFirestoreContext } from '../../context/FirestoreContext';

const Reviews = () => {
	const reviewCardRef = useRef(null);
	const [reviews, setReviews] = useState(null);
	const { creatorProtected } = useFirestoreContext();

	useEffect(() => {
		setReviews(creatorProtected?.reviews);
	}, [creatorProtected]);

	return (
		<>
			<div className="flex flex-row justify-between items-center mr-2">
				<h2 className="text-2xl font-semibold mb-3">Reviews</h2>
				{reviews && (
					<div className="flex flex-row gap-1 items-center">
						<p className="font-semibold">
							{reviews
								?.map((review) => review?.rating)
								.reduce((curr, acc) => curr + acc, 0) / reviews?.length}
						</p>
						<AiFillStar />
						<p className="underline ml-3">
							{reviews?.length} Review{`${reviews?.length > 1 ? 's' : ''}`}
						</p>
					</div>
				)}
			</div>
			{reviews ? (
				<div className="flex flex-row p-8 items-center bg-white rounded-xl border h-fit gap-6 relative">
					<div
						onClick={() => {
							reviewCardRef.current.scrollLeft -= 250;
						}}
						className="absolute left-0 h-full w-12 bg-gradient-to-r from-gray-800/10 hover:from-gray-800/30 mx-auto flex justify-start rounded-xl"
					>
						<FaCaretLeft className="my-auto text-xl" />
					</div>
					<div
						onClick={() => {
							reviewCardRef.current.scrollLeft += 250;
						}}
						className="absolute right-0 h-full w-12 bg-gradient-to-l from-gray-800/10  hover:from-gray-800/30 mx-auto flex justify-end rounded-xl"
					>
						<FaCaretRight className="my-auto text-xl" />
					</div>
					<div
						className="flex flex-row overflow-x-scroll gap-6 scrollbar-hide w-full scroll-smooth"
						ref={reviewCardRef}
					>
						{reviews?.map((review) => (
							<ReviewCard review={review} key={review._id} />
						))}
					</div>
				</div>
			) : (
				<p>No reviews yet. 😢</p>
			)}
		</>
	);
};

export default Reviews;
