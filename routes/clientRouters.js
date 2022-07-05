const express = require("express");
const ProductModel = require("../models/Product")
const CustomerModel = require("../models/Customer")
const AppointmentModel = require("../models/Appointment");
const PurchaseHistoryModel = require("../models/Purchase_History");
const EyeHistoryModel = require("../models/Eye_History");
const CartModel = require("../models/Cart");
const mongoose = require('mongoose');
const router = express.Router();

// READ
router.get("/home", async (request, response) => {
  const products = await ProductModel.find({});
  const {session} = request;
  try {
    response.render("client/home.ejs", {products, session});
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/products", async (request, response) => {
  const products = await ProductModel.find({});
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    response.render("client/products/all-products.ejs", {products, session, user});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/product/:id", async (request, response) => {
  const product = await ProductModel.findById(request.params.id);
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    response.render("client/products/product-details.ejs", {product, user, session});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/cart", async (request, response) => {
  const {session} = request;
  const cart = await CartModel.find({user_id: session.user_id});
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  console.log(cart);
  try {
    response.render("client/products/cart.ejs", {user, session, cart} );
  } catch (error) {
    response.status(500).send(error);
  }

});

router.post("/product/add-to-cart/:id", async (request, response) => {
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  const cart = new CartModel(request.body);
  try {
    await cart.save();
    response.redirect("/cart");
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
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    response.render("client/appointment.ejs", {user, session});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.post("/set-appointment", async (request, response) => {
  const appointment = new AppointmentModel(request.body);
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    await appointment.save();
    response.redirect("/account-history");
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/faqs", async (request, response) => {
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    response.render("client/faqs.ejs", {user, session});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/profile", async (request, response) => {
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  try {
    response.render("client/profile/user-profile.ejs", {user, session});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/account-settings", async (request, response) => {
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);

  console.log(user);
  try {
    response.render("client/profile/account-settings.ejs", {user, session});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/account-history", async (request, response) => {
  const {session} = request;
  const id = mongoose.Types.ObjectId(session.user_id)
  const user = await CustomerModel.findById(id);
  const appointments = await AppointmentModel.find({user_id: session.user_id});
  const eyeHistory = await EyeHistoryModel.find({user_id: session.user_id});
  try {
    response.render("client/profile/history.ejs", {user, session, appointments, eyeHistory});
  } catch (error) {
    response.status(500).send(error);
  }

});

router.get("/signout", async (request, response) => {

  request.session.loggedin = false;
  try {
    response.redirect("/signin");
  } catch (error) {
    response.status(500).send(error);
  }

});

// SIGN IN
router.post("/signin", async (request, response) => {
  const customer = await CustomerModel.findOne({email: request.body.email, password: request.body.password})

  try {
    if(customer) {
      request.session.user_id = customer._id;
      request.session.loggedin = true;
      response.redirect("/home");
    }
    else {
      response.redirect("/signin");
    } 
  } catch (error) {
    response.status(500).send(error);
  }

});

//REGISTER
router.post("/register", async (request, response) => {
  const customer = new CustomerModel(request.body);

  try {
    await customer.save();
    response.redirect("/signin");
  } catch (error) {
    response.status(500).send(error);
  }

});

//EDIT USER
router.patch("/profile/:id", async (request, response) => {
  await CustomerModel.findByIdAndUpdate(request.params.id, request.body);

  try {
    response.redirect("/profile");
  } catch (error) {
    response.status(500).send(error);
  }

});

// ! ---------------
module.exports = router;