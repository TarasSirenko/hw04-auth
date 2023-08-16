const mongoose = require("mongoose");
const { Store } = require("../db/models/storesModel");
const { User } = require("../db/models/usersModel");
// const { Tool } = require("../db/models/toolsModel");
const { Order } = require("../db/models/ordersModel");

const createStore = async (location, phoneNumber) => {
  return await Store.create({ location, phoneNumber });
};

const getAllStores = async () => {
  const stores = await Store.find({});
  if (stores.length === 0) return null;
  const storesInf = stores.map((store) => {
    return { storeId: store._id, location: store.location };
  });
  return storesInf;
};

const getStoreById = async (storeId) => {
  return await Store.findOne({ _id: storeId });
};

const deleteStore = async (storeId) => {
  return await Store.findOneAndDelete({ _id: storeId });
};
const updateStaffStore = async (userId, storeId, role) => {
  const store = await Store.findById(storeId);
  if (!store) return "store";
  const user = await User.findById(userId);
  if (!user) return "user";


  return await Store.findOneAndUpdate(
    { _id: storeId },
    role === "seller"
      ? { seller: new mongoose.Types.ObjectId(userId) }
      : { manager: new mongoose.Types.ObjectId(userId) }, 
    { new: true }
  );
};

const updatePhoneNumber = async (storeId, phone) => {
  const store = await Store.findById(storeId);
  if (!store) return null;
  return await Store.findOneAndUpdate({ _id: storeId }, { phoneNumber: phone }, {new:true});
};

const updateSchedule = async (storeId, schedule) => {
  const store = await Store.findById(storeId);
  if (!store) return null;
  return await Store.findOneAndUpdate(
    { _id: storeId },
    { $set: {schedule: schedule}  },
    { new: true }
  );
};

// const addToolToTheStore = async (storeId, toolId) => {
//   const store = await Store.findById(storeId);
//   if (!store) return "store";
//     const tool = await Tool.findById(toolId);
//   if (!tool) return "tool";
//   return await Store.findOneAndUpdate(
//     { _id: storeId },
//     { $addToSet: { tools: { $each: toolId } } },
//     { new: true }
//   );
// };
// const removeToolFromTheStore = async (storeId, toolId) => {
//   const store = await Store.findById(storeId);
//   if (!store) return "store";
//   const tool = await Tool.findById(toolId);
//   if (!tool) return "tool";
//   return await Store.findOneAndUpdate(
//     { _id: storeId },
//     { $pull: { tools: toolId } },
//     { new: true }
//   );
// };
const addOrdersToTheStore = async (storeId, orderId) => {
  const store = await Store.findById(storeId);
  if (!store) return "store";
  const tool = await Order.findById(orderId);
  if (!tool) return "tool";
  return await Store.findOneAndUpdate(
    { _id: storeId },
    { $addToSet: { orders: { $each: orderId } } },
    { new: true }
  );
};

const removeOrdersFromTheStore = async (storeId, orderId) => {
  const store = await Store.findById(storeId);
  if (!store) return "store";
  const tool = await Order.findById(orderId);
  if (!tool) return "tool";
  return await Store.findOneAndUpdate(
    { _id: storeId },
    { $pull: { orders: orderId } },
    { new: true }
  );
};


const addClientsToTheStore = async (storeId, clientId) => {
  const store = await Store.findById(storeId);
  if (!store) return "store";
  const tool = await User.findById(clientId);
  if (!tool) return "tool";
  return await Store.findOneAndUpdate(
    { _id: storeId },
    { $addToSet: { clients: { $each: clientId } } },
    { new: true }
  );
};
const removeClientsfFomTheStore = async (storeId, clientId) => {
  const store = await Store.findById(storeId);
  if (!store) return "store";
  const tool = await User.findById(clientId);
  if (!tool) return "tool";
  return await Store.findOneAndUpdate(
    { _id: storeId },
    { $pull: { clients: clientId } },
    { new: true }
  );
};

module.exports = {
  createStore,
  getAllStores,
  getStoreById,
  deleteStore,
  updateStaffStore,
  updatePhoneNumber,
  updateSchedule,
  // addToolToTheStore,
  // removeToolFromTheStore,
  addOrdersToTheStore,
  removeOrdersFromTheStore,
  addClientsToTheStore,
  removeClientsfFomTheStore,
};
