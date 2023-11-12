require('dotenv').config();
const express = require('express')
const app = express()



app.use(express.static('public'));

//auth login for user
app.use('/api/auth', require('./routes/auth'));

// app.get('/tes1', (req, res) => {
//   res.send('holy madafacka')
//   res.send({
//     ok: false
//   })
// });

app.listen(process.env.PORT, () => {
  console.log(`Server running in port : ${process.env.PORT}`)
})