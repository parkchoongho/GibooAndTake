const express = require("express");
const router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("item_insert_template", {
    email: req.session.email,
    password: req.session.password,
    id:req.session.id,
    loginState: req.session.loginState
  });
});

module.exports = router;