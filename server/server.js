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

const jwt_secret = process.env.JWT_SECRET || "nicememe";

if(!process.env.LOCAL_DB)
{
    nconf.argv().env().file('keys.json');
}

db.connect();


app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());
app.use('/api', router.auth);
app.use('/api', router.noauth);

module.exports = app;
