const jwt = require("jsonwebtoken");
const User = require("../models/loginModel");
var https = require("follow-redirects").https;
var fs = require("fs");
const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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
    res.status(500);
    throw new Error("Please add mobile number");
  }

  if (!email) {
    res.status(500);
    throw new Error("Please add email");
  }

  // Checking for existing user
  const user = await User.findOne({ $or: [{ mobileNumber }, { email }] });
  if (user && user.mobileNumber == mobileNumber && user.email == email) {
    res.json(GenerateUserInfo(user), 200);
  } else if (
    user &&
    (user.mobileNumber !== mobileNumber || user.email !== email)
  ) {
    res.status(500).json({
      message: "Email already associated different mobile number.",
    });
  } else {
    if (!username || username === "") {
      res.status(500).json({
        message: "Please enter your name",
      });
    }

    if (!email || email === "") {
      res.status(500).json({
        message: "Please enter your email",
      });
    }

    // Creating User
    const user = await User.create({
      username: username,
      mobileNumber: mobileNumber,
      email: email,
    });

    if (user) {
      res.status(201).json(GenerateUserInfo(user));
    } else {
      res.status(500);
      throw new Error("Invalid user data");
    }
  }
};

const GenerateUserInfo = (user) => {
  if (!user) return {};

  return (
    {
      _id: user.id,
      username: user.username,
      mobileNumber: user.mobileNumber,
      email: user.email,
      token: generateToken(user._id),
      admin:
        user.mobileNumber == "+918667801206" ||
          user.mobileNumber == "+919123571239" ||
          user.mobileNumber == "8667801206" ||
          user.mobileNumber == "9123571239"
          ? user.mobileNumber
          : "",
    }
  );
};

// @desc    Verify Token
// @route   GET /api/login/getuser
// @access  public

const verifyToken = async (req, res) => {
  const { id_token, mobileNumber, email } = req.body;
  try {
    const decodedToken = await admin.auth().verifyIdToken(id_token);

    let user;
    if (email) {
      if (!decodedToken || decodedToken?.email !== email) {
        res.status(500).json({ message: `Invalid Token` });
      }

      user = await User.findOne({ email: email });
    }

    if (mobileNumber) {
      if (!decodedToken || decodedToken?.phone_number !== mobileNumber) {
        res.status(500).json({ message: `Invalid Token` });
      }

      user = await User.findOne({ mobileNumber: mobileNumber });
    }

    if (user) {
      res.status(200).json({
        message: "User Exists and Verified Successfully",
        existingUser: true,
        ...GenerateUserInfo(user),
      });
    } else {
      res.status(200).json({
        message: "User Does Not Exists and Verified Successfully",
        existingUser: false,
      });
    }
  } catch (error) {
    res.status(500).json({ message: `Error verifying ID token: ${error}` });
  }
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
    expiresIn: "2d",
  });
};

module.exports = {
  getUser,
  getUserById,
  loginUser,
  verifyToken,
  deleteUser,
  updateUserById,
};
