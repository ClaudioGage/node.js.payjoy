//colas
var Queue = require('bull', 'redis://127.0.0.1:6379');
var messageQueue = new Queue('messages', 'redis://127.0.0.1:6379');

/*
messageQueue.empty().then(function () {    
  resolve(queue);
}).catch(function (err) {
   reject(err);
});
*/

const express 		= require('express');
const morgan 	    = require('morgan');
const bodyParser 	= require('body-parser');
const passport      = require('passport');
const pe            = require('parse-error');
const cors          = require('cors');
const helmet = require('helmet');
var fs = require('fs');
var path = require('path');
var BasicStrategy = require('passport-http').BasicStrategy; 

var RateLimit = require("express-rate-limit");
var RedisStore = require('rate-limit-redis');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'log-api.log'), { flags: 'a' })

const v1    = require('./routes/v1');
const app   = express();

const logger = require('./config/logger');

const CONFIG = require('./config/config');
const {Re500} = require('./services/util.service');

/*
 *limite por IP
 *
*/

/*
const limiter = rateLimit({
  windowMs: 1000, // 15 minutes
  max: 20 // limit each IP to 100 requests per windowMs
});
*/

//app.set('trust proxy', true);
app.enable("trust proxy");


var limiter = new RateLimit({
  store: new RedisStore({
    expiry: 0
  }),
  windowMs: 1000,
  max: 1000, // limit each IP to 100 requests per windowMs
  delayMs: 0 // disable delaying - full speed until the max limit is reached
});

// adding Helmet to enhance your API's security
app.use(helmet());

// adding morgan to log HTTP requests
//app.use(morgan('combined', { stream: accessLogStream }))
//app.use(morgan('combined', { stream: logger.stream }));
app.use(morgan('combined', { stream: logger.stream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//limite IP
app.use(limiter);

//Passport
app.use(passport.initialize());

require('crypto').randomBytes(48, function(err, buffer) {
  var token = buffer.toString('hex');
  console.log("crypto", token);
});

require('crypto').randomBytes(16, function(err, buffer) {
  var token = buffer.toString('hex');
  console.log("crypto", token);
});


//Log Env
console.log("Environment:", CONFIG.app)
//DATABASE
const models = require("./models");
models.sequelize.authenticate().then(() => {
    console.log('Connected to SQL database:', CONFIG.db_name);
})
.catch(err => {
    console.error('Unable to connect to SQL database:',CONFIG.db_name, err);
});

if(CONFIG.app==='dev'){
    models.sequelize.sync(/*{force: true}*/);//creates table if they do not already exist
    //models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes
}
// CORS
app.use(cors());

app.use('/v1', v1);

app.use('/', function(req, res){
	res.statusCode = 404;//send the appropriate status code
	res.json({status:"error", message:"Not found", data:{}})
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error("error", err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page

  //res.status(err.status || 500);
  //res.render('error');

  logger.info("ERROR=>" + JSON.stringify(err));

  return Re500(res, "Exception");
});

module.exports = app;

//This is here to handle all the uncaught promise rejections
/*
process.on('unhandledRejection', error => {
    console.error('Uncaught Error', pe(error));
    console.log('Unhandled Rejection at:', reason.stack || reason)
});
*/

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});
