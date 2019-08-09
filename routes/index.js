var express = require('express')
var router = express.Router()
const calenderEvents = require('../controllers/calenderEvents')
const authorizeUser = require('../controllers/authorizeUser')
const authenticateUser = require('../controllers/authenticateUser')
/* GET home page. */
router
    .get('/', function(req, res, next) {
        res.render('index', { title: 'Express' })
    })
    .post('/authorize-user', authorizeUser)
    .get('/calender-events', calenderEvents)
    .post('/authenticate-user', authenticateUser)
module.exports = router
