const mongoose = require("mongoose");
const { Schema } = mongoose;

const ordersSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["application", "confirmed", "current", "completed", "overdue"],
    default: "application",
  },
  startLease: {
    type: Date,
    required: [true, "Rental start date is required"],
  },
  endLease: {
    type: Date,
    required: [true, "Rental end date is required"],
  },
  delayDays: { type: Number },
  amountDays: {
    type: Number,
    required: [true, "Number of rental days is required"],
  },
  rentPrice: {
    type: Number,
    required: [true, "Number of rental price is required"],
  },
  prepaymentAmount: { type: Number, default: 0 },
  depositAmount: { type: Number, default: 0 },
  placeOfUse: { type: String },
  costOfDelivery: { type: Number, default: 0 },
  renter: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Renter is required"],
  },
  tools: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tool",
      required: [true, "Tools is required"],
    },
  ],
  store: {
    type: Schema.Types.ObjectId,
    ref: "Store",
    required: [true, "Store is required"],
  },
});

const Order = mongoose.model("Order", ordersSchema);

module.exports = {
  Order,
};
