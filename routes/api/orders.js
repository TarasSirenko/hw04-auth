const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { authMiddleware } = require("../../middlewares/authMiddleware");
const {
  directorOrManagerAccessCheckMiddleware,
} = require("../../middlewares/directorOrManagerAccessCheckMiddleware");

const {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  getAllOrdersByStoreController,
  getOrdersByStatusController,
  getOrdersByUserController,
  deleteOrderController,
  updateStatusOrderController,
  updateInfoOrderController,
} = require("../../controllers/ordersConroller");

router.post("/create", authMiddleware, asyncWrapper(createOrderController));

router.get("/", authMiddleware,directorOrManagerAccessCheckMiddleware, asyncWrapper(getAllOrdersController));

router.get("/:orderId", authMiddleware, asyncWrapper(getOrderByIdController));

router.get(
  "/AllByStore",
  authMiddleware,
  asyncWrapper(getAllOrdersByStoreController)
);

router.get("/byStatus", authMiddleware, asyncWrapper(getOrdersByStatusController));

router.get("/byUser", authMiddleware, asyncWrapper(getOrdersByUserController));

router.delete("/remove", authMiddleware, asyncWrapper(deleteOrderController));

router.patch(
  "/updateStatus",
  authMiddleware,
  asyncWrapper(updateStatusOrderController)
);

router.patch(
  "/updateInfo",
  authMiddleware,
  asyncWrapper(updateInfoOrderController)
);

module.exports = router;
