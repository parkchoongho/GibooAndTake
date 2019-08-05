const express = require("express");
const router = express.Router();
const formidable = require("formidable");
const fs = require("fs");

/* file upload */
router.post("/", function(req, res, next) {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log(files.uploadFile.path);
    var oldpath = files.uploadFile.path;
    var newpath = "./public/upload/" + files.uploadFile.name;
    console.log(newpath);
    fs.rename(oldpath, newpath, function(err) {
      if (err) throw err;
      res.redirect("/item_insert_template");
      res.end();
    });
  });
});

module.exports = router;
