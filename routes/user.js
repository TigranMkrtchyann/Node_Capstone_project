const express = require("express");
const { validateParamIdAndPagination } = require("../validation/schemas/general")
const { validateCreateUser } = require("../validation/schemas/user")
const { validateCreateExercise } = require("../validation/schemas/exercise")
const {
    getUsers,
    createUser,
    getUserExerciseLog,
    createExercise
} = require('../controllers/usersController')

const router = express.Router();

router.get("/", getUsers);
router.get("/:id/logs", validateParamIdAndPagination, getUserExerciseLog);
router.post("/", validateCreateUser, createUser);
router.post("/:id/exercises", validateCreateExercise, createExercise);


module.exports = router;
