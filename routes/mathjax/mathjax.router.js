const express = require("express");
const router = express.Router();

const mathRouter = require("./mathjax.routes");

// console.log(landingStats.str)
// console.log(landingStats.fn('easas'))
// console.log(landingStats.paperSubmission)

router.get("/getmathimage", mathRouter.getImage);
// router.get("/papersubmission", mathRouter.paperSubmission);

module.exports = router;
