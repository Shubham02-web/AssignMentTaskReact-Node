import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "rsuite";
import { pdf } from "@react-pdf/renderer";
import { EmployeePDF } from "./ViewPdfEmployee";
import { base_url } from "../config";
// const { Column, HeaderCell, Cell } = Table;

const EmployeeList = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(
        `${base_url}/api/v1/employees/allemployee`
      );
      setEmployees(response.data.employees);
    } catch (err) {
      console.error(err);
      err.response.data.message
        ? alert(err.response.data.message)
        : alert(err.message);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleViewPdf = async (employee) => {
    const blob = await pdf(<EmployeePDF employee={employee} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    if (blobUrl) {
      // Open the PDF in a new tab
      const newTab = window.open(blobUrl, "_blank");
      if (newTab) {
        newTab.focus();
      }

      // Trigger download
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${employee.name}.pdf`;
      a.click();
    }
  };

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
          + Add employee
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
                className="btn btn-danger btn-sm "
                onClick={() => navigate(`/employeeDelete/${employee._id}`)}
              >
                Delete Employee
              </Button>
              <Button
                className="btn btn-secondary btn-sm "
                onClick={() => handleViewPdf(employee)}
              >
                View Pdf
              </Button>
              {/* <Button
                onClick={() => handleViewPdf(employee)}
                className="btn btn-sm btn-success"
              >
                View Pdf
              </Button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
