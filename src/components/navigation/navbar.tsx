"use client"
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import AppLogo from '../../../public/images/logo.png';
import Image from "next/image";
import { TonConnectButton, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';
import {
	Placeholder,
	Text,
} from '@telegram-apps/telegram-ui';
import { DisplayData } from '@/components/DisplayData/DisplayData';
// import { useTranslation } from "react-i18next";
import { langs } from "../../constants";
import { useMediaQuery, useOnClickOutside } from "usehooks-ts";
import { FaSun, FaMoon } from "react-icons/fa";
import { IoClose, IoLanguage } from "react-icons/io5";
import { FiMenu } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/stores/theme";
import { Section, Cell, List } from '@telegram-apps/telegram-ui';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/LocaleSwitcher/LocaleSwitcher';

const setLanguage = (lang: string) => {
	const parsedLang = new URL(location.href);
	parsedLang.searchParams.set("lang", lang);
	window.location.replace(parsedLang.toString());
};

const Navbar = () => {
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState("");
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [mobileMenu, setMobileMenu] = useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const wallet = useTonWallet();
	// const { t, i18n } = useTranslation();
	// const direction = i18n.getResourceBundle(
	// 	i18n.resolvedLanguage!,
	// 	"direction"
	// );
	const t = useTranslations('i18n');


	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	return (
		<nav className="bg-black text-white py-4">
			<div className="mx-auto justify-between items-center
			bg-black w-screen px-4 flex ">
				<Link href="/">
					<div className="flex items-center cursor-pointer">
						<Image src={AppLogo} height={80} width={50} alt="mantle logo" className="px-2 rounded" />
						<div className="text-[32px] text-white font-serif"
						>
							DustFi
						</div>
						<div className="ml-[0.8rem] text-white font-semibold text-2xl"></div>
					</div>
				</Link>

				<div className="hidden md:flex items-center space-x-4">
					{/* <div className="relative flex flex-1 mx-[0.8rem] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c] ">
						<input
							type="text"
							placeholder="Track Your Investment"
							className="bg-[#363840] text-white p-2 rounded-lg w-64"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button
							onClick={() => router.push(`/searching/${searchQuery}`)}
							className="absolute right-2 top-1/2 transform -translate-y-1/2"
						>
							<AiOutlineSearch className="text-[#8a939b]" />
						</button>
					</div> */}

					<button
						onClick={() => router.push("/dashboard")}
						className="flex items-center space-x-2 hover:text-gray-300 px-3"
					>
						<CgProfile className="text-2xl" />
						<span>Dashboard</span>
					</button>

					<div className="max-w-screen-md dark:text-white flex items-center h-full gap-2">
						{isDesktop && (
							<div className="hidden md:block">
								<LangPopover />
							</div>
						)}
						{isDesktop && (
							<div className="hidden md:block">
								<ThemeToggle />
							</div>
						)}
						{/* <ConnectButton /> */}
						{!isDesktop && (
							<div className="z-30 md:hidden">
								<LangPopover />
							</div>
						)}
						{mobileMenu ? (
							<IoClose
								data-testid="mobile-menu-button-close"
								className="dark:text-white text-2xl cursor-pointer z-30 md:hidden"
								onClick={() => setMobileMenu(false)}
							/>
						) : (
							<FiMenu
								data-testid="mobile-menu-button-open"
								className="dark:text-white text-2xl cursor-pointer z-30 md:hidden"
								onClick={() => setMobileMenu(true)}
							/>
						)}
						{!isDesktop && <MobileMenu isOpen={mobileMenu} />}
					</div>
					<div className="bg-white text-white">
						<TonConnectButton className="ton-connect-page__button" style={{ background: "black" }} />
					</div>
				</div>

				<button onClick={toggleMenu} className="md:hidden">
					<AiOutlineMenu size={24} />
					{/* <TonConnectButton className="ton-connect-page__button"   style={{ background: "#000000" }} /> */}

				</button>


			</div>

			{/* mobile menu option */}
			{isMenuOpen && (
				<div className="md:hidden mt-4 space-y-4">
					<div className="relative">
						<input
							type="text"
							placeholder="Track Your Investment"
							className="bg-[#363840] text-white p-2 rounded-lg w-full"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
						<button
							onClick={() => router.push(`/searching/${searchQuery}`)}
							className="absolute right-2 top-1/2 transform -translate-y-1/2"
						>
							<AiOutlineSearch className="text-[#8a939b]" />
						</button>
					</div>

					<button
						onClick={() => {
							router.push("/dashboard");
							setIsMenuOpen(false);
						}}
						className="flex items-center space-x-1 hover:text-gray-300 w-full"
					>
						<CgProfile />
						<span>Dashboard New</span>
					</button>

					<div className="w-full">
						<Placeholder
							className="ton-connect-page__placeholder"
							header="TON Connect"
							description={
								<>
									<TonConnectButton className="ton-connect-page__button" />
								</>
							}
						/>
					</div>
				</div>
			)}
		</nav>
	);
};

const MobileMenu = ({ isOpen }: { isOpen: boolean }) => {

	const t = useTranslations('i18n');
	const direction = "ltr";

	return (
		<motion.div
			data-testid="mobile-menu"
			initial={{
				right: "-100%", // Start off-screen
				top: 0,
				opacity: 0,
			}}
			animate={{
				right: isOpen ? 0 : "-100%", // Slide in or out based on isOpen
				top: 0,
				opacity: isOpen ? 1 : 0, // Fade in/out
			}}
			className="fixed w-dvw h-dvh right-[-100%] top-0 px-6 pt-20 bg-white dark:bg-black z-20 dark:text-white transition-all duration-300"
		>
			<ul className="text-2xl font-bold  flex flex-col gap-8">
				<li>
					<Link
						href="https://docs.dustfi.xyz"
						target="_blank"
						data-testid="docs-link-mobile"
					>
						{t("docs")}
					</Link>
				</li>
			</ul>
			<div className="mt-10">
				<p className="dark:text-white/50">{t("setting")}</p>
				<div className="flex items-center justify-between mt-2">
					<h1>{t("theme")}</h1>
					<div className="flex">
						<ThemeToggle />
					</div>
				</div>
			</div>
		</motion.div>
	);
};

const ThemeToggle = () => {
	const { theme, changeTheme } = useTheme();

	return (
		<div
			data-testid="theme-toggle"
			onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}
			className={cn(
				"relative flex cursor-pointer gap-3 rounded-full p-3 transition-all duration-300",
				theme === "dark" ? "bg-[#162136]" : "bg-[#d0d5dd]"
			)}
			style={{ direction: "ltr" }}
		>
			{/* Indicator for theme */}
			<div
				className={cn(
					"absolute top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-all bg-[#475467]",
					theme === "dark" ? "left-1" : "left-8"
				)}
			></div>

			{/* Moon Icon (dark mode) */}
			<FaMoon
				className={cn(
					"relative z-10 transition-all",
					theme === "dark" ? "text-yellow-400" : "text-gray-400"
				)}
			/>

			{/* Sun Icon (light mode) */}
			<FaSun
				className={cn(
					"relative z-10 transition-all",
					theme === "dark" ? "text-gray-400" : "text-orange-400"
				)}
			/>
		</div>
	);
};

const LangPopover = () => {
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const popoverRef = useRef(null);
	const onIconClick = () => {
		if (!isPopoverOpen) {
			setIsPopoverOpen(true);
		}
	};
	const onClickOutside = (e: MouseEvent | TouchEvent | FocusEvent) => {
		e.stopPropagation();
		setTimeout(() => {
			setIsPopoverOpen(false);
		}, 150);
	};
	useOnClickOutside(popoverRef, onClickOutside);
	return (
		<div className="relative">
			<button className="flex items-center" data-testid="lang-popover">
				<IoLanguage
					className="text-2xl cursor-pointer select-none"
					onClick={onIconClick}
				/>
			</button>
			<AnimatePresence>
				{isPopoverOpen && (
					<motion.div
						ref={popoverRef}
						initial={{ opacity: 0, y: -10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -10 }}
						className="absolute top-8 rtl:left-0 ltr:right-0 bg-white shadow-sm dark:bg-background-600 border-[1px] border-black/10 dark:border-white/10  rounded-xl min-w-[200px] p-2 z-10"
					>
						{langs.map((lang) => (
							<div
								key={lang.value}
								data-testid={`lang-${lang.value}`}
								className="flex items-center gap-2 cursor-pointer text-black hover:bg-zinc-100 dark:hover:bg-background-500 p-1 px-2 transition-all duration-200 rounded-md "
								onClick={() => setLanguage(lang.value)}
							>
								<span>{lang.label}</span>
							</div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Navbar;