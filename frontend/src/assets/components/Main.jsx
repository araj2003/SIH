import Modal from "./Modal";
import { useGlobalContext } from "./context";
const Main = () => {
  const { currentUser } = useGlobalContext;
  return <main>{!currentUser && <Modal />}</main>;
};

export default Main;
