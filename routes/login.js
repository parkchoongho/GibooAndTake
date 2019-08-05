const express = require("express");
const router = express.Router();
const mysql = require("mysql"); // 1. 드라이버 생성

/* post login 처리 */
router.post("/", function(req, res, next) {
  //biz
  const result = { msg: "", loginState: req.session.loginState };

  const con = mysql.createConnection({
    // 2. 연결
    host: "localhost",
    user: "root",
    password: "mysql",
    database: "nodejs"
  });

  con.connect(err => {
    if (err) {
      return console.error(err.message);
    }
    console.log(`DB연결됨 : ${req.body.loginId}`);
    const sql = `select * from user where user_id = '${
      req.body.loginId
    }' AND pw = '${req.body.loginPw}'`; // 3. 구문 생성
    console.log(sql);
    con.query(sql, (err, results, fields) => {
      // 4. SQL 전송
      if (err) {
        console.error(err.message);
        result.msg = "로그인을 다시 시도해주세요";
      } else {
        console.log(results[0]);
        if (results[0]) {
          // 5. 데이터 받아와 핸들링
          console.log("로그인 성공");
          req.session.loginState = true;
          req.session.email = results[0].email;
          req.session.password = results[0].password;
          req.session.id = results[0].id;
          result.msg = "로그인 되셨습니다.";
          result.loginState = true;
        } else {
          result.msg = "아이디나 비밀번호가 틀렸습니다. 다시 로그인 해주세요.";
        }
      }

      res.json(JSON.stringify(result));

      con.end(err => {
        // 6.종료
        if (err) {
          return console.error(err.message);
        }
        console.log("con close");
      });
    });
  });

  // if (
  //   req.session.email === req.body.email &&
  //   req.session.passward === req.body.passward
  // ) {
  //   req.session.loginState = true;
  //   res.redirect("/");
  // } else {
  //   res.json(JSON.stringify({ msg: "다시 로그인해주세요" }));
  // }
});

module.exports = router;
