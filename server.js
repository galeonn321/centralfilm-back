require("./database");
require('dotenv').config()
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// ... rest of your Express setup
