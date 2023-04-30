import hero_img from "../img/hero-img.svg";
import Button from "@mui/material/Button";

const Hero = () => {
  return (
    <div className="w-4/5 hero-container flex justify-center gap-5 items-center h-3/4 ">
      <div className="hero flex flex-col jus`tify-center w-2/5 pl-8  scale-105">
        <div className="hero-text lg:text-5xl mb-5">
          Your Healthcare, Simplified
        </div>
        <div className="hero-stanza lg:text-lg flex items-center w-4/5 mb-7">
          Experience optimal health with simplified solutions, just a click
          away!
        </div>
        <div className="hero-btn-container flex gap-3 items-center">
          <Button
            variant="outlined"
            color="primary"
            className="hover:scale-105 w-28 h-12 hover:transition-all duration-200 "
          >
            Join Us!
          </Button>
          <Button
            variant="outlined"
            color="success"
            className="hover:scale-105 h-12 hover:transition-all duration-200 "
          >
            Already a member?
          </Button>
        </div>
      </div>
      <div className="img-wrapper w-1/2 flex">
        <img src={hero_img} alt="hero-image" className="block w-full -z-10" />
      </div>
    </div>
  );
};

export default Hero;
