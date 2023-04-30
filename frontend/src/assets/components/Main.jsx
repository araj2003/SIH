import Modal from "./Modal";
import { useGlobalContext } from "./context";
import Notice from "./Notice";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";
const Main = () => {
  const { currentUser } = useGlobalContext();
  return (
    <main className="flex items-center flex-col min-h-screen">
      <Hero />
      <Services />
      <About />
      <Notice />
      {!currentUser && <Modal />}
    </main>
  );
};

export default Main;
