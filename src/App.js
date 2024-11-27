// src/App.js
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Customer from "./components/Customer"; 
import Feedback from "./components/Feedback"; // Import Customer page

import Navbar from './components/Navbar'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/feedback" element={<Feedback />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
