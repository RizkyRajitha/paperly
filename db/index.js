const { Pool } = require("pg");
const connectionString =
  process.env.NODE_ENV === "production"
    ? process.env.DBURL
    : require("../config/config").DBURL; //'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'

const pool = new Pool({
  connectionString: connectionString,
});

module.exports = {
  query: (text, params, callback) => {
    const start = Date.now();
    return pool.query(text, params, (err, res) => {
      const duration = Date.now() - start;
      console.log("executed query", { text, duration });
      callback(err, res);
    });
  },
};
