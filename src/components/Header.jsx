import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { images } from "../constants";
import { logout } from "../store/actions/user";

const navItemsInfo = [
  { name: "Home", type: "link", href: "/" },
  { name: "Post", type: "link", href: "/gaketa" },
  // {
  //   name: "Info",
  //   type: "dropdown",
  //   items: [
  //     { title: "About us", href: "/about" },
  //     { title: "Contact us", href: "/profile" },
  //   ],
  // },
];

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown((curState) => {
      return !curState;
    });
  };

  return (
    <li className="group relative">
      {item.type === "link" ? (
        <>
          <Link to={item.href} className="px-4 py-2">
            {item.name}
          </Link>
          <span className="absolute right-0 top-0 cursor-pointer font-bold text-blue-500 opacity-0 transition-all duration-500 group-hover:right-[90%] group-hover:opacity-100">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="flex items-center gap-x-1 px-4 py-2"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            <MdKeyboardArrowDown />
          </button>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } w-max pt-4 transition-all duration-500 lg:absolute lg:bottom-0 lg:right-0 lg:hidden lg:translate-y-full lg:transform lg:group-hover:block`}
          >
            <ul className="flex flex-col overflow-hidden rounded-lg bg-dark-soft text-center shadow-lg lg:bg-transparent">
              {item.items.map((page, index) => (
                <Link
                  key={index}
                  to={page.href}
                  className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                >
                  {page.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDrowpdown, setProfileDrowpdown] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <section className=" top-0 left-0 right-0 z-50 bg-[#E8E2E2] px-6">
      <header className="container mx-auto flex items-center justify-between px-5 py-4">
        <Link to="/">
          <img
            className="lg:w-18 h-6 w-24 lg:h-6"
            src={images.Logo}
            alt="logo"
          />
        </Link>
        <div className="z-50 lg:hidden">
          {navIsVisible ? (
            <AiOutlineClose
              className="h-6 w-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="h-6 w-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } fixed top-0 bottom-0 z-[49] mt-[56px] flex w-full flex-col items-center justify-center gap-x-9 bg-dark-hard transition-all duration-300 lg:static lg:mt-0 lg:w-auto lg:flex-row lg:justify-end lg:bg-transparent`}
        >
          <ul className="flex flex-col items-center gap-y-5 gap-x-2 font-semibold text-white lg:flex-row lg:text-[#431429]">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          {userState.userInfo ? (
            <div className="flex flex-col items-center gap-y-5 gap-x-2 font-semibold text-white lg:flex-row lg:text-dark-soft">
              <div className="group relative">
                <div className="flex flex-col items-center">
                  <button
                    className="mt-5 flex items-center gap-x-1 rounded-full border-2 border-blue-500 px-6 py-2 font-semibold text-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white lg:mt-0"
                    onClick={() => setProfileDrowpdown(!profileDrowpdown)}
                  >
                    <span>Logged</span>
                    <MdKeyboardArrowDown />
                  </button>
                  <div
                    className={`${
                      profileDrowpdown ? "block" : "hidden"
                    } w-max pt-4 transition-all duration-500 lg:absolute lg:bottom-0 lg:right-0 lg:hidden lg:translate-y-full lg:transform lg:group-hover:block`}
                  >
                    <ul className="flex flex-col overflow-hidden rounded-lg bg-dark-soft text-center shadow-lg lg:bg-transparent">
                      {(userState?.userInfo?.role === "admin" ||
                        userState?.userInfo?.role === "superadmin") && (
                        <button
                          onClick={() => navigate("/admin")}
                          type="button"
                          className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                        >
                          Admin Dashboard
                        </button>
                      )}

                      <button
                        onClick={() => navigate("/profile")}
                        type="button"
                        className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                      >
                        Profile Page
                      </button>
                      <button
                        onClick={logoutHandler}
                        type="button"
                        className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="mt-5 rounded-full border-2 border-[#2D2727] px-6 py-2 font-semibold text-slate-700 transition-all duration-300 hover:bg-[#2D2727] hover:text-white lg:mt-0"
            >
              Login
            </button>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
