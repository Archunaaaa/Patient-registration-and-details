import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const EditPatient = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    fullname: "",
    dateofbirth: "",
    age: "",
    gender: "",
    address: "",
    phonenumber: "",
    email: "",
    emergencynumber: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatient();
  }, []);

  const fetchPatient = async () => {
    try {
      const response = await fetch(`https://64d60e47754d3e0f13618812.mockapi.io/form/patient_registration/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch patient details");
      }
      const data = await response.json();
      setFormData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching patient details:", error.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1 className="text-center text-primary mt-4">Edit Patient Details</h1>
      <form className="row mx-3 my-2">
        {/* Form fields */}
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
          // Add other form fields similarly
        />
      </form>
    </div>
  );
};

export default EditPatient;
