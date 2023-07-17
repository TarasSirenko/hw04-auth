const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { userInfoValidation, } = require('../../middlewares/validationMiddleware')
const { authMiddleware } = require("../../middlewares/authMiddleware");

const {
  createUserController,
  updateUserStatusController,
  loginUserController,
  logoutUsertController,
  getCurrentUserController,
  getUserController,
  userVerificationCheckController,
  reVerificationController,
} = require("../../controllers/usersController");

router.patch("/",authMiddleware, asyncWrapper(updateUserStatusController));

router.get("/", asyncWrapper(getUserController));

router.post("/signup",userInfoValidation, asyncWrapper(createUserController));

router.post("/login",userInfoValidation, asyncWrapper(loginUserController));

router.get("/logout",authMiddleware, asyncWrapper(logoutUsertController));

router.get("/current", authMiddleware, asyncWrapper(getCurrentUserController));

router.get("/verify/:verificationToken", asyncWrapper(userVerificationCheckController));

router.post("/verify", asyncWrapper(reVerificationController));



module.exports = router;
