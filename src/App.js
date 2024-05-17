import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PatientList from "./Components/PatientList";
// import EditPatient from "./Components/EditPatient"
import CreatePatient from "./Components/CreatePatient";
import Navbar from './Components/Navbar';

import './App.css';

const App = () => {
  return (
    <Router>
       <Navbar />
      <Routes>
       <Route exact path="/" element={<PatientList />} />
        <Route exact path="/create" element={<CreatePatient />} />
        <Route exact path="/edit/:id" element={<CreatePatient />} />
        {/* <Route path="/edit/:id" element={<EditPatient />} /> */}
      </Routes>
    </Router>
  );
};

export default App;