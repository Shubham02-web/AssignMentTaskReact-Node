import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/employees/allemployee"
      );
      setEmployees(response.data.employees);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="container mt-5">
      {employees.map((employee) => (
        <div key={employee._id}>
          <p>{employee.name}</p>
          <Link to={`/employeeDetails/${employee._id}`}>View Details</Link>
          <Link to={`/employeePDF/${employee._id}/pdf`}>Download PDF</Link>
          <Link to={`/employeeDelete/${employee._id}`}>Delete Employee</Link>
          <Link
            fetchEmployees={fetchEmployees}
            to={`/employeeUpdate/${employee._id}`}
          >
            Update Employee
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
