var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  //destroy the session
  req.session.destroy((err) => {
    if (!err) {
        res.sendStatus(200)
    }else{
        res.sendStatus(500)
    }
  })
});

module.exports = router;