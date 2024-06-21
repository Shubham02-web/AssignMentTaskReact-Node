import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../index.css";
const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);

  const fetchEmployee = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/employees/SingleEmployee/${id}`
      );
      setEmployee(response.data.employee);
      if (employee) alert(response.data.message);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployee(id);
  }, []);

  if (!employee) return <div>Loading Employee Details...</div>;

  return (
    <div>
      <h2>{employee.name}</h2>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Position: {employee.position}</p>
      <p>Employee ID: {employee.employeeOfficeId}</p>
      <img src={employee.imageUrl} alt={employee.name} />
    </div>
  );
};

export default EmployeeDetails;
