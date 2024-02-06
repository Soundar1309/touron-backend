const express = require("express")
const router = express.Router()
const { getEmployeeByAscending, getAllSalesAdmin, getEmployeebyID, addEmployee, updateEmployee, deleteEmployee, getSalesAdminByMobileNumber } = require("../controllers/employeeControllers")

router.get("/", getEmployeeByAscending)
router.get("/salesadmin", getAllSalesAdmin)
router.get("/salesadmin/:mobileNumber", getSalesAdminByMobileNumber)
router.get("/:id", getEmployeebyID)
router.post("/add", addEmployee)
router.post("/update/:id", updateEmployee)
router.post("/delete", deleteEmployee)

module.exports = router