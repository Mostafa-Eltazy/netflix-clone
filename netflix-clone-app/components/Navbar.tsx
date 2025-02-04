import React, { useState, useCallback, useEffect } from "react";
import NavbarItem from "./NavbarItem";
import MobileMenu from "./MobileMenu";
import AccountMenu from "./AccountMenu";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showNavMenu, setShowNavMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const toggleNavMenu = useCallback(
    () => setShowNavMenu(!showNavMenu),
    [showNavMenu]
  );

  const toggleAccountMenu = useCallback(
    () => setShowAccountMenu(!showAccountMenu),
    [showAccountMenu]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav className="w-full fixed z-40">
      <div
        className={`${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }px-4 md:px-16 py-6 flex flex-row items-center transition duration-500`}
      >
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Broswe by languages" />
        </div>
        <div
          onClick={toggleNavMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showNavMenu ? "rotate-180" : "rotate-0"
            }`}
          />
          <MobileMenu visible={showNavMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BsBell />
          </div>
          <div className="flex flex-row items-center gap-2 cursor-pointer relative">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img
                src="/images/blue-profile.png"
                alt="profile image placeholder"
              />
            </div>
            <BsChevronDown
              onClick={toggleAccountMenu}
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
