const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const corsObj = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200,
};
//using the cors obj

const app = express();
app.use(cors(corsObj));
connectDB();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

// Routes
app.use("/api/login", require("./routes/loginRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/teammembers", require("./routes/teamMembersRoutes"));
app.use("/api/testimonials", require("./routes/testimonialsRoutes"));
app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/vendor", require("./routes/vendorRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/particular", require("./routes/particularRoutes"));
app.use("/api/itinerary", require("./routes/ItineraryRoutes"));
app.use("/api/domesticstate", require("./routes//domesticStateRoutes"));
app.use("/api/domesticcity", require("./routes/domesticCityRoutes"));
app.use("/api/country", require("./routes/countryRoutes"));
app.use("/api/internationalcity", require("./routes/internationalCityRoutes"));
app.use("/api/request", require("./routes/requestRoutes"));
app.use("/api/bookingb2b", require("./routes/bookingb2bRoutes"));
app.use("/api/bookingb2c", require("./routes/bookingb2cRoutes"));
app.use("/api/todo", require("./routes/todoRoutes"));
app.use("/api/destination", require("./routes/destinationRoutes"));

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
