const { Contacts } = require("../db/models/contactsModel");


const getContacts = async (userId) => {
  return await Contacts.find({ owner: userId });
};

const getContactById = async (id) => {
  return await Contacts.findOne({ _id: id});
  
};

const removeContact = async (id) => {
  await Contacts.findByIdAndRemove({ _id: id });
};

const addContact = async ({ name, email, phone }, userId) => {
  const emailInUse = await Contacts.findOne({ email: email });
  console.log(emailInUse);
  if (emailInUse) return new Error("You already have a contact with this mail");

  return await Contacts.create({ name, email, phone, owner: userId });
};

const updateContact = async (id , { name, email, phone }) => {
  return await Contacts.findByIdAndUpdate(
    { _id: id },
    { $set: { name, email, phone } },
    { new: true }
  );
 
};
const updateContactStatus = async ( id, favorite ) => {
 return  await Contacts.findByIdAndUpdate(
    { _id: id },
    { $set: { favorite } },
    { new: true }
  );
};

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
