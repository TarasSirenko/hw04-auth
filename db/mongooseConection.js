const mongoose = require("mongoose");

async function connectMongo() {
   return await mongoose.connect(process.env.MONGODB_URI);
}

module.exports = {
  connectMongo,
};