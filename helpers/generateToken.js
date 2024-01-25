const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    console.log("user", user)
    try {
        const payload = {
            userId: user._id,
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
