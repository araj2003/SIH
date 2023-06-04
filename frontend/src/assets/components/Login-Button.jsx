import React from "react";
import { useGlobalContext } from "./context";
import { useNavigate } from "react-router-dom";

const LoginBtn = () => {
  const { submitLogout, update_form_btn, currentUser } = useGlobalContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  if (currentUser) {
    return (
      <button
        onClick={() => {
          submitLogout();
          handleLogout();
        }}
        className="px-1"
      >
        Log out
      </button>
    );
  }

  return (
    <>
      <button id="form_btn" onClick={update_form_btn} className="px-1">
        Register/Login
      </button>
    </>
  );
};

export default LoginBtn;
