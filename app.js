const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/your-database', { useNewUrlParser: true });

// Create a Mongoose schema and model
const Schema = mongoose.Schema;
const yourSchema = new Schema({ name: String });
const YourModel = mongoose.model('YourModel', yourSchema);

// Define Express routes that interact with the database
app.get('/api/data', async (req, res) => {
  try {
    const data = await YourModel.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
