const { Sequelize } = require("sequelize");
const User = require('../models/user')
const Exercise = require('../models/exercise')
const httpCodes = require('../constants/httpCodes')
const { getCurrentDate } = require('../util/hellper')

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        if (!users.length) {
            return res.status(httpCodes.NOT_FOUND).send({ error: "Users not found" });
        }
        return res.send(users);
    } catch (error) {
        console.error(error)
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
}

exports.createUser = async (req, res) => {
    try {
        const { username } = req.body

        const user = await User.findOne({
            where: { username }
        })

        if (user) {
            return res.status(httpCodes.BAD_REQUEST).send({ error: `User with username ${username} already exist` });
        }

        const newUser = await User.create({
            username
        })
        return res.send(newUser);
    } catch (error) {
        console.error(error)
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
}

exports.createExercise = async (req, res) => {
    try {

        const { id } = req.params

        const user = await User.findOne({
            where: { id }
        })

        if (!user) {
            return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ error: `User with id ${id} doesn't exist` });
        }

        const exercise = await Exercise.create({
            ...req.body,
            userId: id,
            date: req.body.date || getCurrentDate(),
        })
        return res.send(exercise);

    } catch (error) {
        console.error(error)
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
}

exports.getUserExerciseLog = async (req, res, next) => {
    try {
        const { id } = req.params
        const { from, to, limit } = req.query;

        const where = { userId: id };
        if (from) {
            where.date = { ...where.date, [Sequelize.Op.gte]: from };
        }
        if (to) {
            where.date = { ...where.date, [Sequelize.Op.lte]: to };
        }

        const user = await User.findOne({
            where: { id }
        })
        if (!user) {
            return res.status(httpCodes.BAD_REQUEST).json({ error: "User not found" });
        }

        const queryOptions = {
            where,
            attributes: ["exerciseId", "description", "duration", "date"],
            order: [["date", "ASC"]],
        };
        if (limit) {
            queryOptions.limit = parseInt(limit);
        }

        const exercises = await Exercise.findAll(queryOptions);

        const count = await Exercise.count({ where });

        const response = {
            id: user.id,
            username: user.username,
            logs: exercises.map(exercise => ({
                id: exercise.exerciseId,
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date,
            })),
            count: count,
        };

        return res.json(response);
    } catch (error) {
        console.error(error)
        return res.status(httpCodes.INTERNAL_SERVER_ERROR).send({ error });
    }
};
