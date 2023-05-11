import React from 'react';
import { BsFillHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<div className="flex flex-row justify-between fixed bottom-0 bg-gradient-to-tl from-amber-300 to-amber-600 w-full py-1 px-12 md:px-24 text-sm z-40">
			<div className="flex flex-row items-center gap-1">
				<p>© 2023 BitPromo.</p>
				<p className="hidden md:flex flex-row items-center gap-1">
					Created with <BsFillHeartFill /> using React.
				</p>
			</div>
			<div className="flex flex-row gap-3">
				<Link>Terms</Link>
				<Link>Sitemap</Link>
				<Link>Privacy</Link>
			</div>
		</div>
	);
};

export default Footer;
