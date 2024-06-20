const Employee = require("../Models/employee");
const fs = require("fs");
const path = require("path");

// Controllers to handle opertions Creting Employee
const createEmployee = async function (req, res, next) {
  try {
    // accessing all necessary fields
    const { name, email, phone, position, employeeOfficeId } = req.body;
    // setup for image
    const image = req.file ? req.file.path : null;
    //   Creating Condition to verify fields show error message if any of field is missing

    if (!name || !email || !phone || !position || !employeeOfficeId)
      return res.status(400).json({
        success: false,
        message:
          "Please Enter All Fields name email phone position employeeOfficeId",
      });
    const imageUrl = `uploads/${employeeOfficeId}/${req.file.originalname}`;
    const newEmployee = await Employee.create({
      name,
      email,
      phone,
      position,
      imageUrl,
      employeeOfficeId,
    });
    await newEmployee.save();
    res.status(201).json({
      success: true,
      message: "Employee Created/Registerd Successfully",
      newEmployee,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error in CreateEmployee API ${err.message}`,
    });
  }
};
// Get all Employess
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    // validation if we dont have any employee
    if (!employees)
      return res.status(404).json({
        success: false,
        message: "Employees not found / Empty Employee Collection",
      });
    res.status(200).json({
      success: true,
      message: "Employees find successfully",
      employees,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: `Error in get all Employees API ${err.message}`,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        success: false,
        message: `Error in deleteEmployee API`,
      });
    const { name, email, phone, position, employeeOfficeId, image } = req.body;
    if (req.file) {
      const imageUrl = `/uploads/${req.body.employeeOfficeId}/${req.file.originalname}`;
      // Image.imageUrl = imageUrl;
    }
    const UpdatedEmployee = await Employee.findById(id);
    if (!UpdatedEmployee) console.log("no employee find for these id");
    if (name) UpdatedEmployee.name = name;
    if (email) UpdatedEmployee.email = email;
    if (phone) UpdatedEmployee.phone = phone;
    if (position) UpdatedEmployee.position = position;
    if (employeeOfficeId) UpdatedEmployee.employeeOfficeId = employeeOfficeId;
    await UpdatedEmployee.save();
    await res.status(200).json({
      success: true,
      message: `Employee Updates Successfully`,
      UpdatedEmployee,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `error in Update Employee API ${err.message}`,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({
        success: false,
        message: `Error in deleteEmployee API`,
      });
    const delEmployee = await Employee.findByIdAndDelete(id);
    console.log(__dirname);
    // Delete the associated image file if it exists
    if (delEmployee.image) {
      fs.unlink(path.join(__dirname, "..", delEmployee.imageUrl), (err) => {
        if (err) {
          console.error(`Failed to delete image file: ${err.message}`);
        }
      });
    }
    res.status(200).json({
      success: true,
      message: "Employee deleted Successfully",
      delEmployee,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error in delete Employee API ${err.message}`,
    });
  }
};

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
