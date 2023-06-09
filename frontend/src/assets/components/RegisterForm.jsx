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

  // Regular expression for password check
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  const isPasswordValid = (password) => {
    return passwordRegex.test(password);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission
    if (isPasswordValid(user_password)) {
      submitRegistration(event); // Call the submitRegistration function if the password is valid
    } else {
      console.log("Invalid password"); // Optional: Display an error message or perform other actions for an invalid password
    }
  };

  return (
    <div>
      <div className="flex justify-end mb-2 mr-2 ">
        <button onClick={closeModal}>
          <img src={cancelIcon} alt="cross" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-4xl modal-heading text-center full">
            Sign Up Now!
          </h2>
          <p className="text-center full">
            Access personalized healthcare services
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 j">
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
            color={isPasswordValid(user_password) ? "success" : "error"}
            type="password"
            required
          />
          {!isPasswordValid(user_password) && (
            <p
              className="text-gray-500 font-medium"
              style={{ fontSize: "12px", width: "280px", textAlign: "center" }}
            >
              Password must be at least 8 characters long, contain at least 1
              letter, 1 digit, and 1 special character.
            </p>
          )}
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
