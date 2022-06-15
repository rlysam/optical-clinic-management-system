const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

const attendantRouter = require("./routes/attendantRouters.js");
const itemRouter = require("./routes/itemRouters.js");
const userRouter = require("./routes/userRouters.js");

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
app.use("/api/",userRouter);
app.use("/api/",attendantRouter);
app.use("/api/",itemRouter);

app.listen(port, () => {
  console.log("Beep.. Boop.. Server is running...");
});