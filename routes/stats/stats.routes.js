const db = require("../../db/index");

exports.getStats = (req, res) => {
  console.log("get landing stats");

  // let query = "SELECT submission FROM landingstats";
  let query = "SELECT * FROM landingstats";
  db.query(query, [], (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    console.log(result.rowCount);
    // console.log(result.rows);
    res.json({ status: "success", submissions: result.rowCount });
  });

  var ipaddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log("ipaddr");
  console.log(ipaddr);
  console.log(req.headers["x-forwarded-for"]);
  console.log(req.connection.remoteAddress);

  // SELECT  COUNT(DISTINCT town) FROM user
};

exports.paperSubmission = (req, res) => {
  let time = new Date().toISOString();

  console.log(req.query.submissions);
  console.log(req.query.paper);
  console.log(req.query.paperyear);

  let query1 =
    "INSERT INTO landingstats (submission,submissiontime,paper,paperyear) VALUES ($1,$2,$3,$4)";

  db.query(
    query1,
    [req.query.submissions, time, req.query.paper, req.query.paperyear],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
        return;
      }

      let query2 =
        "SELECT submission,COUNT(submission) FROM landingstats where paper=$1 and paperyear=$2  group by submission ";
      db.query(
        query2,
        [req.query.paper, req.query.paperyear],
        (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
          }
          console.log(result.rowCount);
          console.log(result.rows);

          let graphData = result.rows.map((ele) => {
            return { x: ele.submission, y: ele.count };
          });
          console.log(graphData);

          function compare(a, b) {
            if (a.x < b.x) {
              return -1;
            }
            if (a.x > b.x) {
              return 1;
            }
            return 0;
          }

          graphData.sort(compare);
          console.log(graphData);
          res.json({ status: "success", submissionGraphData: graphData });
        }
      );

      // console.log(result);
      // let query2 = "SELECT submission FROM landingstats";
      // db.query(query, [], (err, result) => {
      //   if (err) {
      //     result.status(500).send(err);
      //   }
      //   console.log(result.rowCount);
      //   console.log(result.rows);
      //   res.json({ status: "success", submissions: result.rowCount });
      // });
      // res.json({ status: "success" });
    }
  );
};

exports.addFeedback = (req, res) => {
  console.log("add Feedback");
  console.log(req.body)

  let {name,feedback,subject,year} = req.body

  console.log(name,feedback,subject,year);

  // let query = "SELECT submission FROM landingstats";


  let query =
  "INSERT INTO feedback (name,feedback,paper,paperyear) VALUES ($1,$2,$3,$4)";
  db.query(query, [name,feedback,subject,year], (err, result) => {
    if (err) {
      console.log(err)
      res.status(500).send(err);
    }
    console.log(result);
    // console.log(result.rows);
    res.json({ status: "success"});
  });

  var ipaddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log("ipaddr");
  console.log(ipaddr);
  console.log(req.headers["x-forwarded-for"]);
  console.log(req.connection.remoteAddress);

  // SELECT  COUNT(DISTINCT town) FROM user
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

// ALTER TABLE landingstats ADD paper text not null , ADD paperyear int not null ;

/**
 * 
  CREATE TABLE feedback ( 
  feedback_id serial PRIMARY KEY,
  name text not null ,
  feedback text not null ,
  paper text not null ,
  paperyear int not null,
  timestamp TIMESTAMP NOT NULL 

CREATE TABLE feedback ( 
  feedback_id serial PRIMARY KEY,
  name text not null ,
  feedback text not null ,
  paper text not null ,
  paperyear int not null,
  timestamp TIMESTAMP default current_timestamp );


);
 */