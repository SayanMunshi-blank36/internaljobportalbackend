const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.json({ msg: "Internal Job Portal Backend" });
});

app.listen(port, () => console.log(`Server Listening on PORT: ${port}`));
