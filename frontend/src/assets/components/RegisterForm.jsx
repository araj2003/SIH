import { useGlobalContext } from "./context";
import { TextField, Button, TextareaAutosize } from "@mui/material";

// import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const RegisterForm = () => {
  const {
    submitRegistration,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    closeModal,
  } = useGlobalContext();
  return (
    <div>
      <div className="flex justify-end mb-3 mr-2 ">
        {/* <CancelOutlinedIcon
          color="primary"
          onClick={closeModal}
          className="hover:scale-105 hover:cursor-pointer"
        /> */}
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col  items-center gap-2 ">
          <h2 className="text-4xl modal-heading text-center full">
            Sign Up Now!
          </h2>
          <p className="text-center full">
            Access personalized healthcare services
          </p>
        </div>
        <form onSubmit={submitRegistration} className="flex flex-col gap-3 j">
          <TextField
            id="FormBasicEmail"
            label="Email"
            variant="outlined"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            color="success"
            helperText="We'll never share your email"
            required
          />
          <TextField
            id="formBasicUsername"
            label="Username"
            variant="outlined"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            color="success"
            required
          />
          <TextField
            id="formBasicPassword"
            label="Password"
            variant="outlined"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            color="success"
            type="password"
            required
          />
          {/* <TextField
            id="age"
            label="Age"
            variant="outlined"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            color="success"
            type="number"
            required
          />
          <TextField
            // id="sex"
            label="Enter your sex"
            variant="outlined"
            value={sex}
            onChange={(event) => setSex(event.target.value)}
            color="success"
            type="search"
            required
          />
          <TextareaAutosize
            value={medicalhistory.join(",")}
            minRows={3}
            placeholder="Enter medical history separated by commas,"
            id="medicalHistory"
            className="border border-gray-400 rounded py-1 px-2 text-md resize-none focus:outline-2 focus:outline-green-700"
            onChange={(e) => setMedicalHistory(e.target.value.split(","))}
          /> */}
          <Button variant="outlined" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
