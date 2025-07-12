const express = require('express')
require("dotenv").config()
const app = express()
const sequelize = require('./db')
const config = require('./util/config')
const port = config.PORT

const { apiRouter } = require('./api/api');
const { paths } = require("./api/constants")

const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.use(paths.BASE, apiRouter);

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
