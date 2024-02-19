const Request = require("../models/requestModel");
const BookingB2B = require("../models/bookingb2bModel");
const BookingB2C = require("../models/bookingb2cModel");

// @desc    get request
// @route   GET /api/request/
// @access  public
const getRequest = async (req, res) => {
  const request = await Request.find({});
  res.json(request);
};

// @desc    get request by mobile
// @route   GET /api/request/mobile
// @access  public
const getRequestByMobile = async (req, res) => {
  const { mobileNumber } = req.query;
  const request = await Request.find({ mobileNumber });
  res.json(request);
};

// @desc    get request by mobile with status count
// @route   GET /api/request/mobile/getdetails
// @access  public
const getRequestDetailByMobile = async (req, res) => {
  try {
    const { mobileNumber } = req.query;

    const completedCount = await Request.countDocuments({
      mobileNumber,
      status: "completed",
    });

    const cancelledCount = await Request.countDocuments({
      mobileNumber,
      status: "cancelled",
    });

    const completedRequests = await Request.find({
      mobileNumber,
      status: "completed",
    }).select("destination");

    const responseData = {
      completedCount,
      cancelledCount,
      completedDestinations: completedRequests.map(
        (request) => request.destination
      ),
    };

    res.json(responseData);
  } catch (error) {
    console.error("Error fetching request details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    get request by id
// @route   GET /api/request/:id
// @access  public
const getRequestbyID = async (req, res) => {
  const request = await Request.findById(req.params.id);
  if (request) {
    res.json(request);
  } else {
    res.status(404);
    throw new Error("Request not found");
  }
};

// @desc    get request by surveyId
// @route   GET /api/request/surveyid/:id
// @access  public
const getRequestbySurveyId = async (req, res) => {
  const { id } = req.params; // Use req.params to get the URL parameter
  try {
    const request = await Request.find({ surveyId: id });
    if (request) {
      res.json(request);
    } else {
      res.status(404).json({ message: "Request not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc    add request
// @route   POST /api/request/add
// @access  private
const addRequest = async (req, res) => {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${day}${month}${year}`;
  const allRequest = await Request.find({});

  const {
    status,
    handledBy,
    username,
    mobileNumber,
    destination,
    travelWith,
    departureStation,
    dateItenary,
    tourPlan,
    category,
    planCategory,
    departureInDays,
    tourCost,
    queryFrom,
    travelType,
    state,
    city,
    noOfChild,
    noOfAdult,
    nearestBranch,
  } = req.body;

  const request = await Request.create({
    status,
    handledBy,
    username: username ? username : req.user.username,
    mobileNumber: mobileNumber ? mobileNumber : req.user.mobileNumber,
    destination,
    travelWith,
    departureStation,
    dateItenary,
    tourPlan,
    surveyId: `TO-${formattedDate}-${1705923 + allRequest.length + 1}`,
    category,
    planCategory,
    departureInDays,
    tourCost,
    queryFrom,
    travelType,
    state,
    city,
    noOfChild,
    noOfAdult,
    nearestBranch,
  });
  if (request.category === "BookingB2B") {
    const bookingb2b = await BookingB2B.create({
      status,
      handledBy,
      username: req.user.username,
      mobileNumber: mobileNumber ? mobileNumber : req.user.mobileNumber,
      destination,
      travelWith,
      departureStation,
      dateItenary,
      tourPlan,
      surveyId: `TO-${formattedDate}-${1705923 + allRequest.length + 2}`,
      category,
      planCategory,
      departureInDays,
      tourCost,
      queryFrom,
      travelType,
      state,
      city,
      noOfChild,
      noOfAdult,
      nearestBranch,
    });
    await bookingb2b.save();
  } else {
    const bookingb2c = await BookingB2C.create({
      status,
      handledBy,
      username: req.user.username,
      mobileNumber: mobileNumber ? mobileNumber : req.user.mobileNumber,
      destination,
      travelWith,
      departureStation,
      dateItenary,
      tourPlan,
      surveyId: `TO-${formattedDate}-${1705923 + allRequest.length + 2}`,
      category,
      planCategory,
      departureInDays,
      tourCost,
      queryFrom,
      travelType,
      state,
      city,
      noOfChild,
      noOfAdult,
      nearestBranch,
    });
    await bookingb2c.save();
  }
  await request.save();
  res.status(201).json(request);
};

// @desc    update request
// @route   POST /api/request/update/
// @access  private
// const updateRequest = async (req, res) => {
//   try {
//     const { surveyId } = req.body;
//     const request = await Request.findOne({ surveyId });

//     if (!request) {
//       return res.status(404).json({ error: "Request not found" });
//     }

//     // Update request details
//     Object.assign(request, req.body);
//     await request.save();

//     // Update BookingB2B or BookingB2C based on category
//     if (request.category === req.body.category) {
//       const bookingModel =
//         request.category === "BookingB2B" ? BookingB2B : BookingB2C;
//       const booking = await bookingModel.findOne({ surveyId });

//       if (booking) {
//         Object.assign(booking, req.body);
//         await booking.save();
//       }
//     } else {
//       if (req.body.category === "BookingB2B") {
//         const bookingb2b = await BookingB2B.create({
//           status: request.status,
//           handledBy: request.handledBy,
//           username: request.username,
//           mobileNumber: request.mobileNumber,
//           destination: request.destination,
//           travelWith: request.travelWith,
//           departureStation: request.departureStation,
//           dateItenary: request.dateItenary,
//           tourPlan: request.tourPlan,
//           surveyId: request.surveyId,
//           category: request.category,
//           planCategory: request.planCategory,
//           departureInDays: request.departureInDays,
//           tourCost: request.tourCost,
//           queryFrom: request.queryFrom,
//           travelType: request.travelType,
//           state: request.state,
//           city: request.city,
//           noOfChild: request.noOfChild,
//           noOfAdult: request.noOfAdult,
//           nearestBranch: request.nearestBranch,
//         });
//         await bookingb2b.save();
//         const deletedBookingB2C = await BookingB2C.findOneAndDelete({
//           surveyId,
//         });
//       } else {
//         const bookingb2c = await BookingB2C.create({
//           status: request.status,
//           handledBy: request.handledBy,
//           username: request.username,
//           mobileNumber: request.mobileNumber,
//           destination: request.destination,
//           travelWith: request.travelWith,
//           departureStation: request.departureStation,
//           dateItenary: request.dateItenary,
//           tourPlan: request.tourPlan,
//           surveyId: request.surveyId,
//           category: request.category,
//           planCategory: request.planCategory,
//           departureInDays: request.departureInDays,
//           tourCost: request.tourCost,
//           queryFrom: request.queryFrom,
//           travelType: request.travelType,
//           state: request.state,
//           city: request.city,
//           noOfChild: request.noOfChild,
//           noOfAdult: request.noOfAdult,
//           nearestBranch: request.nearestBranch,
//         });
//         await bookingb2c.save();
//         const deletedBookingB2B = await BookingB2B.findOneAndDelete({
//           surveyId,
//         });
//       }
//     }

//     res.status(201).json(request);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// @desc    update request
// @route   POST /api/request/update/
// @access  private
const updateRequest = async (req, res) => {
  try {
    const { surveyId } = req.body;
    const request = await Request.findOne({ surveyId });

    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    // Update BookingB2B or BookingB2C based on category
    if (request.category === req.body.category) {
      const bookingModel =
        request.category === "BookingB2B" ? BookingB2B : BookingB2C;
      const booking = await bookingModel.findOne({ surveyId });

      if (booking) {
        // Object.assign(booking, req.body);
        booking.status = req.body.status;
        booking.handledBy = req.body.handledBy;
        booking.username = req.body.username;
        booking.mobileNumber = req.body.mobileNumber;
        booking.destination = req.body.destination;
        booking.travelWith = req.body.travelWith;
        booking.departureStation = req.body.departureStation;
        booking.dateItenary = req.body.dateItenary;
        booking.tourPlan = req.body.tourPlan;
        booking.surveyId = request.surveyId;
        booking.category = req.body.category;
        booking.planCategory = req.body.planCategory;
        booking.departureInDays = req.body.departureInDays;
        booking.tourCost = req.body.tourCost;
        booking.queryFrom = req.body.queryFrom;
        booking.travelType = req.body.travelType;
        booking.state = req.body.state;
        booking.city = req.body.city;
        booking.noOfChild = req.body.noOfChild;
        booking.noOfAdult = req.body.noOfAdult;
        booking.nearestBranch = req.body.nearestBranch;

        await booking.save();
      }
    } else {
      if (req.body.category === "BookingB2B") {
        const oldDataBookingB2B = await BookingB2B.findOne({ surveyId });
        if (oldDataBookingB2B) {
          oldDataBookingB2B.status = req.body.status;
          oldDataBookingB2B.handledBy = req.body.handledBy;
          oldDataBookingB2B.username = req.body.username;
          oldDataBookingB2B.mobileNumber = req.body.mobileNumber;
          oldDataBookingB2B.destination = req.body.destination;
          oldDataBookingB2B.travelWith = req.body.travelWith;
          oldDataBookingB2B.departureStation = req.body.departureStation;
          oldDataBookingB2B.dateItenary = req.body.dateItenary;
          oldDataBookingB2B.tourPlan = req.body.tourPlan;
          oldDataBookingB2B.category = req.body.category;
          oldDataBookingB2B.planCategory = req.body.planCategory;
          oldDataBookingB2B.departureInDays = req.body.departureInDays;
          oldDataBookingB2B.tourCost = req.body.tourCost;
          oldDataBookingB2B.queryFrom = req.body.queryFrom;
          oldDataBookingB2B.travelType = req.body.travelType;
          oldDataBookingB2B.state = req.body.state;
          oldDataBookingB2B.city = req.body.city;
          oldDataBookingB2B.noOfChild = req.body.noOfChild;
          oldDataBookingB2B.noOfAdult = req.body.noOfAdult;
          oldDataBookingB2B.nearestBranch = req.body.nearestBranch;
          await oldDataBookingB2B.save();
        } else {
          const bookingB2B = await BookingB2B.create({
            // ... (copy fields from request to BookingB2B)
            status: request.status,
            handledBy: request.handledBy,
            username: request.username,
            mobileNumber: request.mobileNumber,
            destination: request.destination,
            travelWith: request.travelWith,
            departureStation: request.departureStation,
            dateItenary: request.dateItenary,
            tourPlan: request.tourPlan,
            surveyId: request.surveyId,
            category: request.category,
            planCategory: request.planCategory,
            departureInDays: request.departureInDays,
            tourCost: request.tourCost,
            queryFrom: request.queryFrom,
            travelType: request.travelType,
            state: request.state,
            city: request.city,
            noOfChild: request.noOfChild,
            noOfAdult: request.noOfAdult,
            nearestBranch: request.nearestBranch,
          });
          await bookingB2B.save();
        }

        // Try to delete BookingB2C
        await BookingB2C.findOneAndDelete({ surveyId });
      } else {
        const oldDataBookingB2C = await BookingB2C.findOne({ surveyId });
        if (oldDataBookingB2C) {
          oldDataBookingB2C.status = req.body.status;
          oldDataBookingB2C.handledBy = req.body.handledBy;
          oldDataBookingB2C.username = req.body.username;
          oldDataBookingB2C.mobileNumber = req.body.mobileNumber;
          oldDataBookingB2C.destination = req.body.destination;
          oldDataBookingB2C.travelWith = req.body.travelWith;
          oldDataBookingB2C.departureStation = req.body.departureStation;
          oldDataBookingB2C.dateItenary = req.body.dateItenary;
          oldDataBookingB2C.tourPlan = req.body.tourPlan;
          oldDataBookingB2C.category = req.body.category;
          oldDataBookingB2C.planCategory = req.body.planCategory;
          oldDataBookingB2C.departureInDays = req.body.departureInDays;
          oldDataBookingB2C.tourCost = req.body.tourCost;
          oldDataBookingB2C.queryFrom = req.body.queryFrom;
          oldDataBookingB2C.travelType = req.body.travelType;
          oldDataBookingB2C.state = req.body.state;
          oldDataBookingB2C.city = req.body.city;
          oldDataBookingB2C.noOfChild = req.body.noOfChild;
          oldDataBookingB2C.noOfAdult = req.body.noOfAdult;
          oldDataBookingB2C.nearestBranch = req.body.nearestBranch;
          await oldDataBookingB2C.save();
        } else {
          const bookingB2C = await BookingB2C.create({
            status: request.status,
            handledBy: request.handledBy,
            username: request.username,
            mobileNumber: request.mobileNumber,
            destination: request.destination,
            travelWith: request.travelWith,
            departureStation: request.departureStation,
            surveyId: request.surveyId,
            dateItenary: request.dateItenary,
            tourPlan: request.tourPlan,
            category: request.category,
            planCategory: request.planCategory,
            departureInDays: request.departureInDays,
            tourCost: request.tourCost,
            queryFrom: request.queryFrom,
            travelType: request.travelType,
            state: request.state,
            city: request.city,
            noOfChild: request.noOfChild,
            noOfAdult: request.noOfAdult,
            nearestBranch: request.nearestBranch,
          });
          await bookingB2C.save();
        }

        // Try to delete BookingB2B
        await BookingB2B.findOneAndDelete({ surveyId });
      }
    }

    Object.assign(request, req.body);
    await request.save();

    res.status(201).json(request);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    delete request
// @route   POST /api/request/delete/
// @access  private
const deleteRequest = async (req, res) => {
  try {
    const { surveyId } = req.body;
    const request = await Request.findOneAndDelete({ surveyId }); // Use findOneAndDelete to get the deleted document
    if (request) {
      if (request.category === "BookingB2B") {
        await BookingB2B.findOneAndDelete({ surveyId });
      } else {
        await BookingB2C.findOneAndDelete({ surveyId });
      }
      res.json({ message: "Request removed" });
    } else {
      res.status(404).json({ error: "Request not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// @desc    get upcoming trips
// @route   POST /api/request/upcomingtrips/
// @access  private
const getUpcomingTrip = async (req, res) => {
  try {
    const count = await Request.countDocuments({
      departureInDays: { $exists: true, $ne: null },
    });

    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// @desc    get upcoming trips by mobile
// @route   POST /api/request/upcomingtrips/mobile
// @access  private
const getUpcomingTripByMobile = async (req, res) => {
  try {
    const { mobileNumber } = req.query;

    if (!mobileNumber) {
      return res.status(400).json({ msg: "Mobile number is required" });
    }
    const count = await Request.countDocuments({
      mobileNumber: mobileNumber,
      departureInDays: { $exists: true, $ne: null },
    });

    res.json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// @desc    get current trips
// @route   POST /api/request/currenttrips/
// @access  private
const getCurrentTrip = async (req, res) => {
  try {
    // Find requests with status "On Progress"
    const onProgressCount = await Request.countDocuments({
      status: "On Progress",
    });

    // Respond with the count
    res.json({ onProgressCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// @desc    get current trips by mobile
// @route   POST /api/request/currenttrips/mobile
// @access  private
const getCurrentTripbyMobile = async (req, res) => {
  try {
    const { mobileNumber } = req.query;

    if (!mobileNumber) {
      return res.status(400).json({ msg: "Mobile number is required" });
    }
    // Find requests with status "On Progress"
    const onProgressCount = await Request.countDocuments({
      mobileNumber: mobileNumber,
      status: "On Progress",
    });

    // Respond with the count
    res.json({ onProgressCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// @desc    get Cancelled trips
// @route   POST /api/request/cancelledtrips/
// @access  private
const getCancelledTrip = async (req, res) => {
  try {
    const cancelledCount = await Request.countDocuments({
      status: "Cancelled",
    });

    // Respond with the count
    res.json({ cancelledCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// @desc    get Cancelled trips by mobile
// @route   POST /api/request/cancelledtrips/mobile
// @access  private
const getCancelledTripByMobile = async (req, res) => {
  try {
    const { mobileNumber } = req.query;

    if (!mobileNumber) {
      return res.status(400).json({ msg: "Mobile number is required" });
    }
    const cancelledCount = await Request.countDocuments({
      mobileNumber: mobileNumber,
      status: "Cancelled",
    });

    // Respond with the count
    res.json({ cancelledCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// @desc    get Completed trips
// @route   POST /api/request/completedtrips/
// @access  private
const getCompletedTrip = async (req, res) => {
  try {
    const completedCount = await Request.countDocuments({
      status: "Completed",
    });

    // Respond with the count
    res.json({ completedCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// @desc    get Completed trips
// @route   POST /api/request/completedtrips/mobile
// @access  private
const getCompletedTripByMobile = async (req, res) => {
  try {
    const { mobileNumber } = req.query;

    if (!mobileNumber) {
      return res.status(400).json({ msg: "Mobile number is required" });
    }

    const completedCount = await Request.countDocuments({
      mobileNumber: mobileNumber,
      status: "Completed",
    });

    res.json({ completedCount });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getRequest,
  getRequestbyID,
  getRequestByMobile,
  getRequestDetailByMobile,
  getRequestbySurveyId,
  addRequest,
  updateRequest,
  deleteRequest,
  getUpcomingTrip,
  getCurrentTrip,
  getCancelledTrip,
  getCompletedTrip,
  getUpcomingTripByMobile,
  getCurrentTripbyMobile,
  getCancelledTripByMobile,
  getCompletedTripByMobile,
};
