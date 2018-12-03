var express = require('express'),
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
server = true;
jwt_secret = process.env.JWT_SECRET || "nicememe";

if(server)
{
    nconf.argv().env().file('keys.json');
}

uri = 'mongodb://fleet:manager@ds259855.mlab.com:59855/fleetdb'
urilocal = 'mongodb://localhost/exampledb'
mongoose.Promise = global.Promise;
if(server)
{
	mongoose.connect(uri, { useMongoClient: true });
}
else{
	mongoose.connect(urilocal, { useMongoClient: true });
}
app.use(bodyParser.urlencoded({extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/exampleRoute');
routes(app);

app.listen(ports);
