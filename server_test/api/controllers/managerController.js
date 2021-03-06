var mongoose = require('mongoose'),
	Manager = mongoose.model('Managers');
var bcrypt = require('bcryptjs');
Vehicle = mongoose.model('Vehicles');



exports.create = function(req, res) {
	var newManager = new Manager ({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	});
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newManager.password, salt, function(err, hash) {
	        newManager.password = hash;
	        newManager.save(function(err, manager) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
			res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
				if(err)
					res.send(error);
				res.json(manager);
	    });
	});
	});
};

exports.deleteByUsername = function(req, res) {
	Manager.remove({username: req.params.username}, function(err, manager) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
		if(err)
			res.send(err)
		res.json(manager);
	});
};

exports.listAll = function(req, res) {
	Manager.find({}, function(err, ex) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
		if(err)
			res.send(err)
		res.json(ex);
	});
};

exports.getManagerByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
};


exports.comparePassword = function(req, res){
	Manager.findOne({username: req.body.username}, function(err, managerv) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
		if(err)
			res.send(err);
		bcrypt.compare(req.body.password, managerv.password, function(err, isMatch) {
			if(err) throw err;
			if(isMatch) {
				res.json({ Validated: true});
			}
			else {
				res.json({ Validated: false});
			}
			
		});
	});

};

exports.updateVehicles = function(req, res) {
Manager.findOneAndUpdate({username: req.params.username}, {$push: {"vehicles": req.body}}, {safe: true, upsert: true}, function(err, manager) {
	if(err)
		res.send(err);
	Manager.findOne({username: manager.username}, function(err, managerv) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
		if(err)
			res.send(err);
		res.json(managerv.vehicles);
	});
});

var newVehicle = new Vehicle(req.body);
	Vehicle.findOne({vid: req.body.vid}, function(err, vehicle) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
		if(err)
			res.send(err);
		if(!vehicle){
			result = new Vehicle(req.body);
		}
		result.save(function(err, vehiclen) {
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
			res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
			if(err)
				res.send(err);
			//res.json(vehiclen);
		});
	});
};

exports.getVehicles = function(req, res) {
	Manager.findOne({username: req.params.username}, function(err, manager) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
		if(err)
			res.send(err);
		res.json(manager.vehicles);
	});
};

exports.updateChart = function(req, res) {
	Manager.findOneAndUpdate({username: req.params.user}, {$push: {"charts": req.body }}, {safe: true, upsert: true}, function(err, manager) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
		if(err)
			res.send(err)
		res.json(manager);
	});
};

exports.getChart = function(req, res) {
	Manager.findOne({username: req.params.user}, function(err, manager) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
		if(err)
			res.send(err);
		res.json(manager.charts);
	});
};

exports.editChart = function(req, res) {
	Manager.update({'charts.name': req.body.name}, {'$set': {
		'charts.$.active': req.body.active
	}}, function(err) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
		if(err)
			res.send(err)
		res.json({ Success: true});
	});
};

exports.deleteVehicle = function(req, res) {
	Manager.findOneAndUpdate({username: req.params.username}, {$pull: {'vehicles': { vid: req.body.vid} }}, {safe: true, upsert: true}, function(err, manager) {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
		if(err)
			res.send(err)
		res.json(manager);
	});
};
