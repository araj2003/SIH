import React from "react";
import { useGlobalContext } from "../context";

const Header = () => {
  console.log(useGlobalContext());
  const { submitLogout, update_form_btn, currentUser } = useGlobalContext();

  if (currentUser) {
    return (
      <>
        <nav>
          <div>
            <h2>Authentication App</h2>
            <button onClick={submitLogout}>Log out</button>
          </div>
        </nav>
        <div style={{ textAlign: "center" }}>
          <h2>You're logged in!</h2>
        </div>
      </>
    );
  }

  return (
    <div>
      <nav>
        <div>
          <h2>Authentication App</h2>
          <button
            id="form_btn"
            onClick={update_form_btn}
            className="bg-green-200"
          >
            Register
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
