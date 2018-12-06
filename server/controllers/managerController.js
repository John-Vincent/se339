var mongoose = require('mongoose'),
    Manager = mongoose.model('Managers');
var bcrypt = require('bcryptjs');
Vehicle = mongoose.model('Vehicles');
var jwt = require('jsonwebtoken');

const BAD_REQUEST = 400;

exports.create = function(req, res, next) {
    try
    {
        if(req.body && req.body.username && req.body.password){
            var newManager = new Manager ({
                username: req.body.username,
                password: req.body.password
            });

            //check if manager already exists
            Manager.findOne({username: newManager.username}, function(err, record){
                if(record)
                {
                    res.status(BAD_REQUEST).send("Manager with that username or email already exists,\nplease enter different information");
                } else {
                    bcrypt.genSalt(10, function(err, salt) {
                        bcrypt.hash(newManager.password, salt, function(err, hash) {
                            newManager.password = hash;
                            newManager.save(function(error, manager) {
                                res.setHeader('Access-Control-Allow-Origin', '*');
                                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
                                res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
                                if (error) res.send(error);
                                res.json(manager);
                            });
                        });
                    });
                }
            });
        } else {
            res.status(BAD_REQUEST).send("Request is missing username, password, or email. All three are required.");
        }
    }
    catch(err)
    {
        next(err);
    }
};

exports.deleteByUsername = function(req, res, next) {
    Manager.remove({username: req.params.username}, function(err, manager) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err){
            next(err);
            return;}
        res.json(manager);
    });
};

exports.listAll = function(req, res, next) {
    Manager.find({}, function(err, ex) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
        {
            next(err);
            return;
        }
        res.json(ex);
    });
};

exports.getManagerByUsername = function(username, callback){
    var query = {username: username};
    User.findOne(query, callback);
};


exports.comparePassword = function(req, res, next){
    Manager.findOne({username: req.body.username}, function(err, manager) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
        {
            next(err);
            return;
        }
        if(!manager)
        {
            next('username or password is incorrect');
            return
        }
        bcrypt.compare(req.body.password, manager.password, function(err, isMatch) {
            if(err)
            {
                next(err);
                return;
            }
            if(isMatch) {
                var exp = Math.floor(Date.now() / 1000) + (60 * 120);
                var token = jwt.sign(
                    {
                        exp: exp,
                        data: JSON.stringify(manager)
                    },
                    jwt_secret
                );
                console.log(token);
                res.json(
                    {
                        Validated: true,
                        access_token: token,
                        manager: manager,
                        expiration: new Date(1000*exp).toUTCString()
                    });
            }
            else {
                next('username or password is incorrect');
            }
        });
    });
};

exports.updateVehicles = function(req, res, next) {
    Manager.findOneAndUpdate({username: req.params.username}, {$push: {"vehicles": req.body}}, {safe: true, upsert: true}, function(err, manager) {
        if(err){
            next(err);
            return;}
        Manager.findOne({username: manager.username}, function(err, managerv) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
            if(err)
            {
                next(err);
                return;
            }
            res.json(managerv.vehicles);

            return;
        });
    });

    var newVehicle = new Vehicle(req.body);
    Vehicle.findOne({vid: req.body.vid}, function(err, vehicle) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
        {
            next(err);
            return;
        }
        if(!vehicle){
            result = new Vehicle(req.body);

            result.save(function(err, vehiclen) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
                res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
                if(err)
                {
                    next(err);
                    return;
                }
                //res.json(vehiclen);
            });
        }
    });
};

exports.getVehicles = function(req, res, next) {
    Manager.findOne({username: req.params.username}, function(err, manager) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
        {
            next(err);
            return;
        }
        res.json(manager.vehicles);
    });
};

exports.updateChart = function(req, res, next) {
    Manager.findOneAndUpdate({username: req.params.user}, {$push: {"charts": req.body }}, {safe: true, upsert: true}, function(err, manager) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
        {
            next(err);
            return;
        }
        res.json(manager);
    });
};

exports.getChart = function(req, res, next) {
    Manager.findOne({username: req.params.user}, function(err, manager) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
        {
            next(err);
            return;
        }
        res.json(manager.charts);
    });
};

exports.editChart = function(req, res, next) {
    Manager.update({'charts.name': req.body.name}, {'$set': {
        'charts.$.active': req.body.active
    }}, function(err) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
        {
            next(err);
            return;
        }
        res.json({ Success: true});
    });
};

exports.deleteVehicle = function(req, res, next) {
    console.log(req.params, req.query);
    req.query.vid = req.query.vid == "undefined" ? null : req.query.vid;

    Manager.findOneAndUpdate({username: req.params.username}, {$pull: {'vehicles': { vid: req.query.vid} }}, {safe: true, upsert: true}, function(err, manager) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
        {
            next(err);
            return;
        }
        res.json(manager);
    });
};
