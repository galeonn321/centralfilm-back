const userCtrl = {};
const userModel = require('../models/user.Model');
const bcrypt = require('bcrypt');
const generateToken = require('../helpers/generateToken');

userCtrl.register = async (req, res) => {
    try {
        const userExists = await UserModel.findOne({
            username: req.body.username,
            email: req.user.email
        });

        if (userExists) {
            return res.status(403).json({
                ok: false,
                message: 'the username already exists.',
                data: ""
            })
        }

        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.
        })


    } catch {

    }

}