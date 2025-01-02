const database = require("./config/database");
const express = require("express");
const Config = require("./config");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

app.use(cors());
dotenv.config();
database();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

// OUR ROUTES
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/project'));
app.use('/api/payments', require('./routes/payment'));


const PORT = Config.PORT;

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.listen(PORT, () => {
 
  console.log(`Server is running on localhost:${PORT}`);
}); 