const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
} = require("../services/contactsServices");

const getContactsController = async (req, res) => {
   const { _id: userId } = req.user;
  const contacts = await getContacts(userId);
  return res.status(200).json(contacts);
};

const getContactByIdController = async (req, res) => {
   console.log(req.user);
  const contact = await getContactById(req.params.contactId);
  if (contact) return res.status(200).json(contact);
  throw new Error("Contact not found");
};

const removeContactController = async (req, res) => {
   console.log(req.user);
  await removeContact(req.params.contactId);
  res.status(200).json({ message: "contact deleted" });
};

const addContactController = async (req, res) => {
    const { _id: userId } = req.user;
   console.log(userId);
  const newContact = await addContact(req.body, userId);
  res.status(201).json(newContact);
};

const updateContactController = async (req, res) => {
   console.log(req.user);
  const newContact = await updateContact(req.params.contactId, req.body);
  res.status(201).json(newContact);
};
const updateContactStatusController = async (req, res) => {
   console.log(req.user);
  const { favorite } = req.body;
  if (!favorite) res.status(400).json({ message: "missing field favorite" });

  const newContact = await updateContactStatus(
    req.params.contactId,
    req.body.favorite
  );
  res.status(201).json(newContact);
};

module.exports = {
  getContactsController,
  getContactByIdController,
  removeContactController,
  addContactController,
  updateContactController,
  updateContactStatusController,
};
