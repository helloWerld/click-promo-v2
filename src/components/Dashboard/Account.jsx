import React from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../../assets/avatar.png';
import { useAuthContext } from '../../context/AuthContext';

const Account = () => {
	const { currentUser, userData } = useAuthContext();
	const navigate = useNavigate();
	console.log(currentUser);
	return (
		<div className="flex flex-col w-full h-full items-center justify-center gap-3 bg-stone-900 text-white">
			<img
				src={currentUser.photoURL ? currentUser.photoURL : avatar}
				className="w-24 h-24 rounded-full"
			/>
			<h2 className="text-xl font-semibold mb-6">Account Settings</h2>
			<div className="flex flex-col border border-white/50 w-11/12 md:w-2/3  lg:w-1/2 xl:w-1/3 rounded-xl text-xl p-6">
				{currentUser.displayName && (
					<>
						<div className="flex flex-row justify-between">
							<p className="font-bold">Name</p>
							<p className="">{currentUser?.displayName}</p>
						</div>
						<hr className="border-white/50 my-6" />
					</>
				)}
				<div className="flex flex-row justify-between">
					<p className="font-bold">Email</p>
					<p className="">{currentUser?.email}</p>
				</div>
				<hr className="border-white/50 my-6" />
				<div className="flex flex-row justify-between">
					<p className="font-bold">Role</p>
					<p>{userData?.role}</p>
				</div>
			</div>
		</div>
	);
};

export default Account;
