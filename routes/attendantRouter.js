const express = require("express");
const attendantModel = require("../models/Attendant");
const app = express();

// READ
app.get("/attendants", async (request, response) => {
  const attendants = await attendantModel.find({});

  try {
    response.send(attendants);
  } catch (error) {
    response.status(500).send(error);
  }
});

// CREATE
app.post("/attendant", async (request, response) => {
  const attendant = new attendantModel(request.body);

  try {
    await attendant.save();
    response.send(attendant);
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE
app.patch("/attendant/:id", async (request, response) => {
  try {
    await attendantModel.findByIdAndUpdate(request.params.id, request.body);
    await attendantModel.save();
    response.send(attendant);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
app.delete("/attendant/:id", async (request, response) => {
  try {
    const attendant = await attendantModel.findByIdAndDelete(request.params.id);

    if (!attendant) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = app;