/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";

const EmployeeForm = ({ fetchEmployees }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    image: null,
    employeeId: "",
  });

  // Handle input changes and update form data state
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      // Update the state with the new value or file
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    // Append form data to FormData object for submission
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post("http://localhost:5000/api/employees/create", data);
      // Fetch updated list of employees after successful submission
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        onChange={handleChange}
        required
      />
      <input type="file" name="image" onChange={handleChange} required />
      <input
        type="text"
        name="employeeId"
        placeholder="Employee ID"
        onChange={handleChange}
        required
      />
      <button type="submit">Add Employee</button>
    </form>
  );
};

export default EmployeeForm;
