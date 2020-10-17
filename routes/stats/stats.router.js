const express = require("express");
const router = express.Router();

const landingStats = require("./stats.routes");

// console.log(landingStats.str)
// console.log(landingStats.fn('easas'))
// console.log(landingStats.paperSubmission)

router.get("/getstats", landingStats.getStats);
router.get("/papersubmission", landingStats.paperSubmission);

module.exports = router;
