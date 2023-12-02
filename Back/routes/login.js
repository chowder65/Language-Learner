var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('LoginAndRegister', { title: 'Express' });
});

router.get('/session', (req, res) => {
  const userData = req.session.user;
  res.json(userData);
});

router.post('/',  async function(req, res) {
  try{
    let user = req.body
    console.log("body" + req.body)
    console.log("user" + user);

    let status = userController.loginUser(user)

    if( status === 200){
      //if the data is good then create a session and log them in!!
      req.session.user = req.body
      console.log("session" + req.session.user)

      res.status(200).send()
    }else{
      res.sendStatus(400)
    }
    
  }catch(err){
    console.log(err)
    res.sendStatus(500)
  }
});

module.exports = router;