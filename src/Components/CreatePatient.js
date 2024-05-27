import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        setIsLoading(true);
        try {
          const response = await fetch(`https://64d60e47754d3e0f13618812.mockapi.io/form/patient_registration/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch patient details");
          }
          const data = await response.json();
          setFormData(data);
        } catch (error) {
          console.error("Error fetching patient details:", error.message);
        } finally {
          setIsLoading(false);
        }
      };

      fetchPatient();
    }
  }, [id]);

  const calculateAge = (dateofbirth) => {
    const dob = new Date(dateofbirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedFormData = {
      ...formData,
      [name]: value
    };

    if (name === "dateofbirth") {
      const age = calculateAge(value);
      updatedFormData = {
        ...updatedFormData,
        age: age
      };
    }

    setFormData(updatedFormData);
  };

  const handleReset = () => {
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
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const newErrors = {};
    if (!formData.fullname) newErrors.fullname = "Name is required";
    if (!formData.dateofbirth) newErrors.dateofbirth = "Date of Birth is required";
    if (!formData.age) newErrors.age = "Age is required";
    else if (isNaN(formData.age) || formData.age < 0 || formData.age > 107) newErrors.age = "Please enter a valid age between 0 and 107";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phonenumber) newErrors.phonenumber = "Phone Number is required";
    else if (!/^\d{10}$/.test(formData.phonenumber)) newErrors.phonenumber = "Please enter a valid 10-digit phone number";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Please enter a valid email address";
    if (!formData.emergencynumber) newErrors.emergencynumber = "Emergency Contact is required";
    else if (!/^\d{10}$/.test(formData.emergencynumber)) newErrors.emergencynumber = "Please enter a valid 10-digit emergency contact number";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const method = id ? "PUT" : "POST";
        const url = id
          ? `https://64d60e47754d3e0f13618812.mockapi.io/form/patient_registration/${id}`
          : "https://64d60e47754d3e0f13618812.mockapi.io/form/patient_registration";

        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          throw new Error("Failed to submit form data");
        }

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
        navigate("/patient/view");
      } catch (error) {
        console.error("Error submitting form data:", error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="card mt-5 bg-light">
        <h1 className="text-center text-primary mt-4">
          {id ? "Update Patient Details" : "Patient Registration Create"}
        </h1>
        {isLoading ? (
          <div className="text-center mt-3">
            <div className="spinner-border text-primary" role="status"></div>
          </div>
        ) : (
          <form className="row mx-3 my-2" onSubmit={handleSubmit}>
            <div className="col-lg-6 col-md-6 d-flex flex-column content">
              <div className="mt-3 fw-bold">
                <label htmlFor="fullname">Patient Full Name<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Enter Patient's Name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                />
                {errors.fullname && <p className="error-message text-danger fw-bold">{errors.fullname}</p>}
              </div>
              <div className="mt-3 fw-bold">
                <label htmlFor="dateofbirth">Date of Birth</label>
                <input
                  type="date"
                  className="form-control mt-2"
                  name="dateofbirth"
                  value={formData.dateofbirth}
                  onChange={handleChange}
                />
                {errors.dateofbirth && <p className="error-message text-danger fw-bold">{errors.dateofbirth}</p>}
              </div>
              <div className="mt-3 fw-bold">
                <label htmlFor="age">Age</label>
                <input
                  type="number"
                  className="form-control mt-2"
                  placeholder="Enter Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  readOnly
                />
                {errors.age && <p className="error-message text-danger fw-bold">{errors.age}</p>}
              </div>
              <div className="mt-3 fw-bold">
                <label>Gender<span className="text-danger">*</span></label>
                <div>
                  <label>
                    <input
                      type="radio"
                      value="Male"
                      checked={formData.gender === "Male"}
                      onChange={handleChange}
                      name="gender"
                    />
                    Male
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Female"
                      className="ms-2"
                      checked={formData.gender === "Female"}
                      onChange={handleChange}
                      name="gender"
                    />
                    Female
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="Custom"
                      className="ms-2"
                      checked={formData.gender === "Custom"}
                      onChange={handleChange}
                      name="gender"
                    />
                    Custom
                  </label>
                </div>
                {errors.gender && <p className="error-message text-danger fw-bold">{errors.gender}</p>}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 d-flex flex-column content">
              <div className="mt-3 fw-bold">
                <label htmlFor="address">Address<span className="text-danger">*</span></label>
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Enter Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <p className="error-message text-danger fw-bold">{errors.address}</p>}
              </div>
              <div className="mt-3 fw-bold">
                <label htmlFor="email">E-Mail</label>
                <input
                  type="email"
                  className="form-control mt-2"
                  placeholder="Enter Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="error-message text-danger fw-bold">{errors.email}</p>}
              </div>
              <div className="mt-3 fw-bold">
                <label htmlFor="phonenumber">Phone Number<span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control mt-2"
                  placeholder="Enter Contact Number"
                  name="phonenumber"
                  value={formData.phonenumber}
                  onChange={handleChange}
                />
                {errors.phonenumber && <p className="error-message text-danger fw-bold">{errors.phonenumber}</p>}
              </div>
              <div className="mt-3 fw-bold">
                <label htmlFor="emergencynumber">Emergency Contact<span className="text-danger">*</span></label>
                <input
                  type="number"
                  className="form-control mt-2"
                  placeholder="Enter Emergency Contact"
                  name="emergencynumber"  
                  value={formData.emergencynumber}
                  onChange={handleChange}
                />
                {errors.emergencynumber && <p className="error-message text-danger fw-bold">{errors.emergencynumber}</p>}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4 mb-2 w-100">
            <button type="button" className="btn-reset me-2 fw-bold" onClick={handleReset}>
                Reset
              </button>
              <button type="submit" className="btn-submit fw-bold">
                {isLoading ? "Submitting..." : id ? "Update" : "Submit"}
              </button>
            
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreatePatient;
