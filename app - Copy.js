require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");

const app = express();
const connectDB = require("./db/connect");

const Event = require("./models/event");
const Proofreader = require("./models/proofreader");
const User = require("./models/user");
const ConsultingSession = require("./models/consultingsession");
const ConsultingAppointment = require("./models/consultantAppoinment");
const Vacancy = require("./models/vacancy");
const Volunteer = require("./models/volunteer");

app.use(express.json());
app.use(cors());
app.use(cookies());

const PORT = process.env.PORT || 5050;

const strater = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening to port number ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

strater();
