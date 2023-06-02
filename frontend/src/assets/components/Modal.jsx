import { useGlobalContext } from "./context";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ModalImg from "../img/modal.svg";

const Modal = () => {
  const { registrationToggle, loginButtonClicked } = useGlobalContext();
  if (loginButtonClicked) {
    return (
      <div className=" fixed top-0 left-0 w-screen h-screen flex justify-center items-center backdrop-blur-sm">
        <div className="flex justify-center items-center w-1/2 gap-10 h-3/5 flex-wrap  bg-white rounded-lg shadow-lg">
          <img src={ModalImg} alt="Modal" className="lg:h-96 rounded-lg" />
          {registrationToggle ? <RegisterForm /> : <Login Form />}
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
