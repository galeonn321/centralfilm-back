const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    try {
        const payload = {
            _id: user._id,
            isAdmin: user.isAdmin,
        };

        const token = jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: "30d",
        });

        return token;
    } catch (error) {
        console.log("error al generar el token", error.message);
    }
};

module.exports = generateToken;
