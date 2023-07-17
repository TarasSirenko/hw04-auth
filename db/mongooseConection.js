const mongoose = require("mongoose");

async function connectMongo() {
   return await mongoose.connect(process.env.MONGO_URL);
}

module.exports = {
  connectMongo,
};