import { useGlobalContext } from "./context";

const LoginBtn = () => {
  const { submitLogout, update_form_btn, currentUser } = useGlobalContext();

  if (currentUser) {
    return <button onClick={submitLogout}>Log out</button>;
  }

  return (
    <button id="form_btn" onClick={update_form_btn}>
      Register
    </button>
  );
};
export default LoginBtn;
