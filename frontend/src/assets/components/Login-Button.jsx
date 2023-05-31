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
      >
        Log out
      </button>
    );
  }

  return (
    <>
      <button id="form_btn" onClick={update_form_btn}>
        Register
      </button>
    </>
  );
};

export default LoginBtn;
