import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateEmployee = ({ fetchEmployees }) => {
  const { id } = useParams();
  const history = useHistory();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    imageUrl: null,
    employeeOfficeId: "",
  });

  useEffect(() => {
    // Fetch the current details of the employee
    const fetchEmployeeDetails = async (id) => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/employees/SingleEmployee${id}`
        );
        const { name, email, phone, position, employeeOfficeId, imageUrl } =
          response.data;
        setFormData({
          name,
          email,
          phone,
          position,
          employeeOfficeId,
          imageUrl: null,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchEmployeeDetails(id);
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });

    try {
      const id = data._id;
      await axios.put(
        `http://localhost:8000/api/v1/employees/update/${id}`,
        data
      );
      fetchEmployees();
      history.push("/"); // Redirect to home page or employee list
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
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="position"
        placeholder="Position"
        value={formData.position}
        onChange={handleChange}
        required
      />
      <input type="file" name="image" onChange={handleChange} />
      <input
        type="text"
        name="employeeId"
        placeholder="Employee ID"
        value={formData.employeeOfficeId}
        onChange={handleChange}
        required
      />
      <button type="submit">Update Employee</button>
    </form>
  );
};

export default UpdateEmployee;
