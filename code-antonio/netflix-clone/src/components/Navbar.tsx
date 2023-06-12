/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useState } from "react";
import { BiSearch, BiBell, BiChevronDown } from "react-icons/bi";
import { MdMenu, MdMenuOpen } from "react-icons/md";

import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.screenY >= TOP_OFFSET) setShowBackground(true);
      else setShowBackground(false);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`
      fixed flex flex-row items-center
      w-full px-4 md:px-16 py-6
      z-40
      transition-all duration-300 ease-in-out
      bg-zinc-900 bg-opacity-90
      ${showBackground ?? "bg-zinc-900 bg-opacity-90"}
    `}
    >
      <img src="/images/logo.png" className="h-4 lg:h-7" alt="Logo" />

      <div className="hidden lg:flex flex-row ml-8 gap-7">
        <NavbarItem label="Home" active />
        <NavbarItem label="Series" />
        <NavbarItem label="Films" />
        <NavbarItem label="New & Popular" />
        <NavbarItem label="My List" />
        <NavbarItem label="Browse by Languages" />
      </div>

      <button
        type="button"
        onClick={toggleMobileMenu}
        className="
          lg:hidden flex flex-row items-center gap-2
          ml-8 cursor-pointer
          text-white
        "
      >
        {showMobileMenu ? <MdMenuOpen size={20} /> : <MdMenu size={20} />}
        <p className="text-sm">Browse</p>
      </button>

      <div
        className="
        flex flex-row gap-2 items-center ml-auto
        text-gray-200
        transition-all duration-300 ease-in-out
      "
      >
        <BiSearch size={20} className="hover:text-white cursor-pointer" />
        <BiBell size={20} className="hover:text-white cursor-pointer" />
        <button
          type="button"
          onClick={toggleAccountMenu}
          className="
            flex flex-row items-center gap-1
            hover:text-white cursor-pointer
          "
        >
          <BiChevronDown
            size={20}
            className={`${showAccountMenu ? "rotate-180" : "rotate-0"}`}
          />
          <img
            src="/images/default-blue.png"
            alt="Profile"
            className="w-6 h-6 rounded-md overflow-hidden"
          />
        </button>
      </div>

      <MobileMenu visible={showMobileMenu} />
      <AccountMenu visible={showAccountMenu} />
    </nav>
  );
};

export default Navbar;
