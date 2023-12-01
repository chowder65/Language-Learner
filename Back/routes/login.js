var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('LoginAndRegister', { title: 'Express' });
});

router.post('/', async function(req, res) {
  try{
    let user = req.body;
    console.log(user);

    let status = userController.getUser(user)

    if(status == 200){
      //if the data is good then create a session and log them in!!
      req.session.user = req.body //create the session
      console.log(req.session.user)

      res.status(200).send()
    }else{
      res.sendStatus(400)
    }
     
  }catch(err){

    res.sendStatus(500)
  }
});

module.exports = router;