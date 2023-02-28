import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import TestComponent from "./components/TestComponent"
import Navbars from './components/Navbars'
import SigmaInput from "./components/SigmaInput"

function App() {

  // const [count, setCount] = useState(0)
  // document.body.style.backgroundColor = 'white'
  return (
    <section className="InputArea">
      <SigmaInput></SigmaInput>
    </section>
  );
}

export default App;
