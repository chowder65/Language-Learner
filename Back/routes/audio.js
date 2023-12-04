var express = require('express');
var router = express.Router();
var multer = require('multer');
var audioController = require('../controllers/audioDataController');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/addAudio', upload.single('audio'), audioController.storeAudioFile);

module.exports = router;