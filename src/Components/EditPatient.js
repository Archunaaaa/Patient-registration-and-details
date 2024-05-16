import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPatient = () => {
  const { id } = useParams(); // Get the id from URL params
  const navigate = useNavigate(); // Use navigate instead of Navigate

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
    console.log(id)
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
  
    fetchPatient(); // Call fetchPatient function inside useEffect
  }, [id]); // Ensure useEffect runs whenever id changes
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://64d60e47754d3e0f13618812.mockapi.io/form/patient_registration/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error("Failed to update patient details");
      }
      // Redirect to patient list page after successful update
      navigate("/");
    } catch (error) {
      console.error("Error updating patient details:", error.message);
    }
  };

  const handleEdit = () => {
    console.log(formData); 
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1 className="text-center text-primary mt-4">Edit Patient Details</h1>
      <form className="row mx-3 my-2" onSubmit={handleSubmit}>
        <div className="col-lg-6 col-md-6 d-flex flex-column content">
          <div className="mt-3 fw-bold">
            <label htmlFor="fullname">Patient Full Name</label>
            <input
              type="text"
              className="form-control mt-2"
              placeholder="Enter Patient's Name"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* Add other form fields similarly */}
        </div>

        {/* Include the rest of the form fields here */}

        <div>
          <button type="button" className="btn-submit text-center w-25 mb-2 mt-5 fw-bold" onClick={handleEdit}>
            Edit
          </button>
          <button type="submit" className="btn-submit text-center w-25 mb-2 mt-5 fw-bold">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPatient;
