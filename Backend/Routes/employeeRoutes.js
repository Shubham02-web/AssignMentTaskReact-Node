const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employeeController");

// Routes
router.post("/create", createEmployee);
router.get("/allemployee", getEmployees);
router.put("/update/:id", updateEmployee);
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
