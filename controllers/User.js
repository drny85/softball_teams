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
        if (name.trim().length === 0) {
            return res.status(400).json({
                msg: "name is required"
            });
        } else if (name.trim().length < 3) {
            return res.status(400).json({
                msg: "name has to be at least 3 characters long"
            });
        }

        if (lastName.trim().length === 0) {
            return res.status(400).json({
                msg: "last name is required"
            });
        } else if (lastName.trim().length < 3) {
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
        console.log(hash);
        newUser.password = hash;

        const savedUser = await newUser.save();

        res.json({
            token: savedUser.generateAuthToken()
        });


    } catch (error) {
        return res.status(500).json({
            msg: "server error"
        });
    }


};

exports.login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const user = await User.findOne({
            email
        });
        //check if there is an user woth that email
        if (!user) return res.status(400).json({
            msg: "email has not been registered"
        });

        //check if password matchs
        const match = await bcrypt.compare(password, user.password);

        if (!match) return res.status(400).json({
            msg: "invalid email or password"
        });

        //after verifying the user password

        const token = user.generateAuthToken();
        return res.json({
            token
        });

    } catch (error) {
        return res.status(500).json({
            msg: "server error"
        })
    }
}


exports.loadUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        return res.json(user);
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            msg: "server error"
        });
    }
}