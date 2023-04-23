import Modal from "./Modal";
import { useGlobalContext } from "./context";
import Notice from "./Notice";
const Main = () => {
  const { currentUser } = useGlobalContext();
  return (
    <main>
      <Notice />
      {!currentUser && <Modal />}
    </main>
  );
};

export default Main;
