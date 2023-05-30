import React from "react";
import LoginBtn from "./Login-Button";
import LogoHorizontal from "../img/logo.svg";
import { useGlobalContext } from "./context";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { currentUser } = useGlobalContext();

  if (currentUser) {
    return (
      <div>
        <div className="shadow-md hidden md:flex justify-around gap-16 items-center w-screen py-2">
          <figure className="h-16 w-auto z-20">
            <img
              src={LogoHorizontal}
              alt="logo-header"
              className="h-full w-full object-cover"
            />
          </figure>
          <nav className="flex gap-3 text-lg z-20 justify-center text-gray-700">
            <NavLink to="/">Predictor</NavLink>
            <NavLink to="dashboard">Dashboard</NavLink>
            <NavLink to="contactdoctor">Consult</NavLink>
            <LoginBtn />
          </nav>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="shadow-md hidden md:flex justify-around gap-16 items-center w-screen py-2">
        <figure className="h-16 w-auto z-20">
          <img
            src={LogoHorizontal}
            alt="logo-header"
            className="h-full w-full object-cover"
          />
        </figure>
        <nav className="flex gap-3 text-lg z-20 justify-center text-gray-700">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <LoginBtn />
        </nav>
      </div>
    </div>
  );
};

export default Header;
