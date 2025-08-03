const express = require("express");
const UserService = require("./services/user.service");
const ErrorHandler = require("./middleware/error.middleware");

const router = express.Router();
const userService = new UserService();

router.get("/user/:id", ErrorHandler.asyncWrapper(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(user);
}));

router.put("/user/:id", ErrorHandler.asyncWrapper(async (req, res) => {
  await userService.updateUser(req.params.id, req.body);
  res.json({ message: "User updated successfully" });
}));

router.post("/user/change-password", ErrorHandler.asyncWrapper(async (req, res) => {
  await userService.changePassword(req.body);
  res.json({ message: "Password changed successfully" });
}));

router.use(ErrorHandler.handle);

module.exports = router;

