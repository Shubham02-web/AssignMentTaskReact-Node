import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState([]);

  const fetchSingleEmployee = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/employees/SingleEmployee/${id}`
      );
      setEmployee(response.data.employee);
    } catch (err) {
      console.error(err);
      err.response.data.message
        ? alert(err.response.data.message)
        : alert(err.message);
    }
  };

  useEffect(() => {
    fetchSingleEmployee(id);
  }, []);

  return (
    <div className="container-fluid min-vh-100 min-vw-100 bg-primary text-white d-flex flex-column align-items-center justify-content-center">
      <div className="container bg-light text-dark p-5 rounded shadow-lg">
        <NavLink to={"/"} className="text-decoration-underline">
          Back to Home
        </NavLink>
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
                  alt={employee.imageUrl}
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
