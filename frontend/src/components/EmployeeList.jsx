import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "rsuite";

// const { Column, HeaderCell, Cell } = Table;

const EmployeeList = () => {
  const navigate = useNavigate();
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
    <div className="container-fluid min-vh-100 min-vw-100 bg-primary text-white d-flex flex-column align-items-center justify-content-center">
      <h2 className="text-center mb-4">Employees List</h2>
      <div
        style={{ marginLeft: "190px" }}
        className="w-75  mb-2 d-flex justify-content-end"
      >
        <Button
          className="btn btn-light btn-sm mr-2"
          onClick={() => navigate(`/add`)}
        >
          Add employee
        </Button>
      </div>
      <div className="container bg-light text-dark p-5 rounded shadow-lg">
        {employees.map((employee) => (
          <div
            key={employee._id}
            className="d-flex justify-content-between align-items-center mb-3 p-2 border-bottom"
          >
            <span className="employee-name font-weight-bold mr-3">
              {employee.name}
            </span>
            <div className="button-group d-flex">
              <Button
                className="btn btn-info btn-sm mr-2"
                onClick={() => navigate(`/employeeDetails/${employee._id}`)}
              >
                Check Details
              </Button>
              <Button
                className="btn btn-primary btn-sm mr-2"
                onClick={() => navigate(`/employeeUpdate/${employee._id}`)}
              >
                Update Details
              </Button>
              <Button
                className="btn btn-danger btn-sm mr-2"
                onClick={() => navigate(`/employeeDelete/${employee._id}`)}
              >
                Delete Employee
              </Button>
              <Button
                className="btn btn-secondary btn-sm"
                onClick={() => navigate(`/employeePDF/${employee._id}/pdf`)}
              >
                Employee PDF
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
