var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quizController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getQuiz', quizController);
router.post('/addQuiz', quizController );
router.patch('/updateQuiz', quizController);
router.delete('/deleteQuiz', quizController);

module.exports = router;