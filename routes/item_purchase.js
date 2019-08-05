const express = require("express");
const router = express.Router();
const mysql = require("mysql");

/* GET home page. */
router.post("/", function(req, res, next) {
  const result = { msg: "구매오류", loginState: req.session.loginState };
  if (req.session.loginState) {
    const purchasePrice = parseInt(req.body.purchasePrice);

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
      console.log(`DB 연결됨 => 구입가격 : ${purchasePrice}`);
      const sql = `insert into parchase(user_no, item_no, donation) values(
          (select no from user where email='${
            req.session.email
          }'), (select no from item where item_title='${
        req.body.nameOfItem
      }'), ${purchasePrice})`;
      console.log(sql);
      con.query(sql, (err, results, fields) => {
        if (err) {
          console.error(`Error ⛔ ${err.message}`);
          res.json(JSON.stringify(result));
        } else {
          console.log(`${results} : ${fields}`);
          result.msg = `구매 db에 들어 갔습니다.`;
          res.json(JSON.stringify(result));
        }
        con.end(err => {
          if (err) {
            return console.error(err.message);
          }
        });
      });
    });
  } else {
    result.msg = "로그인 후 이용해주세요";
    res.json(JSON.stringify(result));
  }
});

module.exports = router;
