/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeForm = ({ fetchEmployees }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    image: null,
    employeeId: "",
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
      const userCreate = await axios.post(
        "http://localhost:8000/api/v1/employees/create",
        data
      );
      // Fetch updated list of employees after successful submission
      alert(userCreate.data.message);
      fetchEmployees();
    } catch (err) {
      alert(err.message);
      console.error(err);
    }
  };

  return (
    <div className="container-fluid min-vh-100 min-vw-100 bg-primary text-white d-flex flex-column align-items-center justify-content-center">
      <div className="container vw-100 m-2 p-2 bg-white text-dark">
        <form
          onSubmit={handleSubmit}
          className="d-block w-50 mx-auto justify-content-center  bg-light text-dark p-1 rounded shadow-lg"
        >
          <div className="row m-0 p-2 justify-content-center h3 b text-center color-white">
            <label className="col-sm-12 text-dark   col-form-label">
              Employee Register Form
            </label>
          </div>

          <div className="row m-2 justify-content-center">
            <label className="col-sm-1 col-form-label m-3 p-0">Name</label>
            <div className="col-sm-6 m-3 p-0">
              <input
                type="text"
                name="name"
                className="form-control text-center"
                placeholder="name"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row m-2 justify-content-center">
            <label className="col-sm-1 col-form-label m-3 p-0">Email</label>
            <div className="col-sm-6 m-3 p-0">
              <input
                type="email"
                name="email"
                className="form-control text-center"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row m-2 justify-content-center">
            <label className="col-sm-1 col-form-label m-3 p-0">
              Mobile Number
            </label>
            <div className="col-sm-6 m-3 p-0">
              <input
                type="text"
                name="phone"
                className="form-control text-center"
                placeholder="Phone"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row m-2 justify-content-center">
            <label className="col-sm-1 col-form-label m-3 p-0">
              Work Profile
            </label>
            <div className="col-sm-6 m-3 p-0">
              <input
                type="text"
                name="position"
                className="form-control text-center"
                placeholder="Position"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row m-2 justify-content-center">
            <label className="col-sm-1 col-form-label m-3 p-0">
              Upload Image
            </label>
            <div className="col-sm-6 m-3 p-0">
              <input
                type="file"
                name="image"
                className="form-control text-center"
                placeholder="Select Image"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row m-2 justify-content-center">
            <label className="col-sm-1 col-form-label m-3 p-0">
              Employe ID
            </label>
            <div className="col-sm-6 m-3 p-0">
              <input
                type="text"
                name="employeeOfficeId"
                className="form-control text-center"
                placeholder="Employee ID"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn m-0 p-2  text-center text-white  col-sm-12 bg-success rounded-pill"
          >
            <h5>Register Employee</h5>
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
