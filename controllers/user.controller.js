const userCtrl = {};
const userModel = require("../models/user.Model");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const { ObjectId } = require('mongodb');
const generateToken = require("../helpers/generateToken");

async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
}

async function decryptPassword(password, hashedPassword) {
  console.log('found user', password, hashedPassword);
  try {
    const decryptPass = await bcrypt.compare(password, hashedPassword);
    console.log('found user', decryptPass);
    return decryptPass;
  } catch (error) {
    // Handle errors appropriately (e.g., log, throw, or return a value)
    res.status(500).json({
      ok: false,
      message: `Internal server error. ${error}`,
      data: "",
    });
  }
}

userCtrl.register = async (req, res) => {

  try {
    const userExists = await userModel.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (userExists) {
      return res.status(403).json({
        ok: false,
        message: "The username or email already exists.",
        data: "",
      });
    }

    const newObjectId = new ObjectId();
    console.log('Auto-generated ObjectId:', newObjectId);

    console.log(req.body, 'THIS IS THE REQ.BODY');
    const token = generateToken(req.body);
    // console.log(token);

    const newUser = new userModel({
      userId: newObjectId,
      username: req.body.username,
      email: req.body.email,
      password: await hashPassword(req.body.password),
      token: token,
    });
    console.log(newUser, 'THIS IS THE NEWUSER BEFORE STORING IT INTO MONGODB');
    await newUser.save();

    res.status(200).json({
      ok: true,
      message: "User registered successfully.",
      data: newUser,
    });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({
      ok: false,
      message: "Internal server error.",
      data: "",
    });
  }
};

userCtrl.login = async (req, res) => {
  try {
    const user = await userModel.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });

    if (user) {
      // console.log('found user', user._doc);
      const matchPasswords = await decryptPassword(
        req.body.password,
        user.password
      );

      if (matchPasswords) {
        console.log('password match', matchPasswords);
        // Assuming you have a generateToken function
        const token = generateToken(user);

        console.log('token: ', token)

        return res.status(200).json({
          ok: true,
          message: `Welcome back ${user.username}`,
          data: { ...user._doc, password: null, token },
        });
      }
    }

    return res
      .status(404)
      .json({ ok: false, message: "No user found", data: "" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: error.message,
      data: "",
    });
  }
};


module.exports = userCtrl;
