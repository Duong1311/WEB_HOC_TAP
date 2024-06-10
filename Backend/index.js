const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./utils/connectDb");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
const openaiRoutes = require("./routes/openAi");
const errorHandlingMiddleware = require("./middleware/errorHandlingMiddleware");
const loginWithGoogle = require("./controllers/authGoogleControllers");
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

//routes
connectDB();
loginWithGoogle();
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/openai", openaiRoutes);

// xu ly loi tap trung
app.use(errorHandlingMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
