const express = require("express");
const PhModel = require("../models/Purchase_History");
const router = express.Router();

// READ
router.get("/purchase_histories", async (request, response) => {
  const purchase_histories = await PhModel.find({});

  try {
    response.send(purchase_histories);
  } catch (error) {
    response.status(500).send(error);
  }
});

// CREATE
router.post("/purchase_history", async (request, response) => {
  const purchase_history = new PhModel(request.body);

  try {
    await purchase_history.save();
    response.send(purchase_history);
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE
router.patch("/purchase_history/:id", async (request, response) => {
  try {
    await PhModel.findByIdAndUpdate(request.params.id, request.body);
    await PhModel.save();
    response.send(purchase_history);
  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
router.delete("/purchase_history/:id", async (request, response) => {
  try {
    const purchase_history = await PhModel.findByIdAndDelete(request.params.id);

    if (!purchase_history) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;