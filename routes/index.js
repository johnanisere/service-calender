var express = require('express')
var router = express.Router()
const authorize = require('../controllers/authorizeUser')

/* GET home page. */
router
    .get('/', function(req, res, next) {
        res.render('index', { title: 'Express' })
    })
    .post('/', authorize)
module.exports = router
