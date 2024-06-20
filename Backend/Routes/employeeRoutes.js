const express = require("express");
const router = express.Router();
const upload = require("../middelware/UploadFile");
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
  getSingleEmployee,
} = require("../controller/employeeController");
// Routes
router.post("/create", upload.single("image"), createEmployee);
router.get("/allemployee", getEmployees);
router.get("/SingleEmployee/:id", getSingleEmployee);
router.put("/update/:id", upload.single("image"), updateEmployee);
router.delete("/delete/:id", deleteEmployee);

module.exports = router;
