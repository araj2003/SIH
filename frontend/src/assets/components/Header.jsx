import React from "react";
import LoginBtn from "./Login-Button";
import LogoHorizontal from "../img/logo.svg";
import { useGlobalContext } from "./context";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { currentUser } = useGlobalContext();

  return (
    <div className="fixed z-40 bg-white">
      <div className="shadow-md flex justify-around gap-24  items-center w-screen py-3 ">
        <figure className="h-16 w-auto z-20">
          <img
            src={LogoHorizontal}
            alt="logo-header"
            className="h-full w-full object-cover"
          />
        </figure>
        <nav className=" gap-1 hidden md:flex lg:gap-3 text-lg z-20 justify-center text-gray-700">
          {currentUser ? (
            <>
              <NavLink to="/">Predictor</NavLink>
              <NavLink to="dashboard">Dashboard</NavLink>
              <NavLink to="contactdoctor">Consult</NavLink>
            </>
          ) : (
            <>
              <a href="#services" className="px-1 ">
                Services
              </a>
              <a href="#about" className="px-1">
                About Us
              </a>
            </>
          )}
          <LoginBtn />
        </nav>
      </div>
    </div>
  );
};

export default Header;
