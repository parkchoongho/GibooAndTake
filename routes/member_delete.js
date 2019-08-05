const express = require("express");
const router = express.Router();
const mysql = require("mysql"); // 1. 드라이버 생성

/* post login 처리 */
router.post("/", function(req, res, next) {
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
    console.log("db연결됨");
    const sql = `delete from user where email='${req.session.email}' AND pw='${
      req.body.pw
    }'`;
    console.log(sql);

    con.query(sql, (err, result, fields) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(result);
        if (result.affectedRows !== 0) {
          const msg = { msg: "정상적으로 탈퇴 되었습니다." };
          res.json(JSON.stringify(msg));

          req.session.destroy(function(err) {});
        } else {
          const msg = { msg: "비밀번호가 틀렸습니다." };
          res.json(JSON.stringify(msg));
        }
      }
      con.end();
    });
  });
});

module.exports = router;
