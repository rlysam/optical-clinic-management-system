const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({

  name: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: URL,
  },
  stock: {
    type: Number,
  },
  price: {
    type: Number,
  },

  is_archived: {
    type: Boolean,
	default:false,
  },
  date_added: {
    type: Date,
  },
});

// ! Ito yung collection name, First param
const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;