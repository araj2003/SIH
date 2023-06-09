import { useGlobalContext } from "./context";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import ModalImg from "../img/modal.svg";

const Modal = () => {
  const { registrationToggle, loginButtonClicked } = useGlobalContext();
  if (loginButtonClicked) {
    return (
      <div className=" fixed top-0 left-0 w-screen h-screen flex justify-center items-center backdrop-blur-sm">
        <div className="flex justify-center items-center w-80 xl:w-1/2 gap-3 h-68 flex-wrap  bg-white rounded-lg shadow-lg">
          <figure className="hidden xl:block w-80">
            <img src={ModalImg} alt="Modal" className="w-full rounded-lg" />
          </figure>
          {registrationToggle ? <RegisterForm /> : <LoginForm />}
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
