import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await fetch("https://64d60e47754d3e0f13618812.mockapi.io/form/patient_registration");
      if (!response.ok) {
        throw new Error("Failed to fetch patients");
      }
      const data = await response.json();
      setPatients(data);                                                                                                                                                                                                                
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patients:", error.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
  navigate(`/Create/${id}`);

    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
      if (!confirmDelete) return;

      const response = await fetch(`https://64d60e47754d3e0f13618812.mockapi.io/form/patient_registration/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }
      setPatients(patients.filter(patient => patient.id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error.message);
    }
  };
  if (loading) return <div>Loading...</div>;
  return (
    <div className="container">
      <h1 className="text-center text-danger mt-5">Registered Patients</h1>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Date of Birth</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Emergency Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.fullname}</td>
              <td>{patient.dateofbirth}</td>
              <td>{patient.age}</td>
              <td>{patient.gender}</td>
              <td>{patient.address}</td>
              <td>{patient.phonenumber}</td>
              <td>{patient.email}</td>
              <td>{patient.emergencynumber}</td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => handleEdit(patient.id)}>Edit</button>
                <button className="btn btn-danger btn-sm ms-2 ml-2" onClick={() => handleDelete(patient.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientList;
