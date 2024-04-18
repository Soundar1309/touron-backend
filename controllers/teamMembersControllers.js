const Team = require("../models/teamMembersModel");
const cloudinary = require("../config/cloudinary");

// @desc    get teammembers
// @route   GET /api/teammembers/
// @access  private
const getTeamMembers = async (req, res) => {
  try {
    const team = await Team.find({}).sort({ createdAt: -1 });
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    get team by id
// @route   GET /api/teammembers/:id
// @access  private
const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    add team
// @route   POST /api/teamembers/add
// @access  private
const addTeam = async (req, res) => {
  try {
    const { name, designation } = req.body;
    const imageResult = await cloudinary.uploader.upload(req.body.image, {
      folder: "teams",
    });
    const team = new Team({
      name,
      designation,
      image: {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      },
    });
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    update team
// @route   POST /api/teammembers/update/:id
// @access  private
const updateTeam = async (req, res) => {
  try {
    const { name, designation } = req.body;
    const team = await Team.findById(req.params.id);
    team.name = name;
    team.designation = designation;
    if (req.body.image) {
      const imageResult = await cloudinary.uploader.upload(req.body.image, {
        folder: "teams",
      });
      team.image = {
        public_id: imageResult.public_id,
        url: imageResult.secure_url,
      };
    } else {
      team.image = team.image;
    }
    await team.save();
    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete team
// @route   POST /api/teammembers/delete
// @access  private
const deleteTeam = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedTeam = await Team.findByIdAndDelete(id);
    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getTeamMembers,
  getTeamById,
  addTeam,
  updateTeam,
  deleteTeam,
};
