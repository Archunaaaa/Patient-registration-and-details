import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../Assets/Blue MMinimalist Medical Clinic Logo.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid mt-2 mb-2 ms-3">
        <Link className="navbar-brand fw-bold d-flex align-items-center" >
          <img src={logo} alt="Patient Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
          PATIENT REGISTRATION
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav" 
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/patient/create">Patient Registration Create</Link>
            </li>
            <li className="nav-item fw-bold">
              <Link className="nav-link" to="/patient/view">Patient Details</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
