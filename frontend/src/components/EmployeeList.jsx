import { useState, useEffect } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      {employees.map((employee) => (
        <div key={employee._id}>
          <p>{employee.name}</p>
          <link to={`/employee/${employee._id}`}>View Details</link>
          <link to={`/employee/${employee._id}/pdf`}>Download PDF</link>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
