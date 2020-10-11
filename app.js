const express = require("express");

const app = express();

const cors = require("cors");

const bp = require("body-parser");
const PORT = process.env.PORT || 5000;

app.disable("x-powered-by");
app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(require("morgan")("dev"));

//

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/landingstats", require("./routes/stats/stats.router")); //dont add jwt middleware

app.listen(PORT, () => {
  console.log("listning on " + PORT);
});
