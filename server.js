const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });