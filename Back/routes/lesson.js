var express = require('express');
var router = express.Router();
var lessonController = require('../controllers/lessonController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getLesson', lessonController);
router.post('/addLesson', lessonController );
router.patch('/updateLesson', lessonController );
router.delete('/deleteLesson', lessonController);

module.exports = router;