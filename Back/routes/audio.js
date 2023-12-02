var express = require('express');
var router = express.Router();
var audioController = require('../controllers/audioDataController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/addAudio', audioController.storeAudiofile);

module.exports = router;