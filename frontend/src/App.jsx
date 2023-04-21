import './App.css';
import React from 'react';
import Header from './components/Header';
import Login from './components/Login';
import { useGlobalContext } from './context';

function App() {
  
  const {currentUser} = useGlobalContext();
  

  
  return (
    <div>
      <Header/>
      {
        !currentUser&&<Login/>
      }
    </div>
  );
}

export default App; 