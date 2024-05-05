const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");
// const bodyParser = require("body-parser");
const app = express();
const port = 3000;

dotenv.config();

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use("*", cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => console.log(err));

//routes

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);

// xu ly loi tap trung
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
