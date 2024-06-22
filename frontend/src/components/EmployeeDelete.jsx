/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeDelete = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);

  const fetchEmployee = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/v1/employees/delete/${id}`
      );
      setEmployee(response.data.employee);
      alert(response.data.message);
    } catch (err) {
      alert(err.response.data.message);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployee(id);
  }, []);

  // if (employee) return <div>Loading Employee...</div>;

  return (
    <div className="container-fluid min-vh-100 min-vw-100 bg-primary text-white d-flex flex-column align-items-center justify-content-center">
      <div className="container bg-light text-dark p-5 rounded shadow-lg">
        <div className="btn btn-lg d-flex align-items-center justify-content-center">
          Check alert Box For Conformation Of Employee data delete ??
        </div>
      </div>
    </div>
  );
};

export default EmployeeDelete;
