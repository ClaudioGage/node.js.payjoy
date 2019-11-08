const express 			= require('express');
const router 			= express.Router();

const UserController 	= require('../controllers/user.controller');
const CompanyController = require('../controllers/company.controller');
const HomeController 	= require('../controllers/home.controller');
const MessagesController 	= require('../controllers/messages.controller');

const custom 	        = require('./../middleware/custom');
const ValidaSend 	        = require('./../middleware/validaSend');

const passport      	= require('passport');
const path              = require('path');


require('./../middleware/passport')(passport);

router.post('/messages/:customer_id/service/:campania_id',  passport.authenticate('basic', { session:false }), ValidaSend.validaSend , MessagesController.send)


//********* API DOCUMENTATION **********
router.use('/docs/api.json',            express.static(path.join(__dirname, '/../public/v1/documentation/api.json')));
router.use('/docs',                     express.static(path.join(__dirname, '/../public/v1/documentation/dist')));
module.exports = router;