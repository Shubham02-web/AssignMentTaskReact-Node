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
    <div>
      <h1>Check Alert Box for response</h1>
    </div>
  );
};

export default EmployeeDelete;
