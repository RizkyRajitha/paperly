const express = require("express");

const app = express();
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const bp = require("body-parser");
const PORT = process.env.PORT || 5000;

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  max: 100,
  headers: true,
});

// only apply to requests that begin with /landingstats/papersubmission/
app.use("/landingstats/papersubmission/", apiLimiter);

app.disable("x-powered-by");
app.use(cors());
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());
app.use(require("morgan")("dev"));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/landingstats", require("./routes/stats/stats.router")); //dont add jwt middleware

console.log("env - ", process.env.NODE_ENV);

app.listen(PORT, () => {
  console.log("listning on " + PORT);
});
