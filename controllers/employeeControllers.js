const Employee = require("../models/employeeModel");
const bcrypt = require("bcryptjs");

// @desc    get all employee in ascending order
// @route   GET /api/employee/
// @access  public
const getEmployeeByAscending = async (req, res) => {
  const employee = await Employee.find({}).sort({ createdAt: -1 });
  res.json(employee);
};

// @desc    get all sales admin in ascending order
// @route   GET /api/employee/salesadmin
// @access  public
const getAllSalesAdmin = async (req, res) => {
  try {
    const employees = await Employee.find({ role: "Sales Admin" }).sort({
      createdAt: 1,
    });
    res.json(employees);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

// @desc    get sales admin with a specific mobile number
// @route   GET /api/employee/salesadmin/:mobileNumber
// @access  public
const getSalesAdminByMobileNumber = async (req, res) => {
  const { mobileNumber } = req.params;

  try {
    const employee = await Employee.findOne({
      role: "Sales Admin",
      mobileNumber: mobileNumber,
    });

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: "Sales Admin not found with the given mobile number" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};


// @desc    get employee by id
// @route   GET /api/employee/:id
// @access  public
const getEmployeebyID = async (req, res) => {
  const employee = await Employee.findById(req.params.id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404);
    throw new Error("Employee not found");
  }
};

// @desc    add employee
// @route   POST /api/employee/add
// @access  private
const addEmployee = async (req, res) => {
  const { name, email, password, mobileNumber, designation, role } = req.body;

  // Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const employee = await Employee.create({
    name,
    email,
    password: hashedPassword,
    mobileNumber,
    designation,
    role,
  });
  await employee.save();
  res.status(201).json(employee);
};

// @desc    update employee
// @route   POST /api/employee/update/:id
// @access  private
const updateEmployee = async (req, res) => {
  try {
    const { name, email, password, mobileNumber, designation, role } = req.body;
    const employee = await Employee.findById(req.params.id);

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    employee.name = name;
    employee.email = email;
    employee.password = hashedPassword;
    employee.mobileNumber = mobileNumber;
    employee.designation = designation ? designation : employee.designation;
    employee.role = role ? role : employee.role;

    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete employee
// @route   POST /api/employee/delete
// @access  private
const deleteEmployee = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedVendor = await Employee.findByIdAndDelete(id);
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getEmployeeByAscending,
  getAllSalesAdmin,
  getEmployeebyID,
  getSalesAdminByMobileNumber,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
