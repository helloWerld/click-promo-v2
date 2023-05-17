import React from 'react';
import { BsCurrencyBitcoin, BsMeta, BsFillUsbDriveFill } from 'react-icons/bs';
import {
	FaEthereum,
	FaGamepad,
	FaRunning,
	FaTractor,
	FaCode,
	FaPoo,
} from 'react-icons/fa';
import {
	RiStockFill,
	RiHandCoinFill,
	RiLineChartFill,
	RiExchangeDollarFill,
	RiExchangeFill,
} from 'react-icons/ri';
import {
	GiMonaLisa,
	GiMineWagon,
	GiTwoCoins,
	GiParachute,
} from 'react-icons/gi';
import { SiTether, SiDogecoin } from 'react-icons/si';
import { HiUserGroup } from 'react-icons/hi';
import {
	AiOutlineYoutube,
	AiOutlineFacebook,
	AiOutlineInstagram,
	AiOutlineReddit,
	AiFillYoutube,
	AiFillFacebook,
	AiFillInstagram,
} from 'react-icons/ai';
import { BsDiscord, BsTwitter } from 'react-icons/bs';
import { FiTwitter } from 'react-icons/fi';
import { TbBrandTiktok, TbBrandDiscord, TbBrandTelegram } from 'react-icons/tb';
import { FaRedditAlien, FaTelegramPlane, FaTiktok } from 'react-icons/fa';

const reference = {
	// allTopics used in CreatorTopicList and CreatorTopicFilter
	allTopics: [
		{
			icon: <BsCurrencyBitcoin />,
			name: 'Bitcoin',
		},
		{
			icon: <FaEthereum />,
			name: 'Ethereum',
		},
		{
			icon: <SiDogecoin />,
			name: 'Crypto',
		},
		{
			icon: <SiTether />,
			name: 'Stablecoins',
		},
		{
			icon: <FaPoo />,
			name: 'Shitcoins',
		},
		{
			icon: <RiLineChartFill />,
			name: 'Stocks',
		},
		{
			icon: <GiMonaLisa />,
			name: 'NFT',
		},
		{
			icon: <BsMeta />,
			name: 'Metaverse',
		},
		{
			icon: <HiUserGroup />,
			name: 'DAO',
		},
		{
			icon: <BsFillUsbDriveFill />,
			name: 'Wallets',
		},
		{
			icon: <RiStockFill />,
			name: 'Trading',
		},
		{
			icon: <GiMineWagon />,
			name: 'Mining',
		},
		{
			icon: <RiHandCoinFill />,
			name: 'Staking',
		},
		{
			icon: <FaTractor />,
			name: 'YLD Farming',
		},
		{
			icon: <FaGamepad />,
			name: 'GameFi',
		},
		{
			icon: <FaRunning />,
			name: 'Move2Earn',
		},
		{
			icon: <FaCode />,
			name: 'Web3',
		},
		{
			icon: <RiExchangeDollarFill />,
			name: 'CEX',
		},
		{
			icon: <RiExchangeFill />,
			name: 'DEX',
		},
		{
			icon: <GiTwoCoins />,
			name: 'ICO',
		},
		{
			icon: <GiParachute />,
			name: 'Airdrops',
		},
	],
	allSocials: [
		'Youtube',
		'Twitter',
		'TikTok',
		'Instagram',
		'Facebook',
		'Reddit',
		'Discord',
		'Telegram',
	],
	allPlatforms: [
		{
			name: 'Youtube',
			icon: <AiOutlineYoutube />,
			fill: <AiFillYoutube color="red" />,
		},
		{
			name: 'Twitter',
			icon: <FiTwitter />,
			fill: <BsTwitter color="#00a9e8" />,
		},
		{
			name: 'Facebook',
			icon: <AiOutlineFacebook />,
			fill: <AiFillFacebook color="#4664a5" />,
		},
		{
			name: 'Instagram',
			icon: <AiOutlineInstagram />,
			fill: <AiFillInstagram color="#8941a7" />,
		},
		{
			name: 'Tiktok',
			icon: <TbBrandTiktok />,
			fill: <FaTiktok color="#25ece7" />,
		},
		{
			name: 'Discord',
			icon: <TbBrandDiscord />,
			fill: <BsDiscord color="#5562ea" />,
		},
		{
			name: 'Telegram',
			icon: <TbBrandTelegram />,
			fill: <FaTelegramPlane color="#28a5e5" />,
		},
		{
			name: 'Reddit',
			icon: <AiOutlineReddit />,
			fill: <FaRedditAlien color="#fe4a00" />,
		},
	],
};

export default reference;
