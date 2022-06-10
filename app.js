const express = require("express");
const path = require("path");
const connectDB = require("./DB/connection");
const { userRouter, messageRouter, authRouter } = require("./modules/index.router");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());

port = process.env.PORT;

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use(authRouter, userRouter, messageRouter);

connectDB();
app.listen(port, () => {
  console.log(`running on port.....${port}`);
});
