const express = require("express");
const router = express.Router();
const Vacancy = require("../models/vacancy");
// Vacancies route ------------------------
// Sample req.body
// {
//     "image": "https://example.com/vacancy-image.jpg",
//     "title": "Web Developer",
//     "deadline": "2022-08-01",
//     "requirements": "BS in Compatcher Science or related field, 2+ years of experience in software development, proficiency in Java and JavaScript",
//     "registerlink": "https://example.com/register"
// }
router.post("/create", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Failed to create vacancy",
      error: "No data in the req.body",
    });
  }

  try {
    const newVacancy = new Vacancy({
      image: req.body.img,
      title: req.body.title,
      deadline: req.body.deadline,
      requirements: req.body.requirements,
      registerlink: req.body.registerlink,
    });

    await newVacancy.save();

    res.status(201).json({ message: "Vacancy created successfully" });
  } catch (err) {
    res.status(400).json({ message: "Failed to create vacancy", error: err });
  }
});

router.patch("/update/:id", async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Failed to update vacancy",
      error: "No data in the req.body",
    });
  }
  try {
    const newVacancy = {
      image: req.body.img,
      title: req.body.title,
      deadline: req.body.deadline,
      requirements: req.body.requirements,
      registerlink: req.body.registerlink,
    };
    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      req.params.id,
      newVacancy,
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Vacancy updated successfully", updatedVacancy });
  } catch (err) {
    res.status(404).json({ message: "Vacancy not found", error: err });
  }
});

router.get("/all", async (req, res) => {
  try {
    const vacancies = await Vacancy.find();
    const total = await Vacancy.count({});
    res.status(200).json({ vacancies: vacancies, total: total });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving vacancies", error: err });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deletedVacancy = await Vacancy.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Vacancy deleted successfully",
      deletedVacancy: deletedVacancy,
    });
  } catch (err) {
    res.status(404).json({ message: "Vacancy not found", error: err });
  }
});

module.exports = router;
