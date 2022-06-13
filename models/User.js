const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

	//  user id, meron na agad...
  first_name: {
    type: String,
  },
  middle_name: {
    type: Number,
  },
  last_name: {
    type: String,
  },
  sex: {
    type: String,
  },
  birthday: {
	//    !check kung gagana, or baka string nalang kaya?
    type: Date,
  },
  contact: {
    type: String,
  },
  type: {
    type: string,
  },
  email: {
    type: string,
  },
  password: {
    type: string,
  },
  is_archived: {
    type: Boolean,
	default:false,
  },
  is_admin: {
    type: string,
	default:false,
  },
  date_added: {
    type: Date,
  },

});

// ! Ito yung collection name, First param
const User = mongoose.model("User", UserSchema);

module.exports = User;