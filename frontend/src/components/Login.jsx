import React from "react";
import { useGlobalContext } from "../context";

const Login = () => {
  const {
    submitRegistration,
    email,
    setEmail,
    username,
    setUsername,
    password,
    setPassword,
    submitLogin,
    registrationToggle,
    age,
    setAge,
    sex,
    setSex,
    medicalhistory,
    setMedicalHistory,
  } = useGlobalContext();
  return (
    <div>
      {registrationToggle ? (
        <div className="center">
          <form onSubmit={submitRegistration}>
            <div className="mb-3">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="formBasicEmail"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <small className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="formBasicUsername"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="formBasicPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="age">Age</label>
              <input
                type="text"
                className="form-control"
                id="age"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sex">Sex</label>
              <input
                type="text"
                className="form-control"
                id="sex"
                placeholder="Enter your sex"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="medicalhistory">Medical History</label>
              <textarea
                className="form-control"
                id="medicalhistory"
                rows="3"
                placeholder="Enter medical history, separated by commas"
                value={medicalhistory.join(",")}
                onChange={(e) => setMedicalHistory(e.target.value.split(","))}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="center">
          <form onSubmit={(event) => submitLogin(event)}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="FormBasicEmail"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <small>We'll never share your email with anyone else.</small>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="formBasicPassword"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
