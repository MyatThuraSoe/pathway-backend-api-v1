const express = require("express");
const router = express.Router();

//get all API funcationalities
const {
  postVolunteer,
  updateVolunteer,
  getAllVolunteer,
  getSingleVolunteer,
  deleteVolunteer,
} = require("../controllers/volunteerApi");

router.route("/create").post(postVolunteer);
router.route("/all").get(getAllVolunteer);

router.route("/:id").get(getSingleVolunteer);
router.route("/update/:id").patch(updateVolunteer);
router.route("/delete/:id").delete(deleteVolunteer);

module.exports = router;
