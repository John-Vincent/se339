const express = require('express'),
	app = express(),
    ports = process.env.PORT || 8080,
    Example = require('./models/exampleModel'),
    Manager = require('./models/managerModel'),
    Vehicle = require('./models/vehicleModel'),
	bodyParser = require('body-parser'),
    router = require('./routes/router'),
    db = require('./modules/db.js')
    nconf = require('nconf');
    mongoose = require('mongoose');

jwt_secret = process.env.JWT_SECRET || "nicememe";

if(!process.env.LOCAL_DB)
{
    nconf.argv().env().file('keys.json');
}

db.connect();


app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use('/api', router.auth);
app.use('/api', router.noauth);


/**
 * catches request that do not have any routes that match them, and response with a 404 error.
 * @param  {expressRequest}                req  the request object
 * @param  {expressResponse}                res  the response object
 * @param  {Function}              next function to move to the next route
 * @return {undefined}
 * @date   2017-10-08T19:03:45+000
 */
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/**
 * catches all errors that are passed to the next function in express routes, and then
 * renders the error page with details from the error.
 */
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.send(err);
});

module.exports = app;
