const middleware = require("../Middleware");
const userControllers = require("../controllers/userControllers");
// const user = require("../model/user");

const router = require("express").Router();

router.get("/", middleware.verifyToken, userControllers.getAllUsers);

router.delete(
  "/:id",
  middleware.verifyTokenAndAdmin,
  userControllers.deleteUser
);

module.exports = router;
