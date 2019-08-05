var express = require("express");
var router = express.Router();
const mysql = require("mysql");

/* post member_insert */
router.post("/", function(req, res, next) {
  const result = { msg: "상품입력오류" };
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
    console.log(
      "DB연결됨",
      `${req.body.item_title} : ${req.body.item_contents} : ${
        req.body.item_price
      }: ${req.body.foundation_no}`
    );
    const sql = `insert into item(user_no, item_title, item_contents, item_price, foundation_no, item_img)
     values((select no from user where email='${req.session.email}'),
    '${req.body.item_title}', '${req.body.item_contents}','${
      req.body.item_price
    }','${req.body.foundation_no}', '${req.body.item_img1}')`;
    console.log(sql);

    con.query(sql, (err, results, fields) => {
      if (err) {
        console.error(err.message);
        res.json(JSON.stringify(result));
      } else {
        console.log(results, fields);
        result.msg = `'${req.body.item_title}' 상품이 등록되었습니다.`;
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
