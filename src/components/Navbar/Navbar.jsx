import React, { useState, useEffect } from "react";
import SliderNavbar from "./SliderNavbar";
import { Link } from "react-router-dom";

import CartIcon from "../CartIcon";
import { useDispatch } from "react-redux";
import { setAppTheme } from "../../store";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    setAppTheme(newTheme);
  };

  const handleScroll = () => {
    const topSectionHeight =
      document.querySelector(".carousel-inner").offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setIsScrolled(scrollTop > topSectionHeight - 100);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center md:px-10 pl-4 pr-2 py-4 transition-colors duration-300 ${
          isScrolled
            ? theme === "light"
              ? "bg-white text-black" // Light mode when scrolled
              : "bg-black text-white" // Dark mode when scrolled
            : theme === "light"
            ? "bg-transparent text-black" // Light mode when at top
            : "bg-transparent text-white" // Dark mode when at top
        }`}>
        <div className="flex items-center">
          <button
            className={` font-bold ${
              isScrolled && theme === "light" ? "text-black" : "text-white"
            } text-4xl`}
            onClick={toggleMenu}>
            &#9776;
          </button>
          <Link to="/">
            <img
              src={isScrolled ? "about/logo.svg" : "/home/navbar/logo.svg"}
              className={`${isScrolled? "h-[40px] -mt-4" : " xl:h-[200px]  lg:h-[150px] md:h-[100px] h-[60px] sm:absolute  top-2"} md:ml-10 ml-4`}
              alt="logo"
            />
          </Link>
        </div>
        <div className="flex items-center md:space-x-5 space-x-2">
          <button onClick={toggleTheme} className="text-4xl rounded-full ">
            {theme === "light" ? (
              isScrolled ? (
                <img src="/home/navbar/light_icon1.svg" alt="light mode icon" />
              ) : (
                <img
                  src="/home/navbar/light_icon1.svg"
                  className="white-icon"
                  alt="light mode icon"
                />
              )
            ) : (
              <img src="/home/navbar/icon4.svg" alt="dark mode icon" />
              
            )}
          </button>
          {theme === "light" ? (
            isScrolled ? (
              <>
                {/* <img src="/home/navbar/icon1.svg" alt="light mode icon" /> */}
                <Link to="/profile"><img src="home/navbar/user.svg" alt="light mode icon" /></Link>
                <CartIcon theme = {theme}   />
                
                
              </>
            ) : (
              <>
                {/* <img
                  src="/home/navbar/icon1.svg"
                  className="white-icon"
                  alt="light mode icon"
                /> */}
                <Link to="/profile">
                  <img
                    src="/home/navbar/user.svg"
                    className="white-icon"
                    alt="light mode icon"
                  />
                </Link>
                <CartIcon theme = {theme} OnHomePageHeroSection = {true}  />
              </>
            )
          ) : (
            <>
              {/* <img
                src="/home/navbar/icon1.svg"
                className="white-icon"
                alt="dark mode icon"
              /> */}
              <Link to="/profile">
                <img
                  src="/home/navbar/user.svg"
                  className="white-icon"
                  alt="dark mode icon"
                />
              </Link>
              
              <CartIcon theme = {theme} />
            </>
          )}
        </div>
      </div>
      <SliderNavbar isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Navbar;
