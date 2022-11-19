const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

require("./db/connection");

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ msg: "Internal Job Portal Backend" });
});

require("./routes/handler")(app);

app.listen(port, () => console.log(`Server Listening on PORT: ${port}`));
