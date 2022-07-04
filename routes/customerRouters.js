const express = require("express");
const CustomerModel = require("../models/Customer");
const PurchaseHistoryModel = require("../models/Purchase_History");
const EyeHistoryModel = require("../models/Eye_History");
const AttendantModel = require("../models/Attendant");
const router = express.Router();

// READ
router.get("/customer/:id", async (request, response) => {
  const customer = await CustomerModel.findOne({_id: request.params.id});
  const purchaseHistories = await PurchaseHistoryModel.find({user_id: request.params.id});
  const eyeHistory = await EyeHistoryModel.find({user_id: request.params.id});
  const attendants = await AttendantModel.find({});

  try {
    for(let history of eyeHistory) {
      let attendant = await AttendantModel.findById(history.attendant_id);
      history.attendant_name = attendant.first_name + " " + attendant.middle_name + " " + attendant.last_name;
    }

    response.render("admin/customers/view-customer.ejs", {customer, purchaseHistories, eyeHistory, attendants});

  } catch(error) {
    response.status(500).send(error);
  }
});

router.get("/customers", async (request, response) => {
  const customers = await CustomerModel.find({});
  try {
    response.render("admin/customers/customers.ejs", {customers});
  } catch (error) {
    response.status(500).send(error);
  }
});

// CREATE
router.post("/customer", async (request, response) => {
  const customer = new CustomerModel(request.body);

  try {
    await customer.save();
    response.redirect("customers");
  } catch (error) {
    response.status(500).send(error);
  }
});

// UPDATE
router.patch("/customer/:id", async (request, response) => {
  try {
    await CustomerModel.findByIdAndUpdate(request.params.id, request.body);
    response.redirect("/api/customers/" + request.params.id);

  } catch (error) {
    response.status(500).send(error);
  }
});

// DELETE
router.delete("/customer/:id", async (request, response) => {
  try {
    const customer = await CustomerModel.findByIdAndDelete(request.params.id);

    if (!customer) response.status(404).send("No item found");
    response.status(200).send();
  } catch (error) {
    response.status(500).send(error);
  }
});

// ! ---------------
module.exports = router;