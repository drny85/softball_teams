const express = require('express');

const router = express.Router();

const {
    check,
    body
} = require('express-validator');

const userController = require('../controllers/user');

router.post("/create", [check('email').trim().isEmail().withMessage('email is invalid')], userController.createUser);

router.post('/login', [check('email').trim().normalizeEmail().not().isEmpty().withMessage('email is required').isEmail().withMessage('email is invalid'),
    check('password').not().isEmpty().withMessage('password is required').isLength({
        min: 6
    }).withMessage('password must be at least 6 characters')
], userController.login);


module.exports = router;