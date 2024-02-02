const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    try {
        const payload = {
            userId: user.userId,
            username:user.username,
            email:user.email
        };

        console.log('data stored:', payload)

        const token = jwt.sign(payload, process.env.JWTSECRET, {
            expiresIn: "60d",
        });

        return token;
    } catch (error) {
        console.log("error al generar el token", error.message);
    }
};

const authenticateToken = (token) =>{

}

const renewToken = (token) =>{

}

module.exports = generateToken;
