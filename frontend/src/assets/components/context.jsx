import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
const AppContext = React.createContext();

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [medicalhistory, setMedicalHistory] = useState([]);
  const [sex, setSex] = useState("");

  useEffect(() => {
    client
      .get("/user")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function update_form_btn() {
    if (registrationToggle) {
      document.getElementById("form_btn").innerHTML = "Register";
      setRegistrationToggle(false);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
    }
  }

  function submitRegistration(e) {
    e.preventDefault();
    client
      .post("/register", {
        email: email,
        username: username,
        password: password,

        age: Number(5),
        sex: "male",
        medical_history: ["abc"],
      })
      .then(function (res) {
        client
          .post("/login", {
            email: email,
            password: password,
          })
          .then(function (res) {
            setCurrentUser(true);
          });
      });
  }

  function submitLogin(e) {
    e.preventDefault();
    client
      .post("/login", {
        email: email,
        password: password,
      })
      .then(function (res) {
        setCurrentUser(true);
      });
  }

  function submitLogout(e) {
    e.preventDefault();
    client.post("/logout", { withCredentials: true }).then(function (res) {
      setCurrentUser(false);
    });
  }

  return (
    <AppContext.Provider
      value={{
        update_form_btn,
        submitRegistration,
        submitLogin,
        submitLogout,
        currentUser,
        setCurrentUser,
        registrationToggle,
        setRegistrationToggle,
        email,
        setEmail,
        username,
        setUsername,
        password,
        setPassword,
        age,
        setAge,
        medicalhistory,
        setMedicalHistory,
        sex,
        setSex,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  console.log(useContext(AppContext));
  return useContext(AppContext);
};

export { AppContext, AppProvider };
