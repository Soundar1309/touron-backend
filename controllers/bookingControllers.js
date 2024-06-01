const Booking = require("../models/bookingModel");

// @desc    add booking
// @route   POST /api/booking/add
// @access  private
const addBooking = async (req, res) => {
  const {
    userId,
    userName,
    mobileNumber,
    dateOfPlanning,
    dateOfBooking,
    destinationType,
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
    userName,
    mobileNumber,
    dateOfPlanning: new Date(dateOfPlanning),
    dateOfBooking: new Date(dateOfBooking),
    destinationType,
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
      userName,
      mobileNumber,
      dateOfPlanning,
      dateOfBooking,
      destinationType,
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
    booking.userName = userName;
    booking.mobileNumber = mobileNumber;
    booking.dateOfPlanning = new Date(dateOfPlanning);
    booking.dateOfBooking = new Date(dateOfBooking);
    booking.destinationType = destinationType;
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
module.exports = {
  addBooking,
  geAllBooking,
  getBookingbyID,
  updateBooking,
};
