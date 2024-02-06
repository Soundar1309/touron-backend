const State = require("../models/domesticStateModel");

// @desc    get all domesticstate in ascending order
// @route   GET /api/domesticstate/
// @access  public
const getStateByAscending = async (req, res) => {
  const state = await State.find({}).sort({ createdAt: -1 });
  res.json(state);
};

// @desc    get all domesticstate in ascending order by stateName
// @route   GET /api/domesticstate/stateName
// @access  public
const getStateByAscendingInState = async (req, res) => {
  const state = await State.find({}).sort({ stateName: 1 })
  res.json(state);
};

// @desc    get domesticstate by id
// @route   GET /api/domesticstate/:id
// @access  public
const getStatebyID = async (req, res) => {
  const state = await State.findById(req.params.id);
  if (state) {
    res.json(state);
  } else {
    res.status(404);
    throw new Error("State not found");
  }
};

// @desc    add domesticstate
// @route   POST /api/domesticstate/add
// @access  private
const addState = async (req, res) => {
  const { stateName, aboutState, imageUrl, bestPlaces, bestTimeToVisit } =
    req.body;

  const state = await State.create({
    stateName,
    aboutState,
    imageUrl,
    bestPlaces,
    bestTimeToVisit,
  });
  await state.save();
  res.status(201).json(state);
};

// @desc    update domesticstate
// @route   POST /api/domesticstate/update/:id
// @access  private
const updateState = async (req, res) => {
  try {
    const { stateName, aboutState, imageUrl, bestPlaces, bestTimeToVisit } = req.body;
    const state = await State.findById(req.params.id);
    state.stateName = stateName;
    state.aboutState = aboutState;
    state.imageUrl = imageUrl;
    state.bestPlaces = bestPlaces;
    state.bestTimeToVisit = bestTimeToVisit;
    await state.save();
    res.status(201).json(state);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    delete domesticstate
// @route   POST /api/domesticstate/delete
// @access  private
const deleteState = async (req, res) => {
  const { id } = req.body;
  try {
    const deletedCity = await State.findByIdAndDelete(id);
    res.status(200).json({ message: "State deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getStateByAscending,
  getStateByAscendingInState,
  getStatebyID,
  addState,
  updateState,
  deleteState,
};
