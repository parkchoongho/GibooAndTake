const express = require("express");
const router = express.Router();
const mysql = require("mysql");

/* GET home page. */
router.get("/:id", function(req, res, next) {
  console.log(req.params.id);
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "nodejs"
  });
  con.connect(err => {
    if (err) {
      return console.error(`Error ⛔ ${err.message}`);
    }
    console.log("아이템 DB에 연결되었습니다. ✅");
    const sql = `select * from item where no = ${req.params.id}`;
    console.log(sql);
    con.query(sql, (err, results, fields) => {
      if (err) {
        console.error(`Error ⛔ ${err.message}`);
      } else {
        console.log(results);
        res.render("item_detail", {
          email: req.session.email,
          loginState: req.session.loginState,
          results: results
        });
      }
      con.end(err => {
        if (err) {
          return console.error(`Error ⛔ ${err.message}`);
        }
      });
    });
  });
});

module.exports = router;
