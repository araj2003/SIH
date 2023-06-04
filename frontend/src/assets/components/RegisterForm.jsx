import { useGlobalContext } from "./context";
import { TextField, Button } from "@mui/material";

import cancelIcon from "../img/cross icon.svg";
import { useState } from "react";
import SignIn from "./GoogleSignIn";

const RegisterForm = () => {
  const { submitRegistration, email, username, password, closeModal } =
    useGlobalContext();

  const [user_email, setUserEmail] = useState();
  const [user_username, setUserUsername] = useState();
  const [user_password, setUserPassword] = useState();
  return (
    <div>
      <div className="flex justify-end mb-2 mr-2 ">
        <button onClick={closeModal}>
          <img src={cancelIcon} alt="cross" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col  items-center gap-2 ">
          <h2 className="text-4xl modal-heading text-center full">
            Sign Up Now!
          </h2>
          <p className="text-center full">
            Access personalized healthcare services
          </p>
        </div>
        <form onSubmit={submitRegistration} className="flex flex-col gap-2 j">
          <TextField
            id="FormBasicEmail"
            label="Email"
            variant="outlined"
            value={user_email}
            onChange={(event) => {
              setUserEmail(event.target.value);
              email.current = event.target.value;
            }}
            color="success"
            helperText="We'll never share your email"
            required
          />
          <TextField
            id="formBasicUsername"
            label="Username"
            variant="outlined"
            value={user_username}
            onChange={(event) => {
              setUserUsername(event.target.value);
              username.current = event.target.value;
            }}
            color="success"
            required
          />
          <TextField
            id="formBasicPassword"
            label="Password"
            variant="outlined"
            value={user_password}
            onChange={(event) => {
              setUserPassword(event.target.value);
              password.current = event.target.value;
            }}
            color="success"
            type="password"
            required
          />
          <Button variant="outlined" color="primary" type="submit">
            Submit
          </Button>
          <SignIn />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
