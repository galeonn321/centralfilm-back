const mongoose = require('mongoose');


// mongodb connection
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log("connected to MongoDB Atlas"))
    .catch((error) => console.error(error));

module.exports = mongoose;
