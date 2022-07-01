const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

const attendantRouter = require(path.join(__dirname, "./routes/attendantRouters.js"));
const itemRouter = require(path.join(__dirname, "./routes/itemRouters.js"));
const userRouter = require(path.join(__dirname, "./routes/userRouters.js"));
const appointmentRouter = require(path.join(__dirname, "./routes/appointmentRouters.js"));
const cartRouter = require(path.join(__dirname, "./routes/cartRouters.js"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

mongoose.connect(
	// yung database name after ng "... .net/"
  "mongodb+srv://sam123:sam123@cluster0.fpb7h.mongodb.net/eye_management_system?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
)

// ! dagdag sa router
// * example ni ernst ay create blog 
// ex. /sample+"/router_method_name"
// * do this after testing w frontend
// app.use("/sample",userRouter);
app.use("/api/",attendantRouter);
app.use("/api/",itemRouter);
app.use("/api/", userRouter);
app.use("/api/", appointmentRouter);
app.use("/api/", cartRouter);

app.use(express.json());
// app.use(express.static(path.join(__dirname), "/assets"));

app.listen(port, () => {
  console.log("Beep.. Boop.. Server is running...");
});