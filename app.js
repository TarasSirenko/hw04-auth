const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const multer = require("multer");
const { errorHandler } = require("./helpers/apiHelpers");
const  contactsRouter  = require("./routes/api/contacts");
const  usersRouter  = require("./routes/api/users");


const upload = multer();
const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())
app.use(upload.none());
app.use('/api/contacts', contactsRouter)
app.use("/api/users", usersRouter);
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})


module.exports = app
