const {
  createOrder,
  getAllOrders,
  getOrderById,
  getAllOrdersByStore,

  deleteOrder,
  updateOrder,
} = require("../services/ordersServices");

// обновление данных пользователя происходит по значению свойства updateUserInfo true or falls 
const createOrderController = async (req, res) => {
  const {subscription} = req.user
  const {
    startLease,
    endLease,
    amountDays,
    rentPrice,
    prepaymentAmount,
    depositAmount,
    placeOfUse,
    costOfDelivery,

    renter,
    tools,
    storeId,

    name,
    seriesPassportNumber,
    updateUserInfo,
  } = req.body;
  const order = await createOrder(
  subscription,
  startLease,
  endLease,
  amountDays,
  rentPrice,
  prepaymentAmount,
  depositAmount,
  placeOfUse,
  costOfDelivery,

  renter,
  tools,
  storeId,

  name,
  seriesPassportNumber,
  updateUserInfo
);
  if (!order) return res.status(403).json("Unfortunately, the order could not be placed.");
  return res.status(201).json(order);
};
const getAllOrdersController = async (req, res) => {
  const page = req.query.page || 1;
  const allOrders = await getAllOrders(page);
  if (allOrders.length === 0)  return res.status(404).json("There are no orders for your request");
    return res.status(200).json(allOrders);
};

const getOrderByIdController = async (req, res) => {
  const {OrderId} =req.body
  const order = await getOrderById(OrderId);
  if (!order) return res.status(404).json("No order with this id");
  return res.status(200).json(order);
};
const getAllOrdersByStoreController = async (req, res) => {
  const page = req.query.page || 1;
  // ==========================================Перепиши все парамтрі запроса на req.query!!!!!!!!!!!!!!!!!!!!!!!
  const { storeId } = req.query;
  const allOrdersOfStore = await getAllOrdersByStore(storeId, page);
  if (allOrdersOfStore.length === 0)
    return res
      .status(404)
      .json({ message: "No orders found for the requested store." });
  return res.status(200).json(allOrdersOfStore);
};




const getOrdersByStatusController = async (req, res) => {
  getOrderById();
};
const getOrdersByUserController = async (req, res) => {
  getOrderById();
};

const deleteOrderController = async (req, res) => {
  deleteOrder();
};

const updateStatusOrderController = async (req, res) => {
  updateOrder();
};
const updateInfoOrderController = async (req, res) => {
  updateOrder();
};

module.exports = {
  createOrderController,
  getAllOrdersController,
  getOrderByIdController,
  getAllOrdersByStoreController,
  getOrdersByStatusController,
  getOrdersByUserController,
  deleteOrderController,
  updateStatusOrderController,
  updateInfoOrderController,
};
