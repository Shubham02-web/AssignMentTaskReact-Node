import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  const fetchEmployee = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/employees/${id}`
      );
      setEmployee(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  if (!employee) return <div>Loading...</div>;

  return (
    <div>
      <h2>{employee.name}</h2>
      <p>Email: {employee.email}</p>
      <p>Phone: {employee.phone}</p>
      <p>Position: {employee.position}</p>
      <p>Employee ID: {employee.employeeId}</p>
      <img src={employee.image} alt={employee.name} />
    </div>
  );
};

export default EmployeeDetails;
