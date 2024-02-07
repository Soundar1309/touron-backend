const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
app.use(cors());
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
app.use("/api/itinery", require("./routes/itineryRoutes"));
app.use("/api/itinerydetails", require("./routes/itineryDetailsRoutes"))
app.use("/api/domesticstate", require("./routes//domesticStateRoutes"))
app.use("/api/domesticcity", require("./routes/domesticCityRoutes"))
app.use("/api/country", require("./routes/countryRoutes"))
app.use("/api/internationalcity", require("./routes/internationalCityRoutes"))
app.use("/api/request", require("./routes/requestRoutes"))
app.use("/api/bookingb2b", require("./routes/bookingb2bRoutes"))
app.use("/api/bookingb2c", require("./routes/bookingb2cRoutes"))
app.use("/api/todo", require("./routes/todoRoutes"))

app.get('/', (req, res) => {
  res.json('Hello backend!')
})

app.listen(process.env.PORT || 443, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
