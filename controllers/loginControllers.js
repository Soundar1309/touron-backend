const jwt = require("jsonwebtoken");
const User = require("../models/loginModel");
var https = require("follow-redirects").https;
var fs = require("fs");

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifySid = process.env.VERIFYSID;
const client = require("twilio")(accountSid, authToken);

// @desc    get users
// @route   GET /api/login/getuser
// @access  public
const getUser = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.json(users);
};

// @desc    get user by id
// @route   GET /api/login/:id
// @access  public
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("user not found");
  }
};

// @desc    update user by id
// @route   GET /api/login/update/:id
// @access  public
const updateUserById = async (req, res) => {
  const { username, mobileNumber, email } = req.body;
  console.log(req.body);
  console.log(req.params.id);
  const user = await User.findById(req.params.id);
  user.username = username;
  user.mobileNumber = mobileNumber;
  user.email = email;
  const updatedUser = await user.save();
  req.user = updatedUser;
  res.json(updatedUser);
};

// @desc    post users
// @route   POST /api/login/
// @access  public
const loginUser = async (req, res) => {
  const { username, mobileNumber, email } = req.body;
  if (!mobileNumber) {
    res.status(400);
    throw new Error("Please add mobile number");
  }

  // Checking for existing user
  const user = await User.findOne({ mobileNumber });
  if (user) {
    if (user.mobileNumber == "9047514717") {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        mobileNumber: user.mobileNumber,
        email: user.email,
        token: generateToken(user._id),
        admin: user.mobileNumber,
        message: "old user",
      });
    } else {
      res.status(201).json({
        _id: user.id,
        username: user.username,
        mobileNumber: user.mobileNumber,
        email: user.email,
        token: generateToken(user._id),
        admin: "no",
        message: "old user",
      });
    }
    req.user = user;
  } else {
    if (!username || username === "") {
      res.status(201).json({
        message: "add user",
      });
    } else {
      // Creating User
      const user = await User.create({
        username: username,
        mobileNumber: mobileNumber,
        email: email,
      });
      if (user) {
        if (user.mobileNumber == "9047514717") {
          res.status(201).json({
            _id: user.id,
            username: user.userName,
            mobileNumber: user.mobileNumber,
            email: user.email,
            token: generateToken(user._id),
            admin: user.mobileNumber,
            message: "new user",
          });
        } else {
          res.status(201).json({
            _id: user.id,
            username: user.username,
            mobileNumber: user.mobileNumber,
            email: user.email,
            token: generateToken(user._id),
            admin: "no",
            message: "old user",
          });
        }
        req.user = user;
      } else {
        res.status(400);
        throw new Error("Invalid user data");
      }
    }
  }
};

// @desc    send otp user
// @route   POST /api/login/send-otp
// @access  private
const sendOTP = async (request, response) => {
  try {
    const mobileNumber = request.body.mobileNumber;

    var options = {
      method: "GET",
      hostname: "2factor.in",
      path: `/API/V1/8697a4f2-e821-11ea-9fa5-0200cd936042/SMS/+91${mobileNumber}/AUTOGEN/OTP1`,
      headers: {},
      maxRedirects: 20,
    };

    var req = https.request(options, function (res) {
      var chunks = [];

      res.on("data", function (chunk) {
        chunks.push(chunk);
      });

      res.on("end", function (chunk) {
        var body = Buffer.concat(chunks);
        console.log(body.toString());
        response.json({
          success: true,
          message: "OTP sent successfully",
        });
      });

      res.on("error", function (error) {
        console.error(error);
      });
    });

    req.end();

    // const otp = Math.floor(100000 + Math.random() * 900000);

    // client.verify.v2
    //   .services(verifySid)
    //   .verifications.create({ to: `+91${mobileNumber}`, channel: "sms" })
    //   .then((verification) => {
    //     console.log(verification.status);
    //     res.json({
    //       success: true,
    //       message: "OTP sent successfully",
    //       otp: verification.status,
    //     });
    //   });
    // .then(() => {
    //
    // });
  } catch (error) {
    console.error("Error sending OTP:", error);
    response
      .status(500)
      .json({ success: false, message: "Failed to send OTP." });
  }
};

// @desc    verify otp user
// @route   POST /api/login/verify-otp
// @access  private
const verifyOTP = async (request, response) => {
  const { otp, mobileNumber } = request.body;
  console.log(otp);

  var options = {
    method: "GET",
    hostname: "2factor.in",
    path: `/API/V1/8697a4f2-e821-11ea-9fa5-0200cd936042/SMS/VERIFY3/91${mobileNumber}/${otp}`,
    headers: {},
    maxRedirects: 20,
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
      const body1 = JSON.parse(body);
      if (body1.Details === "OTP Matched") {
        response.json({
          success: true,
          message: "OTP verified",
          otp: otp,
        });
      }
    });

    res.on("error", function (error) {
      console.error(error);
    });
  });

  req.end();

  // client.verify.v2
  //   .services(verifySid)
  //   .verificationChecks.create({
  //     to: `+91${mobileNumber}`,
  //     code: otp,
  //   })
  //   .then((verification_check) => {
  //     res.json({
  //       success: true,
  //       message: "OTP verified",
  //       otp: otp,
  //     });
  //     console.log(verification_check.status);
  //   });
  // .then(() => readline.close());
};

// @desc    delete user
// @route   POST /api/login/delete
// @access  private
const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
};

module.exports = {
  getUser,
  getUserById,
  loginUser,
  sendOTP,
  verifyOTP,
  deleteUser,
  updateUserById,
};
