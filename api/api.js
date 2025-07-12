const express = require("express");
const { paths } = require("./constants")
const usersRouter = require('../routes/user');

const router = express.Router();

router.use(paths.USERS, usersRouter)

exports.apiRouter = router;
