const mongoose = require("mongoose");
const { Schema } = mongoose;
const locationSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, "Please indicate the country"],
  },
  region: {
    type: String,
    required: [true, "Please indicate the region"],
  },
  city: {
    type: String,
    required: [true, "Please enter city name"],
  },
  street: {
    type: String,
    required: [true, "Please enter street name"],
  },
  houseNumber: {
    type: String,
    required: [true, "Please enter house number"],
  },
  apartment: {
    type: String,
    required: false,
  },
});

const storesSchema = new mongoose.Schema({
  location: {
    type: locationSchema,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  phoneNumber: { type: String },
  schedule: {
    monday: { type: String, default: "9:00 AM - 6:00 PM" },
    tuesday: { type: String, default: "9:00 AM - 6:00 PM" },
    wednesday: { type: String, default: "9:00 AM - 6:00 PM" },
    thursday: { type: String, default: "9:00 AM - 6:00 PM" },
    friday: { type: String, default: "9:00 AM - 6:00 PM" },
    saturday: { type: String, default: "9:00 AM - 1:00 PM" },
    sunday: { type: String, default: "Closed" },
  },
  manager: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  tools: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tool",
    },
  ],
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  clients: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Store = mongoose.model("Store", storesSchema);

module.exports = {
  Store,
};
