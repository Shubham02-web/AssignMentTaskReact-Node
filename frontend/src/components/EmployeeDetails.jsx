import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../index.css";
import "bootstrap/dist/css/bootstrap.min.css";
const EmployeeDetails = () => {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
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
    <div className="container-fluid min-vh-100 min-vw-100 bg-primary text-white d-flex flex-column align-items-center justify-content-center">
      <div className="container bg-light text-dark p-5 rounded shadow-lg">
        <table className="table table-bordered border-primary table-hover">
          <thead className="thead-dark">
            <tr>
              <th className="text-center">
                <h2>Field Name</h2>
              </th>
              <th className="text-center">
                <h2>Field Details</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <th>Name</th>
              <td>{employee.name}</td>
            </tr>
            <tr className="text-center">
              <th>Email</th>
              <td>{employee.email}</td>
            </tr>
            <tr className="text-center">
              <th>Mobile No.</th>
              <td>{employee.phone}</td>
            </tr>
            <tr className="text-center">
              <th>Work Profile (Position)</th>
              <td>{employee.position}</td>
            </tr>
            <tr className="text-center">
              <th>Employee ID</th>
              <td>{employee.employeeOfficeId}</td>
            </tr>
            <tr className="text-center">
              <th>Image</th>
              <td>
                <img
                  src={employee.imageUrl}
                  alt={employee.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "200px" }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDetails;
