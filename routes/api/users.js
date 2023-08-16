const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  userInfoValidation,
  addUserValidation,
  updateUserStatusValidation,
  updateUserAccessValidation,
  updateUserStatisticsValidation,
} = require("../../middlewares/validationMiddleware");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const {checkUserNotClientMiddleware} = require("../../middlewares/checkUserNotClientMiddleware");
const {directorAccessCheckMiddleware} = require("../../middlewares/directorAccessCheckMiddleware")

const {
  createUserController,
  userVerificationCheckController,
  reVerificationController,
  loginUserController,
  logoutUsertController,
  getUsersController,
  getUserByIdController,
  getUserByPhoneController,
  deleteUserByIdController,
  updateUserStatusController,
  addToAccessController,
  removeFromAccessController,

  updateUserStatisticsController,
  updateUserInfoController,
  changePasswordRequestController,
  changePasswordController,
  userChengePasswordController
} = require("../../controllers/usersController");


router.post("/signup", addUserValidation, asyncWrapper(createUserController));

router.get("/verify/:verificationToken",asyncWrapper(userVerificationCheckController));

router.post("/verify", asyncWrapper(reVerificationController));

router.post("/login", userInfoValidation, asyncWrapper(loginUserController));

router.get("/logout", authMiddleware, asyncWrapper(logoutUsertController));

router.get(
  "/",
  authMiddleware,
  checkUserNotClientMiddleware,asyncWrapper(getUsersController)
);

router.get("/:userId", authMiddleware, checkUserNotClientMiddleware, asyncWrapper(getUserByIdController));

router.get(
  "/byPhone",
  authMiddleware,
  checkUserNotClientMiddleware,
  asyncWrapper(getUserByPhoneController)
);



router.delete(
  "/remove",
  authMiddleware,
  checkUserNotClientMiddleware,asyncWrapper(deleteUserByIdController)
);

router.patch("/role", authMiddleware, directorAccessCheckMiddleware,updateUserStatusValidation, asyncWrapper(updateUserStatusController));

router.patch(
  "/addAccess",
  authMiddleware,
  directorAccessCheckMiddleware,
  updateUserAccessValidation,
  asyncWrapper(addToAccessController)
);
router.patch(
  "/removeAccess",
  authMiddleware,
  directorAccessCheckMiddleware,
  updateUserAccessValidation,
  asyncWrapper(removeFromAccessController)
);

router.patch("/statistics", authMiddleware,checkUserNotClientMiddleware,updateUserStatisticsValidation, asyncWrapper(updateUserStatisticsController));

router.patch(
  "/updateUserInfo",
  authMiddleware,
  checkUserNotClientMiddleware,
  asyncWrapper(updateUserInfoController)
);


router.patch(
  "/changePasswordRequest",
  asyncWrapper(changePasswordRequestController)
);

router.get(
  "/changePasword/:changePasswordToken",
  asyncWrapper(changePasswordController)
);


router.patch(
  "/userChengePassword",
  authMiddleware,
  asyncWrapper(userChengePasswordController)
);


module.exports = router;
