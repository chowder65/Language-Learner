var express = require('express');
var router = express.Router();
var questionsController = require('../controllers/questionController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getQuestion', questionsController.getQuestion);
router.post('/addQuestion', questionsController.addQuestion);
router.patch('/updateQuestion', questionsController.updateQuestion);
router.delete('/deleteQuestion', questionsController.deleteQuestion);

module.exports = router;