/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
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
          `http://localhost:8000/api/v1/employees/SingleEmployee/${id}`
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
          imageUrl: setImageName || employee.imageUrl,
          employeeOfficeId: employee.employeeOfficeId,
        });
      } catch (err) {
        console.error(err);
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
    console.log(CheckId);
    try {
      await axios.put(
        `http://localhost:8000/api/v1/employees/update/${CheckId}`,
        data
      );
      UpdateEmployee();
      navigate("/"); // Redirect to home page or employee list
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="container vw-100 m-2 p-2">
        <form
          onSubmit={handleSubmit}
          className="d-block w-50 mx-auto justify-content-center"
          style={{ backgroundColor: "#e0f9fa" }}
        >
          <div className="row m-0 p-2 justify-content-center h5 bg-success text-center color-white">
            <label className="col-sm-12 text-white   col-form-label">
              Update Employee Details
            </label>
          </div>

          <div className="row m-2 justify-content-center">
            <label className="col-sm-1 col-form-label m-3 p-0">ID</label>
            <div className="col-sm-6 m-3 p-0">
              <input
                type="text"
                name="_id"
                className="form-control text-center"
                value={formData.id}
                onChange={handleChange}
                disabled
                readOnly
              />
            </div>
          </div>
          <div className="row m-2 justify-content-center">
            <label className="col-sm-1 col-form-label m-3 p-0">Name</label>
            <div className="col-sm-6 m-3 p-0">
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
          <div className="row m-2 justify-content-center">
            <label className="col-sm-1 col-form-label m-3 p-0">Email</label>
            <div className="col-sm-6 m-3 p-0">
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
                value={formData.phone}
                onChange={handleChange}
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
                value={formData.position}
                onChange={handleChange}
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
                name="imageUrl"
                className="form-control text-center"
                placeholder="Select Image"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="row m-2 justify-content-center">
            <label className="col-sm-1 col-form-label m-3 p-0">
              Current Image
            </label>
            <div className="col-sm-6 m-3 p-0">
              <input
                type="text"
                value={formData.imageUrl}
                className="form-control text-center"
                disabled
                readOnly
              ></input>
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
                value={formData.employeeOfficeId}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn m-0 p-2 text-center text-white  col-sm-12 bg-success"
          >
            <h5>Update Employee</h5>
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
