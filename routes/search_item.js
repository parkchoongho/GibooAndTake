var express = require("express");
const mysql = require("mysql");
var router = express.Router();

/* GET users listing. */
router.post("/", function(req, res, next) {
  let conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "nodejs"
  });

  conn.connect(err => {
    if (err) {
      return console.error(err.message);
    }

    console.log("DB연결됨");
    const sql = `select * from item where user_no=(select no from user where email='${
      req.session.email
    }')`;
    console.log(sql);

    conn.query(sql, (err, result, fields) => {
      if (err) {
        console.error(err.message);
      } else {
        console.dir(result);
        let select_result = [];
        result.forEach(ele => {
          select_result.push({
            no: ele.no,
            item_title: ele.item_title,
            item_contents: ele.item_contents,
            item_price: ele.item_price,
            foundation_no: ele.foundation_no,
            item_img: ele.item_img
          });
          console.log(ele);
        });
        res.json(JSON.stringify(select_result));
      }
      conn.end();
    });
  });
});

module.exports = router;
