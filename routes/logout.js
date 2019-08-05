const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  if (req.session.email) {
    req.session.destroy(function(err) {
      const result = { msg: "로그아웃 되셨습니다." };
      res.json(JSON.stringify(result));
    });
  }
});

module.exports = router;
