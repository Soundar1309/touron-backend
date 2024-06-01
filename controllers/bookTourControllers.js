const BookTour = require("../models/bookTourModel");

// @desc    add bookTour
// @route   POST /api/booktour/add
// @access  private
const addBookTour = async (req, res) => {
  const { name, mobileNumber, date, destination, adult, child, travelType } = req.body;
  const bookTour = await BookTour.create({
    name,
    mobileNumber,
    date,
    travelType,
    destination,
    adult,
    child,
    assignedTo: "",
    status: "Query Received"
  });
  await bookTour.save();
  res.status(201).json(bookTour);
};

// @desc    add bookTour
// @route   POST /api/booktour/add
// @access  private
const updateBookTour = async (req, res) => {
  // const { name, mobileNumber, date, destination, adult, child, travelType } = req.body;
  // const bookTour = await BookTour.create({
  //   name,
  //   mobileNumber,
  //   date,
  //   travelType,
  //   destination,
  //   adult,
  //   child,
  //   assignedTo: "",
  //   status: "Query Received"
  // });
  // await bookTour.save();
  // res.status(201).json(bookTour);
};

// @desc    get bookTour
// @route   GET /api/booktour/
// @access  public
const geAllBookTour = async (req, res) => {
  const bookTours = await BookTour.find({}).sort({ createdAt: -1 });
  res.json(bookTours);
};

// @desc    get bookTour by id
// @route   GET /api/booktour/:id
// @access  public
const getBookTourbyID = async (req, res) => {
  const bookTour = await BookTour.findById(req.params.id);
  if (bookTour) {
    res.json(bookTour);
  } else {
    res.status(404);
    throw new Error("Book tour not found");
  }
};
module.exports = {
  addBookTour,
  updateBookTour,
  geAllBookTour,
  getBookTourbyID,
};
