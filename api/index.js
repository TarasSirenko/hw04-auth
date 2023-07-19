const app = require("../app")
const { connectMongo } = require("../db/mongooseConection");
require("dotenv").config();

connectMongo()
      .then(() => {
        console.log("Подключение к базе данных MongoDB успешно установлено");
      })
      .catch((error) => {
        console.error("Ошибка подключения к базе данных MongoDB:", error);
      });
  

module.exports = app;