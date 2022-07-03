const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({

  user_id: {
    type: String,
  },
  item_id: {
    type: String,
  },
  qty: {
    type: Number,
  },
  lens_type: {
    type: Number,
  },
});

// ! Ito yung collection name, First param
const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;