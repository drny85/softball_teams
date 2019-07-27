const express = require('express');

const router = express.Router();

const {
    check,
    body
} = require('express-validator');

const userController = require('../controllers/user');

router.post("/create", [check('email').isEmail().withMessage('email is invalid')], userController.createUser);


module.exports = router;