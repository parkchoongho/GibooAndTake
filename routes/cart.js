const express = require("express");
const router = express.Router();
const mysql = require("mysql");

/* GET home page. */
router.get("/", function(req, res, next) {
  if (req.session.loginState) {
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
      console.log("장바구니DB에 연결되었습니다. ✅");
      const sql = `select cart.item_no, cart.user_no, cart.donation, item.item_img, item.item_title, item.item_price, item.foundation_no from cart left join item on cart.item_no = item.no where cart.user_no=(select no from user where email='${
        req.session.email
      }')`;
      console.log(sql);
      con.query(sql, (err, results, fields) => {
        if (err) {
          console.error(`Error ⛔ ${err.message}`);
          res.render("cart", {
            email: req.session.email,
            loginState: req.session.loginState
          });
        } else {
          console.log(results);
          res.render("cart", {
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
  } else {
    console.log("정상적이지 않은 접근이 발생했습니다. ⛔");
    res.redirect("/");
  }
});

router.post("/", function(req, res, next) {
  const result = {
    msg: "장바구니 오류 ⛔",
    loginState: req.session.loginState
  };
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
        return console.error(`Error ⛔ ${err.message}`);
      }
      console.log("장바구니DB에 연결되었습니다. ✅");
      const sql = `insert into cart(item_no, user_no, donation) values(
      (select no from item where item_title='${
        req.body.nameOfItem
      }'), (select no from user where email='${
        req.session.email
      }'), ${purchasePrice})`;
      console.log(sql);

      con.query(sql, (err, results, fields) => {
        if (err) {
          console.error(`Error ⛔ ${err.message}`);
          res.json(JSON.stringify(result));
        } else {
          console.log(`${results} : ${fields}`);
          result.msg = "장바구니에 담겼습니다. ✅";
          res.json(JSON.stringify(result));
        }
        con.end(err => {
          if (err) {
            return console.error(`Error ⛔ ${err.message}`);
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
