import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog';
import { ProgressSpinner } from 'primereact/progressspinner';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletePatientId, setDeletePatientId] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
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

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      const response = await fetch(`https://64d60e47754d3e0f13618812.mockapi.io/form/patient_registration/${deletePatientId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete patient");
      }
      setPatients(patients.filter(patient => patient.id !== deletePatientId));
      setDeleteConfirmationVisible(false);
    } catch (error) {
      console.error("Error deleting patient:", error.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="container">
      <Link to="/create">
        <button className="btn btn-grad fw-bold mt-5 text-success">ADD NEW</button>
      </Link>
      <h1 className="text-center text-danger mb-5 mt-5">Registered Patients</h1>
      <DataTable value={patients} loading={loading}>
        <Column field="fullname" header="Full Name" />
        <Column field="dateofbirth" header="Date of Birth" />
        <Column field="age" header="Age" />
        <Column field="gender" header="Gender" />
        <Column field="address" header="Address" />
        <Column field="phonenumber" header="Phone Number" />
        <Column field="email" header="Email" />
        <Column field="emergencynumber" header="Emergency Contact" />
        <Column header="Action" body={(rowData) => (
          <>
            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(rowData.id)}>Edit</button>
            <button className="btn btn-danger btn-sm ms-2" onClick={() => {
              setDeletePatientId(rowData.id);
              setDeleteConfirmationVisible(true);
            }}>Delete</button>
          </>
        )} />
      </DataTable>
      <Dialog
        visible={deleteConfirmationVisible}
        onHide={() => setDeleteConfirmationVisible(false)}
        header="Delete Patient" 
        modal
        footer={
          !deleteLoading && (
            <div>
              <button className="btn btn-secondary" onClick={() => setDeleteConfirmationVisible(false)}>Cancel</button>
              <button className="btn btn-danger ms-2" onClick={handleDelete}>Delete</button>
            </div>
          )
        }
      >
        {deleteLoading ? (
          <div className="p-d-flex p-jc-center p-ai-center" style={{ height: '100px' }}>
            <ProgressSpinner />
          </div>
        ) : (
          <div>Are you sure you want to delete this patient?</div>
        )}
      </Dialog>
    </div>
  );
};

export default PatientList;
