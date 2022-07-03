const mongoose = require("mongoose");

const PHSchema = new mongoose.Schema({

  user_id: {
    type: String,
  },
  item_id: {
    type: String,
  },
  date: {
    type: Date,
  },
  item_img: {
    type: String,
  },
  price: {
    type: Number,
  },
  payment_type: {
    type: Number,
  },
  status: {
    type: Number,
  },
  date_added: {
    type: Date,
  },
});

// ! Ito yung collection name, First param
const Purchase_History = mongoose.model("Purchase_History", PHSchema);

module.exports = Purchase_History;