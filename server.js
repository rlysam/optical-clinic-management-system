const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouters.js");

const app = express();

app.use(express.json());

mongoose.connect(
	// yung database name after ng "... .net/"
  "mongodb+srv://sam123:sam123@cluster0.fpb7h.mongodb.net/eye_management_system?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

// ! dagdag sa router
// * example ni ernst ay create blog 
// ex. /sample+"/router_method_name"
// * do this after testing w frontend
// app.use("/sample",userRouter);
app.use(userRouter);

app.listen(3000, () => {
  console.log("Beep.. Boop.. Server is running...");
});