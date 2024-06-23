import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeDetails from "./components/EmployeeDetails";
import EmployeeDelete from "./components/EmployeeDelete";
import UpdateEmployee from "./components/EmployeeUpdate";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/add" element={<EmployeeForm />} />
          <Route path="/employeeDetails/:id" element={<EmployeeDetails />} />

          <Route path="/employeeDelete/:id" element={<EmployeeDelete />} />
          <Route path="employeeUpdate/:id" element={<UpdateEmployee />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
