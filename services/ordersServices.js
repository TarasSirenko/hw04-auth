const { Order } = require("../db/models/ordersModel");
const { User } = require("../db/models//usersModel");

const ITEMS_PER_PAGE_ORDERS = 20;

const createOrder = async (
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
) => {
  if (updateUserInfo) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: renter },
      { $set: { name, seriesPassportNumber } },
      { new: true }
    );

    if (!updatedUser) return null;
  }

  const createdObj = {
    startLease,
    endLease,
    amountDays,
    rentPrice,
    renter,
    tools,
    storeId,
  };
  if (prepaymentAmount) createdObj.prepaymentAmount = prepaymentAmount;
  if (depositAmount) createdObj.depositAmount = depositAmount;
  if (placeOfUse) createdObj.placeOfUse = placeOfUse;
  if (costOfDelivery) createdObj.costOfDelivery = costOfDelivery;
  createdObj.status = subscription === "client" ? "application" : "confirmed";
  const newOrder = await Order.create({
    createdObj,
  });

  return newOrder;
};

const getAllOrders = async (page) => {
  const skip = (page - 1) * ITEMS_PER_PAGE_ORDERS;
  return await Order.find({}).skip(skip).limit(ITEMS_PER_PAGE_ORDERS);
};

const getOrderById = async (id) => {
  return await Order.findOne({ _id: id });
};

const getAllOrdersByStore = async (storeId, page) => {
  const skip = (page - 1) * ITEMS_PER_PAGE_ORDERS;
  return await Order.find({ store: storeId })
    .skip(skip)
    .limit(ITEMS_PER_PAGE_ORDERS);
};





const deleteOrder = async () => {};
const updateOrder = async () => {};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getAllOrdersByStore,

  deleteOrder,
  updateOrder,
};
