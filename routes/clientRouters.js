const express = require("express");
const ProductModel = require("../models/Product")
const CustomerModel = require("../models/Customer")
const router = express.Router();

// READ
router.get("/home", async (request, response) => {
  const products = await ProductModel.find({});

  try {
    response.render("client/home.ejs", {products});
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/products", async (request, response) => {
  const products = await ProductModel.find({});

  try {
    response.render("client/products/all-products.ejs", {products});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/product/:id", async (request, response) => {
  const product = await ProductModel.findById(request.params.id);

  try {
    response.render("client/products/product-details.ejs", {product});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/signin", async (request, response) => {

  try {
    response.render("client/sign-in.ejs");
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/register", async (request, response) => {

  try {
    response.render("client/register.ejs");
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/set-appointment", async (request, response) => {

  try {
    response.render("client/appointment.ejs");
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/faqs", async (request, response) => {

  try {
    response.render("client/faqs.ejs");
  } catch (error) {
    response.status(500).send(error);
  }

});

router.post("/register", async (request, response) => {
  const customer = new CustomerModel(request.body);

  try {
    await customer.save();
    response.redirect("/signin");
  } catch (error) {
    response.status(500).send(error);
  }

});

// ! ---------------
module.exports = router;