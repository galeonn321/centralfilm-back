const userCtrl = {};
const userModel = require("../models/user.Model");
const CryptoJS = require("crypto-js");
const generateToken = require("../helpers/generateToken");

userCtrl.register = async (req, res) => {
    try {
        const userExists = await userModel.findOne({
            username: req.body.username,
            email: req.body.email,
        });

        if (userExists) {
            return res.status(403).json({
                ok: false,
                message: "The username already exists.",
                data: "",
            });
        }

        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
            ).toString(),
            isAdmin: req.body.isAdmin,
        });
        const savedUser = await newUser.save();
        const token = generateToken(savedUser);
        res.status(201).json({
            ok: true,
            message: "The user has been created",
            data: { ...savedUser._doc, password: null, token },
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message,
            data: "",
        });
    }
};

userCtrl.login = async (req, res) => {
    try {
        const user = await userModel.findOne({ username: req.body.username });

        if (user) {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
            const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);
            if (decryptedPass === req.body.password) {
                const token = generateToken(user);
                return res.status(200).json({
                    ok: true,
                    message: `Welcome back ${user.username}`,
                    data: { ...user._doc, password: null, token },
                });
            }
        }

        return res
            .status(404)
            .json({ ok: false, message: "Not user found", data: "" });
    } catch {
        res.status(500).json({
            ok: false,
            message: error.message,
            data: "",
        });
    }
};

module.exports = userCtrl;
