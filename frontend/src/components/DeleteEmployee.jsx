/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { base_url } from "../config";

const EmployeeDelete = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);
  const navigate = useNavigate();
  const fetchEmployee = async (id) => {
    try {
      const response = await axios.delete(
        `${base_url}/api/v1/employees/delete/${id}`
      );
      setEmployee(response.data.employee);
      navigate("/");
      alert(response.data.message);
    } catch (err) {
      console.error(err);
      err.response.data.message
        ? alert(err.response.data.message)
        : alert(err.message);
    }
  };

  useEffect(() => {
    fetchEmployee(id);
  }, []);

  // if (employee) return <div>Loading Employee...</div>;

  return (
    <div className="container-fluid min-vh-100 min-vw-100 bg-primary text-white d-flex flex-column align-items-center justify-content-center">
      <div className="container text-center bg-light text-dark p-5 rounded shadow-lg">
        <div className="btn btn-lg d-flex align-items-center justify-content-center">
          Check alert Box For Conformation Of Employee data delete ??
        </div>
        <NavLink to={"/"} className="text-decoration-underline">
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeDelete;
