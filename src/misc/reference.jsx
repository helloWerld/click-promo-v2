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
};

export default reference;
