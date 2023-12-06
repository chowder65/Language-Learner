var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quizController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getQuiz', quizController.getQuiz);
router.post('/addQuiz', quizController.addQuiz);
router.patch('/updateQuiz', quizController.updateQuiz);
router.delete('/deleteQuiz', quizController.deleteQuiz);

module.exports = router;