var express = require("express");
var router = express.Router();
const mysql = require("mysql");

/* post member_insert */
router.post("/", function(req, res, next) {
  const result = { msg: "상품삭제오류" };
  const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "nodejs"
  });

  con.connect(err => {
    if (err) {
      return console.error(err.message);
    }

    const sql = `delete from item where no ='${req.body.item_no}'`;
    console.log(sql);

    con.query(sql, (err, results, fields) => {
      if (err) {
        console.error(err.message);
        res.json(JSON.stringify(result));
      } else {
        console.log(results, fields);
        result.msg = `상품이 정상적으로 삭제되었습니다.`;
        res.json(JSON.stringify(result));
      }
      con.end(err => {
        if (err) {
          return console.error(err.message);
        }
      });
    });
  });

  //});
});
module.exports = router;
