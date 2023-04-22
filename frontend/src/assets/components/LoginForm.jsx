import { useGlobalContext } from "./context";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const LoginForm = () => {
  const { email, setEmail, password, setPassword, submitLogin } =
    useGlobalContext();
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col  items-center gap-2 ">
          <h2 className="text-4xl modal-heading text-center w-full">
            Hello Again!
          </h2>
          <p className="text-center w-full">Welcome back you've been missed!</p>
        </div>
        <form
          onSubmit={(event) => submitLogin(event)}
          className="flex flex-col justify-center gap-5"
        >
          <TextField
            id="FormBasicEmail"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            helperText="We'll never share your email"
            color="success"
            required
          />
          <TextField
            id="formBasicPassword"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            color="success"
            required
          />
          <Button variant="outlined" color="primary" type="submit">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
