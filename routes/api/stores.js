const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  createStoreValidation,
  updateStaffValidation,
  updatePhoneNumberValidation,
  updateScheduleValidation,
} = require("../../middlewares/validationMiddleware");

const { authMiddleware } = require("../../middlewares/authMiddleware");
const { checkUserNotClientMiddleware} = require("../../middlewares/checkUserNotClientMiddleware");
const {directorAccessCheckMiddleware} = require("../../middlewares/directorAccessCheckMiddleware");
const {
  directorOrManagerAccessCheckMiddleware,
} = require("../../middlewares/directorOrManagerAccessCheckMiddleware");

const {
  createStoreController,
  getAllStoresController,
  getStoreByIdController,
  deleteStoreController,
  updateStaffStoreController,
  updatePhoneNumberController,
  updateScheduleController,
  // addToolToTheStoreController,
  // removeToolFromTheStoreController,
  addOrdersToTheStoreController,
  removeOrdersFromTheStoreController,
  addClientsToTheStoreController,
  removeClientsfFomTheStoreController,
} = require("../../controllers/storesController");


router.post(
  "/create",
  authMiddleware,
  directorAccessCheckMiddleware,
  createStoreValidation,
  asyncWrapper(createStoreController)
);

router.get("/", authMiddleware,directorAccessCheckMiddleware, asyncWrapper(getAllStoresController));

router.get(
  "/:storeId",
  authMiddleware,
  directorOrManagerAccessCheckMiddleware,
  asyncWrapper(getStoreByIdController)
);


router.delete(
  "/remove:storeId",
  authMiddleware,
  directorAccessCheckMiddleware,
  asyncWrapper(deleteStoreController)
);

router.patch(
  "/updateStaff",
  authMiddleware,
  directorAccessCheckMiddleware,
  updateStaffValidation,
  asyncWrapper(updateStaffStoreController)
);
router.patch(
  "/updatePhoneNumber",
  authMiddleware,
  directorOrManagerAccessCheckMiddleware,
  updatePhoneNumberValidation,
  asyncWrapper(updatePhoneNumberController)
);



router.patch(
  "/updateSchedule",
  authMiddleware,
  directorOrManagerAccessCheckMiddleware,
  updateScheduleValidation,
  asyncWrapper(updateScheduleController)
);

// router.patch(
//   "/addTool",
//   authMiddleware,
//   directorOrManagerAccessCheckMiddleware,
//   asyncWrapper(addToolToTheStoreController)
// );

// router.patch(
//   "/removeTool",
//   authMiddleware,
//   directorOrManagerAccessCheckMiddleware,
//   asyncWrapper(removeToolFromTheStoreController)
// );

router.patch(
  "/addOrders",
  authMiddleware,
  checkUserNotClientMiddleware,
  asyncWrapper(addOrdersToTheStoreController)
);

router.patch(
  "/removeOrders",
  authMiddleware,
  checkUserNotClientMiddleware,
  asyncWrapper(removeOrdersFromTheStoreController)
);

router.patch(
  "/addClients",
  authMiddleware,
  checkUserNotClientMiddleware,
  asyncWrapper(addClientsToTheStoreController)
);

router.patch(
  "/removeClients",
  authMiddleware,
  checkUserNotClientMiddleware,
  asyncWrapper(removeClientsfFomTheStoreController)
);



module.exports = router;
