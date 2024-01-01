require("./database");
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const auth = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/auth", auth);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
