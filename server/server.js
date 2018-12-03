const express = require('express'),
	app = express(),
	ports = process.env.PORT || 8080,
	mongoose = require('mongoose'),
	Example = require('./models/exampleModel'),
	Manager = require('./models/managerModel'),
	Vehicle = require('./models/vehicleModel'),
    jwt = require('jsonwebtoken');
	bodyParser = require('body-parser'),
	mongodb = require('mongodb'),
	nconf = require('nconf');

const jwt_secret = process.env.JWT_SECRET || "nicememe";

if(!process.env.LOCAL_DB)
{
    nconf.argv().env().file('keys.json');
}

const uri = 'mongodb://fleet:manager@ds259855.mlab.com:59855/fleetdb';
const urilocal = 'mongodb://localhost/fleetManagement';
mongoose.Promise = global.Promise;

if(!process.env.LOCAL_DB)
{
	mongoose.connect(uri, { useMongoClient: true });
}
else{
	mongoose.connect(urilocal, { useMongoClient: true });
}
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

const routes = require('./routes/exampleRoute');
routes(app);

app.listen(ports);
