import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NavBar = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [selectedItem, setSelectedItem] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const routes = {
    Home: "/",
    About: "#about",
    Contact: "#contact",
  };

  const getSelectedItem = () => {
    const currentPath = location.pathname;

    if (currentPath.includes("#about")) {
      return "About";
    } else if (currentPath.includes("#contact")) {
      return "Contact";
    }
    return "Home";
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setSelectedItem(getSelectedItem());
  }, [location]);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      className={`fixed text-white left-0 top-0 w-full pr-5 z-50 flex ${
        isScrolled
          ? "bg-black bg-opacity-100 h-20"
          : "bg-gradient-to-b from-[rgba(0,0,0,0.8)]  to-transparent "
      } transition-all duration-500 ease-in-out justify-between items-center`}
    >
      <div className="flex items-center ml-10">Company Logo</div>
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex flex-grow justify-center items-center relative inset-0`}
      >
        <ul
          className={`flex text-white flex-col md:flex-row md:space-x-24 text-lg md:bg-transparent bg-black md:rounded-none rounded-lg md:p-0 p-4 absolute md:static top-16 right-4 md:right-0 ${
            isScrolled ? "bg-black bg-opacity-100" : "bg-black bg-opacity-0"
          } transition-colors duration-500 ease-in-out`}
        >
          {["Home", "About", "Contact"].map((item) => (
            <li
              key={item}
              className={`${
                selectedItem === item ? "text-green-500 font-semibold" : ""
              } hover:text-green-700 cursor-pointer p-2`}
              onClick={() => handleItemClick(item)}
            >
              <Link to={routes[item]}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center ">
        <Link
          to="/login"
          className="cursor-pointer bg-green-800 hover:bg-green-900 rounded-xl"
        >
          <div className="flex flex-row gap-3 text-white px-4 py-2 rounded-xl  ">
            Log Out
          </div>
        </Link>

        <div className="ml-4 md:hidden">
          {isMenuOpen ? (
            <CloseIcon onClick={toggleMenu} className="cursor-pointer" />
          ) : (
            <MenuIcon onClick={toggleMenu} className="cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
