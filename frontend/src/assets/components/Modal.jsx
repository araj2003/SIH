import React from "react";
import { useGlobalContext } from "./context";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ModalImg from "../img/modal.svg";

const Modal = () => {
  const { registrationToggle, loginButtonClicked } = useGlobalContext();
  if (loginButtonClicked) {
    return (
      <div className=" fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
        <div className="flex justify-center items-center w-3/5 gap-10 h-3/5 backdrop-blur-sm flex-wrap  ">
          <img src={ModalImg} alt="Modal" className="lg:h-96 rounded-lg" />
          {registrationToggle ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
