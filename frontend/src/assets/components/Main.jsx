import Modal from "./Modal";
import { useGlobalContext } from "./context";
import Notice from "./Notice";
import Hero from "./Hero";
import Services from "./Services";
import About from "./About";
import PatientForm from "./PatientForm";
import DpWindow from "./dpWindow";

const Main = () => {
  const { currentUser } = useGlobalContext();
  if (!currentUser) {
    return (
      <main className="flex items-center flex-col min-h-screen">
        <Hero />
        <Services />
        <About />
        <Modal />
      </main>
    );
  }
  return (
    <main className="flex items-center flex-col min-h-screen">
      <DpWindow />
      <Notice />
      {/* <PatientForm /> */}
    </main>
  );
};

export default Main;
