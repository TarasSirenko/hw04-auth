const { connectMongo } = require('./db/mongooseConection')
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = require('./app')


const start = async () => {
  try {
    await connectMongo().then(() => {
  console.log('Подключение к базе данных MongoDB успешно установлено');
}).catch((error) => {
  console.error('Ошибка подключения к базе данных MongoDB:', error);
});
    app.listen(PORT, () => {
      console.log("Server running. Use our API on port: 3000");
    });
  
  } catch (err) {
    console.error(err)
}

  
}

start()