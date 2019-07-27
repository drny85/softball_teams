const {
    validationResult
} = require('express-validator');

const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {

    try {
        const {
            name,
            lastName,
            email,
            password
        } = req.body;
        if (name.length === 0) {
            return res.status(400).json({
                msg: "name is required"
            });
        } else if (name.length < 3) {
            return res.status(400).json({
                msg: "name has to be at least 3 characters long"
            });
        }

        if (lastName.length === 0) {
            return res.status(400).json({
                msg: "last name is required"
            });
        } else if (lastName.length < 3) {
            return res.status(400).json({
                msg: "last name has to be at least 3 characters long"
            });
        }

        //validate passsword
        if (password.length === 0) {
            return res.status(400).json({
                msg: "password is required"
            });
        } else if (password.length < 6) {
            return res.status(400).json({
                msg: "password has to be at least 6 characters long"
            });
        }
        //check for email validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: "invalid email"
            });
        }

        const user = await User.findOne({
            email
        });

        if (user) {
            return res.status(400).json({
                msg: "email already taken"
            });
        }

        const genSalt = await bcrypt.genSalt(10);
        if (!genSalt) return res.status(500).json({
            msg: "server error, try again"
        });
        const hash = await bcrypt.hash(password, genSalt);
        if (!hash) return res.status(500).json({
            msg: "server error, try again"
        });

        //create user
        const newUser = new User({
            name,
            lastName,
            email
        });
        newUser.password = hash;

        const savedUser = await newUser.save();

        res.json({
            msg: "success",
            token: savedUser.generateAuthToken(),
            user_id: savedUser._id
        });


    } catch (error) {
        return res.status(500).json({
            msg: "server error"
        });
    }


};