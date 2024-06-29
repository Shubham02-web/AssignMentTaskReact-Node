import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Lazy load the components
const EmployeeForm = lazy(() => import("./components/AddEmployee"));
const EmployeeList = lazy(() => import("./components/AllEmployeesList"));
const EmployeeDetails = lazy(() => import("./components/ViewEmployeeDetails"));
const EmployeeDelete = lazy(() => import("./components/DeleteEmployee"));
const UpdateEmployee = lazy(() => import("./components/UpdateEmployee"));

const App = () => {
  return (
    <Router>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/add" element={<EmployeeForm />} />
            <Route path="/employeeDetails/:id" element={<EmployeeDetails />} />
            <Route path="/employeeDelete/:id" element={<EmployeeDelete />} />
            <Route path="/employeeUpdate/:id" element={<UpdateEmployee />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
