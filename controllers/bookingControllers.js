const Booking = require("../models/bookingModel");

// @desc    add booking
// @route   POST /api/booking/add
// @access  private
const addBooking = async (req, res) => {
  const {
    userId,
    mobileNumber,
    dateOfPlanning,
    dateOfBooking,
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

// @desc    update internationalcity
// @route   POST /api/internationalcity/update/:id
// @access  private
const updateBooking = async (req, res) => {
  try {
    const {
      userId,
      mobileNumber,
      dateOfPlanning,
      dateOfBooking,
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
const geAllBooking = async (req, res) => {
  const bookings = await Booking.find({}).sort({ createdAt: -1 });
  res.json(bookings);
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
  geAllBooking,
  getBookingbyID,
  updateBooking,
  updateAssignedTo,
  updateStatus,
};
