import React, { useState } from "react";

const CreatePatient = () => {
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation logic
    const newErrors = {};
    if (!formData.fullname) {
      newErrors.fullname = "Name is required";
    }
    if (!formData.dateofbirth) {
      newErrors.dateofbirth = "Date of Birth is required";
    }
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age < 0 || formData.age > 107) {
      newErrors.age = "Please enter a valid age between 0 and 150";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
    }
    if (!formData.phonenumber) {
      newErrors.phonenumber = "Phone Number is required";
    } else if (!/^\d{10}$/.test(formData.phonenumber)) {
      newErrors.phonenumber = "Please enter a valid 10-digit phone number";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.emergencynumber) {
      newErrors.emergencynumber = "Emergency Contact is required";
    } else if (!/^\d{10}$/.test(formData.emergencynumber)) {
      newErrors.emergencynumber = "Please enter a valid 10-digit emergency contact number";
    }
    // Add other validation logic here...
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch("https://64d60e47754d3e0f13618812.mockapi.io/form/patient_registration", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          throw new Error("Failed to submit form data");
        }
        
        // Reset form data after successful submission
        setFormData({
          fullname: "",
          dateofbirth: "",
          age: "",
          gender: "",
          address: "",
          phonenumber: "",
          email: "",
          emergencynumber: ""
        });
      } catch (error) {
        console.error("Error submitting form data:", error.message);
      }
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="card">
        <h1 className="text-center text-primary mt-4 ">Patient Registration Form</h1>
        <form className="row mx-3 my-2" onSubmit={handleSubmit}>
          <div className="col-lg-6 col-md-6 d-flex flex-column content">
            <div className="mt-3 fw-bold">
              <label htmlFor="fullname ">Patient Full Name</label>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter Patient's Name"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                required    
              />
              {errors.fullname && <div className="text-danger">{errors.fullname}</div>}
            </div>
            <div className=" mt-3 fw-bold">
              <label htmlFor="dateofbirth">Date of Birth</label>
              <input
                type="date"
                className="form-control mt-2"        
                name="dateofbirth"
                value={formData.dateofbirth}
                onChange={handleChange}
                required
              />
              {errors.dateofbirth && <div className="text-danger">{errors.dateofbirth}</div>}
            </div>
            <div className=" mt-3 fw-bold">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                className="form-control mt-2"
                placeholder="Enter Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
              {errors.age && <div className="text-danger">{errors.age}</div>}
            </div>
            <div className=" mt-3 fw-bold">
              <label htmlFor="gender">Gender</label>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter Gender"         
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              />
              {errors.gender && <div className="text-danger">{errors.gender}</div>}
            </div>
          </div>

          <div className="col-lg-6 col-md-6 d-flex flex-column content">
            <div className=" mt-3 fw-bold">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control mt-2"
                placeholder="Enter Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              {errors.address && <div className="text-danger">{errors.address}</div>}
            </div>
            <div className=" mt-3 fw-bold">
              <label htmlFor="email">E-Mail</label>
              <input
                type="email" 
                className="form-control mt-2"
                placeholder="Enter Email Address"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>
            
            <div className=" mt-3 fw-bold">
              <label htmlFor="phonenumber">Phone Number</label>
              <input
                type="number"
                className="form-control mt-2"
                placeholder="Enter Contact Number"
                name="phonenumber"
                value={formData.phonenumber}
                onChange={handleChange}
                required
              />
              {errors.phonenumber && <div className="text-danger">{errors.phonenumber}</div>}
            </div>
          
            <div className=" mt-3 fw-bold">
              <label htmlFor="emergencynumber">Emergency Contact</label>
              <input
                type="number"
                className="form-control mt-2"
                placeholder="Enter Emergency Contact"
                name="emergencynumber"
                value={formData.emergencynumber}
                onChange={handleChange}
                required
              />
              {errors.emergencynumber && <div className="text-danger">{errors.emergencynumber}</div>}
            </div>
          </div>
          <div>
            <button type="submit" className="btn-submit text-center w-25 mb-2 mt-5 fw-bold ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePatient;
