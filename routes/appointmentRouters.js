const express = require("express");
const AppointmentModel = require("../models/Appointment");
const router = express.Router();

// READ
router.get("/appointments", async (request, response) => {
  const appointments = await AppointmentModel.find({});

  try {
    response.render("admin/appointment/appointment.ejs", {appointments});
  } catch (error) {
    response.status(500).send(error);
  }
});

// CREATE
router.post("/appointment", async (request, response) => {
  const appointment = new AppointmentModel(request.body);

  try {
    await appointment.save();
    response.send(appointment);
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE
router.patch("/appointment/:id", async (request, response) => {
  try {
    await AppointmentModel.findByIdAndUpdate(request.params.id, request.body);
    await AppointmentModel.save();
    response.send(appointment);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
router.delete("/appointment/:id", async (request, response) => {
  try {
    const appointment = await AppointmentModel.findByIdAndDelete(request.params.id);

    if (!appointment) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;