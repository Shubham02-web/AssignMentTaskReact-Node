/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    employeeOfficeId: "",
    // image: null,
  });

  // Handle input changes and update form data state
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      // Update the state with the new value or file
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // Append form data to FormData object for submission
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/employees/create",
        data
      );
      // Fetch updated list of employees after successful submission
      // fetchEmployees();
      alert(response.data.message);
      navigate("/");
    } catch (err) {
      console.error(err);
      err.response.data.message
        ? alert(err.response.data.message)
        : alert(err.message);
    }
  };

  return (
    <div className="container-fluid min-vh-100 min-vw-100 bg-primary text-white d-flex flex-column align-items-center justify-content-center">
      <form
        onSubmit={handleSubmit}
        style={{ width: "40%" }}
        className="d-block  justify-content-center  bg-light text-dark p-1 rounded shadow-lg"
      >
        <div className="row m-0 p-2 justify-content-center h3 b text-center color-white">
          <label className="col-sm-12 text-dark   col-form-label">
            Employee Register Form
          </label>
        </div>
        <div className="row m-2  justify-content-center">
          <label className="col-sm-1 col-form-label m-3 p-0">
            Name<span className="text-danger">*</span>
          </label>
          <div className="col-sm-6 m-3 p-0">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="name"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row m-2 justify-content-center">
          <label className="col-sm-1 col-form-label m-3 p-0">
            Email<span className="text-danger">*</span>
          </label>
          <div className="col-sm-6 m-3 p-0">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row m-2 justify-content-center">
          <label className="col-sm-1 col-form-label m-3 p-0">
            Mobile Number<span className="text-danger">*</span>
          </label>
          <div className="col-sm-6 m-3 p-0">
            <input
              type="number"
              name="phone"
              className="form-control"
              placeholder="Phone"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row m-2 justify-content-center">
          <label className="col-sm-1 col-form-label m-3 p-0">
            Work Profile<span className="text-danger">*</span>
          </label>
          <div className="col-sm-6 m-3 p-0">
            <input
              type="text"
              name="position"
              className="form-control "
              placeholder="Position"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row m-2 justify-content-center">
          <label className="col-sm-1 col-form-label m-3 p-0">
            Upload Image<span className="text-danger">*</span>
          </label>
          <div className="col-sm-6 m-3 p-0">
            <input
              type="file"
              name="image"
              className="form-control "
              placeholder="Select Image"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row gap-2 align-items-center text-center m-2 justify-content-center">
          <button
            type="submit"
            className="btn m-0 p-2  text-center text-white bg-success rounded-pill"
          >
            Register Employee
          </button>
          <NavLink to={"/"} className="text-decoration-underline">
            Back to Home
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
