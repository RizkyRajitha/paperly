// a simple TeX-input example
var mjAPI = require("mathjax-node");
mjAPI.config({
  MathJax: {
    // traditional MathJax configuration
  },
});
mjAPI.start();

exports.getImage = (req, res) => {
  console.log("get math image");
  // var yourMath = `\\frac{a}{1-a^2}`; // "E = mc^2";
  var yourMath = `${req.query.equation}`;

  console.log(yourMath);
  mjAPI.typeset(
    {
      math: yourMath,
      format: "TeX", // or "inline-TeX", "MathML"
      svg: true, // or svg:true, or html:true
    },
    function (data) {
      if (!data.errors) {
        let img = data.svg.replace(/"currentColor"/g, '"white"');
        // console.log(img);
        res.set(
          "Cache-Control",
          "max-age=0, no-cache, no-store, must-revalidate"
        );
        res.setHeader("Content-Type", "image/svg+xml");
        res.send(img);
      }
      res.send(data.errors);
    }
  );

  // let query = "SELECT submission FROM landingstats";
  // let query = "SELECT * FROM landingstats";
  // db.query(query, [], (err, result) => {
  //   if (err) {
  //     result.status(500).send(err);
  //   }
  //   console.log(result.rowCount);
  //   // console.log(result.rows);
  //   res.json({ status: "success", submissions: result.rowCount });
  // });

  // var ipaddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  // console.log("ipaddr");
  // console.log(ipaddr);
  // console.log(req.headers["x-forwarded-for"]);
  // console.log(req.connection.remoteAddress);

  // SELECT  COUNT(DISTINCT town) FROM user
};
