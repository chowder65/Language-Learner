var express = require('express');
var router = express.Router();
var lessonController = require('../controllers/lessonController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getLesson', lessonController.getLesson);
router.post('/addLesson', lessonController.addLesson);
router.patch('/updateLesson', lessonController.updateLesson);
router.delete('/deleteLesson', lessonController.deleteLesson);

module.exports = router;