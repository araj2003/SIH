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
  const options = [
    "Itching",
    "Skin rash",
    "Shivering",
    "Chills",
    "Joint pain",
    "Stomach pain",
    "Acidity",
    "Ulcers on tongue",
    "Muscle wasting",
    "Vomiting",
    "Burning micturition",
    "Spotting urination",
    "Fatigue",
    "Weight gain",
    "Anxiety",
    "Cold hands and feets",
    "Mood swings",
    "Weight loss",
    "Restlessness",
    "Lethargy",
    "Patches in throat",
    "Irregular sugar level",
    "Cough",
    "High fever",
    "Sunken eyes",
    "Breathlessness",
    "Sweating",
    "Dehydration",
    "Indigestion",
    "Headache",
    "Yellowish skin",
    "Dark urine",
    "Nausea",
    "Loss of appetite",
    "Pain behind the eyes",
    "Back pain",
    "Constipation",
    "Abdominal pain",
    "Diarrhea",
    "Mild fever",
    "Yellow urine",
    "Yellowing of eyes",
    "Acute liver failure",
    "Fluid overload",
    "Swelling of stomach",
    "Swelled lymph nodes",
    "Malaise",
    "Blurred and distorted vision",
    "Phlegm",
    "Throat irritation",
    "Redness of eyes",
    "Sinus pressure",
    "Runny nose",
    "Congestion",
    "Chest pain",
    "Weakness in limbs",
    "Fast heart rate",
    "Pain during bowel movements",
    "Pain in anal region",
    "Bloody stool",
    "Irritation in anus",
    "Neck pain",
    "Dizziness",
    "Cramps",
    "Bruising",
    "Obesity",
    "Swollen legs",
    "Swollen blood vessels",
    "Puffy face and eyes",
    "Enlarged thyroid",
    "Brittle nails",
    "Swollen extremeties",
    "Excessive hunger",
    "Extra-marital contacts",
    "Drying and tingling lips",
    "Slurred speech",
    "Knee pain",
    "Hip joint pain",
    "Muscle weakness",
    "Stiff neck",
    "Swelling joints",
    "Movement stiffness",
    "Spinning movements",
    "Loss of balance",
    "Unsteadiness",
    "Weakness of one body side",
    "Loss of smell",
    "Bladder discomfort",
    "Foul smell of urine",
    "Continuous feel of urine",
    "Passage of gases",
    "Internal itching",
    "Toxic look",
    "Depression",
    "Irritability",
    "Muscle pain",
    "Altered sensorium",
    "Red spots over body",
    "Belly pain",
    "Abnormal menstruation",
    "Dischromic patches",
    "Watering from eyes",
    "Increased appetite",
    "Polyuria",
    "Family history",
    "Mucoid sputum",
    "Rusty sputum",
    "Lack of concentration",
    "Visual disturbances",
    "Receiving blood transfusion",
    "Receiving unsterile injections",
    "Coma",
    "Stomach bleeding",
    "Distention of abdomen",
    "History of alcohol consumption",
    "Blood in sputum",
    "Prominent veins on calf",
    "Palpitations",
    "Painful walking",
    "Pus-filled pimples",
    "Blackheads",
    "Scarring",
    "Skin peeling",
    "Silver-like dusting",
    "Small dents in nails",
    "Inflammatory nails",
    "Blister",
    "Red sore around nose",
    "Yellow crust oozing",
  ];

  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [medicalhistory, setMedicalHistory] = useState([]);
  const [sex, setSex] = useState("");
  const [loginButtonClicked, setLoginButtonClicked] = useState(false);

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
      setLoginButtonClicked(true);
    } else {
      document.getElementById("form_btn").innerHTML = "Log in";
      setRegistrationToggle(true);
      setLoginButtonClicked(true);
    }
  }

  function closeModal() {
    setLoginButtonClicked(false);
  }

  function submitRegistration(e) {
    if (e) {
      e.preventDefault();
    }
    client
      .post("/register", {
        email: email,
        username: username,
        password: password,
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
    if (e) {
      e.preventDefault();
    }
    client
      .post("/login", {
        email: email,
        password: password,
      })
      .then(function (res) {
        setCurrentUser(true);
      });
  }

  function submitLogout() {
    client.post("/logout", { withCredentials: true }).then(function (res) {
      setCurrentUser(false);
    });
    // document.getElementById("signIndiv").hidden = false;
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
        loginButtonClicked,
        setLoginButtonClicked,
        closeModal,
        options,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  // console.log(useContext(AppContext));
  return useContext(AppContext);
};

export { AppContext, AppProvider };
