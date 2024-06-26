/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { base_url } from "../config";
// eslint-disable-next-line no-unused-vars
const UpdateEmployee = ({ fetchEmployees }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    imageUrl: "",
    employeeOfficeId: "",
  });

  useEffect(() => {
    // Fetch the current details of the employee
    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(
          `${base_url}/api/v1/employees/SingleEmployee/${id}`
        );
        const employee = response.data.employee;
        console.log(employee);
        const setImageName = employee.imageUrl.split("/").pop();
        setFormData({
          id: employee._id,
          name: employee.name,
          email: employee.email,
          phone: employee.phone,
          position: employee.position,
          imageUrl: employee.imageUrl || setImageName,
          employeeOfficeId: employee.employeeOfficeId,
        });
      } catch (err) {
        console.error(err);
        err.response.data.message
          ? alert(err.response.data.message)
          : alert(err.message);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });
    const CheckId = formData.id;
    try {
      const response = await axios.put(
        `${base_url}/api/v1/employees/update/${CheckId}`,
        data
      );
      alert(response.data.message);
      UpdateEmployee();
      navigate("/"); // Redirect to home page or employee list
    } catch (err) {
      console.error(err);
      err.response.data.message
        ? alert(err.response.data.message)
        : alert(err.response.data.message);
    }
  };

  return (
    <div>
      <div className="container-fluid min-vh-100 min-vw-100 bg-primary text-white d-flex flex-column align-items-center justify-content-center">
        <form
          style={{ width: "40%" }}
          onSubmit={handleSubmit}
          className="d-block  mx-auto justify-content-center  bg-light text-dark p-1 rounded shadow-lg"
        >
          <div className="row m-0 p-0 justify-content-center h3 b text-center color-white">
            <label className="col-sm-12 text-dark   col-form-label">
              Update Employee Details
            </label>
          </div>
          <div className="row m-1 justify-content-center">
            <label className="col-sm-1 col-form-label m-2 p-0">
              Employe ID
            </label>
            <div className="col-sm-6 m-2 p-0">
              <input
                type="text"
                name="employeeOfficeId"
                className="form-control text-center"
                placeholder="Employee ID"
                value={formData.employeeOfficeId}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>
          <div className="row m-1 justify-content-center">
            <label className="col-sm-1 col-form-label m-2 p-0">Name</label>
            <div className="col-sm-6 m-2 p-0">
              <input
                type="text"
                name="name"
                className="form-control text-center"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row m-1 justify-content-center">
            <label className="col-sm-1 col-form-label m-2 p-0">Email</label>
            <div className="col-sm-6 m-2 p-0">
              <input
                type="email"
                name="email"
                className="form-control text-center"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row m-1 justify-content-center">
            <label className="col-sm-1 col-form-label m-2 p-0 pr-2">
              Mobile Number
            </label>
            <div className="col-sm-6 m-2 p-0">
              <input
                type="number"
                name="phone"
                className="form-control text-center"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row m-1 justify-content-center">
            <label className="col-sm-1 col-form-label m-2 p-0">
              Work Profile
            </label>
            <div className="col-sm-6 m-2 p-0">
              <input
                type="text"
                name="position"
                className="form-control text-center"
                placeholder="Position"
                value={formData.position}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row m-1 justify-content-center">
            <label className="col-sm-1 col-form-label m-2 p-0">
              Upload Image
            </label>
            <div className="col-sm-6 m-2 p-0">
              <input
                type="file"
                name="image"
                className="form-control text-center"
                placeholder="Select Image"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row m-1 justify-content-center">
            <label className="col-sm-1 col-form-label m-2 p-0">
              Current Image
            </label>
            <div className="col-sm-6 m-2 p-0">
              <img
                src={`${base_url}/${formData.imageUrl}`}
                alt={formData.imageUrl}
                className="img-fluid rounded"
                style={{
                  maxHeight: "80px",
                  padding: "0",
                  marginLeft: "70px",
                }}
              />
            </div>
          </div>

          <div className="row m-1 text-center justify-content-center">
            <button
              type="submit"
              className="btn m-0 p-2 text-center text-white  col-sm-12 bg-success"
            >
              Update Employee
            </button>
            <NavLink to={"/"} className="text-decoration-underline">
              Back to Home
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
