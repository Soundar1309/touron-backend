const Payment = require("../models/paymentModel");

// @desc    get all payment in ascending order
// @route   GET /api/payment/
// @access  public
const getPaymentByAscending = async (req, res) => {
  const payment = await Payment.find({}).sort({ createdAt: -1 });
  res.json(payment);
};

// @desc    get payment by id
// @route   GET /api/payment/:id
// @access  public
const getPaymentbyID = async (req, res) => {
  const payment = await Payment.findById(req.params.id);
  if (payment) {
    res.json(payment);
  } else {
    res.status(404);
    throw new Error("payment not found");
  }
};

// @desc    add payment
// @route   POST /api/payment/addpayment
// @access  private
const addPayment = async (req, res) => {
  const { name } = req.body;

  const payment = await Payment.create({
    name,
  });
  await payment.save();
  res.status(201).json(payment);
};

// @desc    update payment
// @route   POST /api/payment/updatepayment/:id
// @access  private
const updatePayment = async (req, res) => {
  try {
    const {
      name
    } = req.body;
    const payment = await Payment.findById(req.params.id);
    payment.name = name
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete payment
// @route   POST /api/payment/deletepayment
// @access  private
const deletePayment = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedpayment = await Payment.findByIdAndDelete(id);
    res.status(200).json({ message: "payment deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    getPaymentByAscending,
    getPaymentbyID,
    addPayment,
    updatePayment,
    deletePayment
};
