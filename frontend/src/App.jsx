import "./App.css";
import React from "react";
import Header from "./assets/components/Header";
import Modal from "./assets/components/Modal";
import { useGlobalContext } from "./assets/components/context";

function App() {
  const { currentUser } = useGlobalContext();

  return (
    <div>
      <Header />
      {!currentUser && <Modal />}
    </div>
  );
}

export default App;
