import "./App.css";
import React from "react";
import Header from "./assets/components/Header";
import Main from "./assets/components/Main";
import Footer from "./assets/components/Footer";
import { BrowserRouter,  Route ,Routes} from 'react-router-dom';
import Dashboard from "./assets/components/Dashboard";
import ContactDoctor from "./assets/components/ContactDoctor";
function App() {
  return (
    <BrowserRouter>
    <div>
      <Header />
    <Routes>
    <Route path='/dashboard' element={<Dashboard/>}></Route>
    <Route path='/contactdoctor' element={<ContactDoctor/>}></Route>
    </Routes>
      <Main />
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
