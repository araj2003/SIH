import { Button } from "@mui/material";
import servicesImg from "../img/services-img.svg";
import diseasePredImg from "../img/diseasepredictor.svg";
const Services = () => {
  return (
    <div
      id="services"
      className="w-full  overflow-hidden flex flex-col items-center"
    >
      <div className="services-container flex items-center w-5/6">
        <div className="img-wrapper w-1/2 flex pt-2 ">
          <img src={servicesImg} alt="hero-image" className="block w-full" />
        </div>
        <div className="hero flex flex-col justify-center w-1/2 pl-8  scale-105 p-5">
          <div className="hero-text lg:text-4xl mb-5">
            Access Quality Healthcare Assistance Anytime, Anywhere
          </div>
          <div className="hero-stanza lg:text-lg flex items-center w-4/5 mb-7">
            Medware provides you with your go to Healthcare Services at the ease
            of your device from any location!
          </div>
        </div>
      </div>
      <div className="disease-predictor flex items-center">
        <div className="img-wrapper-predicto w-3/5 flex">
          <img src={diseasePredImg} alt="hero-image" className="block w-full" />
        </div>
        <div className="w-1/2">
          <div className=" flex flex-col justify-center pl-16 p-5">
            <div className="hero-text lg:text-6xl mb-5">Feeling low?</div>
            <div className="hero-stanza lg:text-xl flex items-center w-4/5 mb-7">
              Use our built in Disease Predictor and get recommendations and
              medical assistance based on that
            </div>
            <div className="hero-btn-container flex gap-3 items-center">
              <Button
                variant="outlined"
                color="secondary"
                className="hover:scale-105 w-60 h-16 hover:transition-all duration-200"
              >
                Disease Predictor
              </Button>
              <Button
                variant="outlined"
                color="primary"
                className="hover:scale-105 w-60 h-16 hover:transition-all duration-200"
              >
                Contact Doctor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
