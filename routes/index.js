var express = require('express');
var router = express.Router();
const createEvent = require('../controllers/createEvents');
const authorizeUser = require('../controllers/authorizeUser');
const calenderEvents = require('../controllers/calenderEvents');
const authenticateUser = require('../controllers/authenticateUser');
const updateEvent = require('../controllers/updateEvent');

/* GET home page. */
router
    .get('/', function(req, res, next) {
        res.render('index', { title: 'Express' })
    })
    .post('/authorize-user', authorizeUser)
    .get('/calender-events', calenderEvents)
    .post('/authenticate-user', authenticateUser)
    .post('/create-event', createEvent)
    .patch('/update-event', updateEvent);

module.exports = router
