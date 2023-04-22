import React from "react";
import LoginBtn from "./Login-Button";
import LogoHorizontal from "../img/logo.svg";

const Header = () => {
  return (
    <div>
      <div
        className="shadow-md hidden md:flex justify-around gap-16
       items-center w-screen py-2"
      >
        <figure className="h-16 w-auto z-20 ">
          <img
            src={LogoHorizontal}
            alt="logo-header"
            className="h-full w-full object-cover"
          />
        </figure>
        <nav className="flex gap-3 text-lg z-20 justify-center">
          <a href="">Home</a>
          <a href="">Services</a>
          <a href="">About Us</a>
          <LoginBtn />
        </nav>
      </div>
      
    </div>
  );
};

export default Header;
