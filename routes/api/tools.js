const express = require("express");
const router = express.Router();

const { asyncWrapper } = require("../../helpers/apiHelpers");

const { authMiddleware } = require("../../middlewares/authMiddleware");

const {
  createToolParseMiddleware,
} = require("../../middlewares/createToolParseMiddleware");

const {
  fileProcessingMiddlewar,
} = require("../../middlewares/fileProcessingMiddlewar");
const {
  directorOrManagerAccessCheckMiddleware,
} = require("../../middlewares/directorOrManagerAccessCheckMiddleware");

const {
  createToolController,
  getAllToolsController,
  getToolByStoreController,
  getToolByTypeController,
  getToolByIdController,
  deleteToolController,
  updateInformationToolController,
  updatePictureToolController,
  updateStoreToolController,
} = require("../../controllers/toolsController");

router.post("/create", authMiddleware,directorOrManagerAccessCheckMiddleware,fileProcessingMiddlewar,createToolParseMiddleware, asyncWrapper(createToolController));


router.get("/", asyncWrapper(getAllToolsController));
router.get("/byStore", asyncWrapper(getToolByStoreController));
router.get("/byType", asyncWrapper(getToolByTypeController));
router.get("/:toolId", asyncWrapper(getToolByIdController));


router.delete(
  "/remove/:toolId",
  authMiddleware,
  directorOrManagerAccessCheckMiddleware,
  asyncWrapper(deleteToolController)
);

router.patch(
  "/update/information/:toolId",
  authMiddleware,directorOrManagerAccessCheckMiddleware,
  asyncWrapper(updateInformationToolController)
);
router.patch(
  "/update/picture/:toolId",
  authMiddleware,
  directorOrManagerAccessCheckMiddleware,
  fileProcessingMiddlewar,
  asyncWrapper(updatePictureToolController)
);
router.patch(
  "/update/store/:toolId",
  authMiddleware,
  directorOrManagerAccessCheckMiddleware,
  asyncWrapper(updateStoreToolController)
);

module.exports = router;
