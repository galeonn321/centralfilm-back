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
};

async function decryptPassword(password) {
    try {
        const decryptPass = await bcrypt.compare(password, hash);
        return decryptPass;
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: `Internal server error. ${error}`,
            data: ""
        });
    }
};

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

userCtrl.login = async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.body.username });
        const email = await userModel.findOne({ username: req.body.email });
        if (user || email) {
            const matchPasswords = await decryptPassword(req.body.password)
            if (matchPasswords) {
                const token = generateToken(user);
                return res.status(200).json({
                    ok: true,
                    message: `Welcome back ${user.username}`,
                    data: { ...user._doc, password: null, token }
                })
            }
        }
        return res
            .status(404)
            .json({ ok: false, message: "Not user found", data: "" });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message,
            data: "",
        });
    }
};

module.exports = userCtrl;