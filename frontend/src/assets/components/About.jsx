import patternImg from "../img/pattern.svg";
import { Button } from "@mui/material";
const About = () => {
  return (
    <div
      id="about"
      className="w-full flex justify-center mt-10
    "
    >
      <div className="about-container flex items-center w-3/4">
        <div className="hero flex flex-col justify-center  w-2/3 ">
          <div className="hero-text lg:text-5xl mb-5">About Medware</div>
          <div className="hero-stanza lg:text-lg flex items-center w-4/5 mb-7">
            Your one-stop healthcare provider. Our innovative medical dashboard
            and disease predictor offer personalized insights into your health.
            Convenient doctor consultations and a range of healthcare services
            are just a click away. Experience the difference in exceptional care
            and advanced technologies with Medware.
          </div>
          <div className="hero-btn-container flex gap-3 items-center">
            <Button
              variant="outlined"
              color="primary"
              className="hover:scale-105 w-60 h-16 hover:transition-all duration-200"
            >
              Contact Doctor
            </Button>
          </div>
        </div>
        <div className="img-wrapper w-1/3">
          <img src={patternImg} alt="hero-image" className="block w-full" />
        </div>
      </div>
    </div>
  );
};

export default About;
