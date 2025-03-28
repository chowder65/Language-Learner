var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/getUser', userController.getUser);
router.post('/addUser', userController.addUser);
router.patch('/updateuser', userController.updateUser);
router.delete('/deleteUser', userController.deleteUser);

module.exports = router;
