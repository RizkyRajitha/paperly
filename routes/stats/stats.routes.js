const db = require("../../db/index");

exports.getStats = (req, res) => {
  console.log("get landing stats");

  let query = "SELECT submission FROM landingstats";
  // let query = "SELECT * FROM landingstats";
  db.query(query, [], (err, result) => {
    if (err) {
      result.status(500).send(err);
    }
    console.log(result.rowCount);
    res.json({ status: "success", submissions: result.rowCount });
  });
};

exports.paperSubmission = (req, res) => {
  let time = new Date().toISOString();
  console.log(req.params.submissions);

  db.query(
    " INSERT INTO landingstats (submission , submissiontime) VALUES ($1 , $2)",
    [req.params.submissions, time],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      console.log(result);
      res.json({ status: "success" });
    }
  );
};

// exports.str = "qwqwqwq";
// exports.fn = (e) => console.log(e);
// module.exports = {
//   all: function(req, res){
//       res.send('All todos')
//   },
//   viewOne: function(req, res){
//       console.log('Viewing ' + req.params.id);
//   },
//   create: function(req, res){
//       console.log('Todo created')
//   },
//   destroy: function(req, res){
//       console.log('Todo deleted')
//   },
//   edit: function(req, res){
//       console.log('Todo ' + req.params.id + ' updated')
//   },paperSubmission:paperSubmission
// };
