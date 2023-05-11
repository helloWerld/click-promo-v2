import React from 'react';
import { RxCaretDown } from 'react-icons/rx';

const EditorSection = ({
	sectionTitle,
	children,
	expanded,
	handleSectionClick,
}) => {
	return (
		<div
			className={`${
				expanded == sectionTitle
					? 'border-white bg-stone-950'
					: 'border-white/40'
			} flex flex-col border-y w-1/2 transition duration-700 ease-in-out`}
		>
			<div
				onClick={() => handleSectionClick(sectionTitle)}
				className="flex flex-row justify-between items-center cursor-pointer px-5 hover:bg-stone-950 hover:text-white"
			>
				<p
					className={`${
						expanded == sectionTitle ? 'text-amber-400 font-bold' : ''
					} py-8 text-xl`}
				>
					{sectionTitle}
				</p>
				<RxCaretDown
					className={`text-4xl transition duration-300 ease-in-out ${
						expanded == sectionTitle ? 'rotate-90 text-amber-400' : ''
					}`}
				/>
			</div>
			<div
				className={`${
					expanded == sectionTitle ? 'flex opacity-100' : 'hidden opacity-0'
				} transition duration-700 ease-in-out`}
			>
				{children}
			</div>
		</div>
	);
};

export default EditorSection;
