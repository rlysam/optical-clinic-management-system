const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({

  //  user id, meron na agad...
  attendant_id: {
    type: String,
	required: true
  },
  user_id: {
    type: String
  },
  reason_for_visit: {
    type: String
  },
  first_name: {
    type: String,
	required: true
  },
  middle_name: {
    type: String,
  },
  last_name: {
    type: String,
	required: true
  },
  suffix: {
    type: String,
    default: ""
  },
  sex: {
    type: String,
  },
  birthday: {
	//    !check kung gagana, or baka string nalang kaya?
    type: Date,
  },
  address: {
    type: String,
	required: true
  },
  contact: {
    type: String,
	required: true
  },
  email: {
    type: String,
  },
  last_eye_exam: {
    type: Date,
  },
  last_eye_grade: {
    type: String,
  },
  is_first_time: {
    type: Boolean
  },
  date_added: {
    type: Date,
  },

});

// ! Ito yung collection name, First param
const Appointment = mongoose.model("Appointment", AppointmentSchema);

module.exports = Appointment;