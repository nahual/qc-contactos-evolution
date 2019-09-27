var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    let result = '';
    const times = process.env.TIMES || 5;
    for (i = 0; i < times; i++) {
	result += i + ' ';
    }
    res.send('respond with a resource ' + result);
});

module.exports = router;
