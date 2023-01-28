const Volunteer = require("../models/volunteer");
const { StatusCodes } = require("http-status-codes");

//get all volunteer
const getAllVolunteer = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const volunteers = await Volunteer.find()
    .skip(skip)
    .limit(limit)
    .clone()
    .catch((error) => {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    });

  //get total count of volunteers from db
  const totalVolunteers = await Volunteer.countDocuments({});

  res
    .status(StatusCodes.OK)
    .json({ result: volunteers, total: totalVolunteers });
};

//get single volunteer
const getSingleVolunteer = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorMsg: "id query not found" });
  }
  const volunteer = await Volunteer.findById(id)
    .clone()
    .catch((error) => {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    });
  res.status(StatusCodes.OK).json({ result: volunteer });
};

//post new volunteer
const postVolunteer = async (req, res) => {
  await Volunteer.create(req.body, (error, { result }) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errorMsg: error });
  });
  res
    .status(StatusCodes.CREATED)
    .json({ successMsg: "new volunteer has been posted." });
};

//update single volunteer with id parameter
const updateVolunteer = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorMsg: "id query not found" });
  }
  const result = await Volunteer.findOneAndUpdate(id, req.body)
    .clone()
    .catch(function (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    });
  res.status(StatusCodes.OK).json({ result: result });
};

//delete single volunteer with id path parameter
const deleteVolunteer = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errorMsg: "id query not found" });
  }

  const result = await Volunteer.findByIdAndDelete(id)
    .clone()
    .catch(function (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
    });

  res.status(StatusCodes.OK).json({ result: result });
};

module.exports = {
  postVolunteer,
  updateVolunteer,
  getAllVolunteer,
  getSingleVolunteer,
  deleteVolunteer,
};
