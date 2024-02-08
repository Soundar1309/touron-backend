const Particular = require("../models/particularModel");

// @desc    get all particular in ascending order
// @route   GET /api/particular/
// @access  public
const getParticularByAscending = async (req, res) => {
  const particular = await Particular.find({}).sort({ createdAt: -1 });
  res.json(particular);
};

// @desc    get particular by id
// @route   GET /api/particular/:id
// @access  public
const getParticularbyID = async (req, res) => {
  const particular = await Particular.findById(req.params.id);
  if (particular) {
    res.json(particular);
  } else {
    res.status(404);
    throw new Error("particular not found");
  }
};

// @desc    add particular
// @route   POST /api/particular/addparticular
// @access  private
const addParticular = async (req, res) => {
  const { name } = req.body;

  const particular = await Particular.create({
    name,
  });
  await particular.save();
  res.status(201).json(particular);
};

// @desc    update particular
// @route   POST /api/particular/updateparticular/:id
// @access  private
const updateParticular = async (req, res) => {
  try {
    const { name } = req.body;
    const particular = await Particular.findById(req.params.id);
    particular.name = name;
    await particular.save();
    res.status(201).json(particular);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete particular
// @route   POST /api/particular/deleteparticular
// @access  private
const deleteParticular = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedparticular = await Particular.findByIdAndDelete(id);
    res.status(200).json({ message: "particular deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getParticularByAscending,
  getParticularbyID,
  addParticular,
  updateParticular,
  deleteParticular,
};
