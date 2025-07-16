const express = require('express')
require("dotenv").config()
const app = express()
const cors = require('cors')
const sequelize = require('./db')
const config = require('./util/config')
const port = config.PORT
const bodyParser = require('body-parser')

const { apiRouter } = require('./api/api');
const { paths } = require("./api/constants")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use(paths.BASE, apiRouter);
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

sequelize.sync()
  .then(() => {
    console.log("PostgreSQL connected successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to PostgreSQL:", error);
  });
