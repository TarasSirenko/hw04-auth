const {
  createStore,
  getAllStores,
  getStoreById,
  deleteStore,
  updateStaffStore,
  updatePhoneNumber,
  updateSchedule,
//   addToolToTheStore,
//   removeToolFromTheStore,
  addOrdersToTheStore,
  removeOrdersFromTheStore,
  addClientsToTheStore,
  removeClientsfFomTheStore,
} = require("../services/storesServices");

const createStoreController = async (req, res) => {
    const { location, phoneNumber } = req.body;
    const newStore = await createStore(location, phoneNumber);
    return res.status(200).json(newStore);
};

const getAllStoresController = async (req, res) => {
    const allStores = await getAllStores()
    if (!allStores)return res.status(404).json("You don't have any store");
        return res.status(201).json(allStores);
};

const getStoreByIdController = async (req, res) => {
    const {storeId} = req.params
    const store = await getStoreById(storeId);
    if (!store) return res.status(404).json("No store with this id");
    return res.status(200).json(store);
};

const deleteStoreController = async (req, res) => {
     const { storeId } = req.params;
    const deletedStore = await deleteStore(storeId);
    if (!deletedStore) return res.status(404).json("No store with this id");
     return res.status(200).json(deletedStore);
};

const updateStaffStoreController = async (req, res) => {
  const { userId, storeId, role } = req.body;
  const updatedStore = await updateStaffStore(userId, storeId, role);
  if (updatedStore === "store")
    return res.status(404).json("No store with this id");
  if (updatedStore === "user")
    return res.status(404).json("No user with this id");
  return res.status(200).json(updatedStore);
};

const updatePhoneNumberController = async (req, res) => {
   const { phone, storeId } = req.body;
   const updatedStore = await updatePhoneNumber(storeId, phone);
   if (!updatedStore) return res.status(404).json("No store with this id");
   return res.status(200).json(updatedStore);
};
const updateScheduleController = async (req, res) => {
  const { schedule, storeId } = req.body;
  const updatedStore = await updateSchedule(storeId, schedule);
  if (!updatedStore) return res.status(404).json("No store with this id");
  return res.status(200).json(updatedStore);
};

// const addToolToTheStoreController = async (req, res) => {
//   const { toolId, storeId } = req.body;
//   const updatedStore = await addToolToTheStore(storeId, toolId);
//   if (updatedStore === "store")
//     return res.status(404).json("No store with this id");
//   if (updatedStore === "tool")
//         return res.status(404).json("No tool with this id");
//      if (!updatedStore) return res.status(404).json("No store with this id");
//   return res.status(200).json(updatedStore);
// };
// const removeToolFromTheStoreController = async (req, res) => {
//   const { toolId, storeId } = req.body;
//   const updatedStore = await removeToolFromTheStore(storeId, toolId);
//   if (updatedStore === "store")
//     return res.status(404).json("No store with this id");
//   if (updatedStore === "tool")
//     return res.status(404).json("No tool with this id");
//      if (!updatedStore) return res.status(404).json("No store with this id");
//   return res.status(200).json(updatedStore);
// };
const addOrdersToTheStoreController = async (req, res) => {
  const { orderId, storeId } = req.body;
  const updatedStore = await addOrdersToTheStore(storeId, orderId);
  if (updatedStore === "store")
    return res.status(404).json("No store with this id");
  if (updatedStore === "order")
    return res.status(404).json("No order with this id");
     if (!updatedStore) return res.status(404).json("No store with this id");
  return res.status(200).json(updatedStore);
};
const removeOrdersFromTheStoreController = async (req, res) => {
  const { orderId, storeId } = req.body;
  const updatedStore = await removeOrdersFromTheStore(storeId, orderId);
  if (updatedStore === "store")
    return res.status(404).json("No store with this id");
  if (updatedStore === "order")
    return res.status(404).json("No order with this id");
     if (!updatedStore) return res.status(404).json("No store with this id");
  return res.status(200).json(updatedStore);
};
const addClientsToTheStoreController = async (req, res) => {
  const { clientId, storeId } = req.body;
  const updatedStore = await addClientsToTheStore(storeId, clientId);
  if (updatedStore === "store")
    return res.status(404).json("No store with this id");
  if (updatedStore === "client")
    return res.status(404).json("No client with this id");
     if (!updatedStore) return res.status(404).json("No store with this id");
  return res.status(200).json(updatedStore);
};
const removeClientsfFomTheStoreController = async (req, res) => {
  const { clientId, storeId } = req.body;
  const updatedStore = await removeClientsfFomTheStore(storeId, clientId);
  if (updatedStore === "store")
    return res.status(404).json("No store with this id");
  if (updatedStore === "client")
    return res.status(404).json("No client with this id");
     if (!updatedStore) return res.status(404).json("No store with this id");
  return res.status(200).json(updatedStore);
};


module.exports = {
  createStoreController,
  getAllStoresController,
  getStoreByIdController,
  deleteStoreController,
  updateStaffStoreController,
  updatePhoneNumberController,
  updateScheduleController,
//   addToolToTheStoreController,
//   removeToolFromTheStoreController,
  addOrdersToTheStoreController,
  removeOrdersFromTheStoreController,
  addClientsToTheStoreController,
  removeClientsfFomTheStoreController,
};
