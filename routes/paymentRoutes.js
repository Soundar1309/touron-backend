const express = require("express");
const router = express.Router();
const {
  getPaymentByAscending,
  getPaymentbyID,
  addPayment,
  updatePayment,
  deletePayment,
} = require("../controllers/paymentControllers");

router.get("/", getPaymentByAscending);
router.get("/:id", getPaymentbyID);
router.post("/addpayment", addPayment);
router.post("/updatepayment/:id", updatePayment);
router.post("/deletepayment", deletePayment);

module.exports = router;
