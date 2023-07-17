const express = require("express");
const router = express.Router();

const {
  addPostValidation,
  updatePostValidation,
  updateContactStatusValidation,
} = require("../../middlewares/validationMiddleware");
const { authMiddleware } = require("../../middlewares/authMiddleware");

const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateContactStatusController,
} = require("../../controllers/contactsController");




router.get("/",authMiddleware, asyncWrapper(getContactsController));

router.get("/:contactId",authMiddleware, asyncWrapper(getContactByIdController));

router.post("/",authMiddleware,  addPostValidation, asyncWrapper(addContactController));

router.delete(
  "/:contactId",
  authMiddleware,
  asyncWrapper(removeContactController)
);

router.put(
  "/:contactId",
  authMiddleware,
  updatePostValidation,
  asyncWrapper(updateContactController)
);

router.patch(
  "/:contactId/favorite",
  authMiddleware,
  updateContactStatusValidation,
  asyncWrapper(updateContactStatusController)
);



module.exports = router;
