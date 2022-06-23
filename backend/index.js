const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose')
const router = express.Router()
const products = require("./products");

const app = express();

app.use(express.json());
app.use(router)
app.use(cors());

require('./models/user')
app.use(require('./routes/user'))

mongoose.connect('', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('connected to database')
})

app.get("/", (req, res) => {
  res.send("Welcome our to online shop API...");
});

app.get("/products", (req, res) => {
  res.send(products);
});

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port}`));
