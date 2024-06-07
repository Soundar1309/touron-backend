const Booking = require("../models/bookingModel");
const Employee = require("../models/employeeModel");

// @desc    add booking
// @route   POST /api/booking/add
// @access  private
const addBooking = async (req, res) => {
  const {
    userId,
    mobileNumber,
    dateOfPlanning,
    dateOfBooking,
    category,
    tourType,
    destination,
    accompany,
    adult,
    child,
    accommodation,
    travelStyle,
    budget,
    adventure,
    assignedTo,
    status,
  } = req.body;

  const booking = await Booking.create({
    userId,
    mobileNumber,
    dateOfPlanning: new Date(dateOfPlanning),
    dateOfBooking: new Date(dateOfBooking),
    tourType,
    category,
    destination,
    accompany,
    adult,
    child,
    accommodation,
    travelStyle,
    budget,
    adventure,
    assignedTo,
    status,
  });
  await booking.save();
  res.status(201).json(booking);
};

// @desc    update booking
// @route   POST /api/booking/update/:id
// @access  private
const updateBooking = async (req, res) => {
  try {
    const {
      userId,
      mobileNumber,
      dateOfPlanning,
      dateOfBooking,
      category,
      tourType,
      destination,
      accompany,
      adult,
      child,
      accommodation,
      travelStyle,
      budget,
      adventure,
      assignedTo,
      status,
    } = req.body;
    const booking = await Booking.findById(req.params.id);

    booking.userId = userId;
    booking.mobileNumber = mobileNumber;
    booking.dateOfPlanning = new Date(dateOfPlanning);
    booking.dateOfBooking = new Date(dateOfBooking);
    booking.category = category;
    booking.tourType = tourType;
    booking.destination = destination;
    booking.accompany = accompany;
    booking.adult = adult;
    booking.child = child;
    booking.accommodation = accommodation;
    booking.travelStyle = travelStyle;
    booking.budget = budget;
    booking.adventure = adventure;
    booking.assignedTo = assignedTo;
    booking.status = status;

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    get booking
// @route   GET /api/booking/
// @access  public
const getAllBooking = async (req, res) => {
  const category = req.query.category;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const skip = (page - 1) * limit;

  let requestPayload = {};
  if (category && category !== "All") {
    requestPayload.category = category;
  }

  if (req.query.userId) {
    requestPayload.userId = req.query.userId;
  }

  if (req.query.assignedTo) {
    requestPayload.assignedTo = req.query.assignedTo;
  }

  const bookings = await Booking.find(requestPayload)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const totalRecords = await Booking.countDocuments(requestPayload);

  res.json({
    totalRecords,
    page,
    limit,
    bookings,
  });
};

// @desc    get booking by id
// @route   GET /api/booking/:id
// @access  public
const getBookingbyID = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (booking) {
    res.json(booking);
  } else {
    res.status(404);
    throw new Error("Booking not found");
  }
};

const updateAssignedTo = async (req, res) => {
  const { id } = req.params;
  const { assignedTo } = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.assignedTo = assignedTo;
    await booking.save();

    res
      .status(200)
      .json({ message: "AssignedTo updated successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: "status updated successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
module.exports = {
  addBooking,
  getAllBooking,
  getBookingbyID,
  updateBooking,
  updateAssignedTo,
  updateStatus,
};
