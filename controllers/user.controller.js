const userCtrl = {};
const userModel = require('../models/user.Model');
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        throw error;
    }
}

userCtrl.register = async (req, res) => {
    try {
        const userExists = await userModel.findOne({
            username: req.body.username,
            email: req.body.email
        });

        if (userExists) {
            return res.status(403).json({
                ok: false,
                message: 'The username or email already exists.',
                data: ""
            });
        }

        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: await hashPassword(req.body.password)
        });

        await newUser.save();

        res.status(200).json({
            ok: true,
            message: 'User registered successfully.',
            data: newUser
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error.',
            data: ""
        });
    }
};