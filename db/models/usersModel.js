const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new mongoose.Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  name: {
    type: String,
  },
  seriesPassportNumber: { type: String },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
  },
  subscription: {
    type: String,
    enum: ["client", "seller", "manager", "director"],
    default: "client",
  },
  token: {
    type: String,
    default: null,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
  setPasswordToken: {
    type: String,
  },

  counterGoodOrders: {
    type: Number,
    default: 0,
  },

  counterOverdueOrders: {
    type: Number,
    default: 0,
  },
  countereBrokenTool: {
    type: Number,
    default: 0,
  },
  availableStores: [
    {
      type: Schema.Types.ObjectId,
      ref: "Store",
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  tools: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tool",
    },
  ],
});

const User = mongoose.model("Users", usersSchema);

module.exports = {
  User,
};


