var mongoose = require('mongoose'),
    Vehicle = mongoose.model('Vehicles');
    Data = mongoose.model('Datas'),
    keys = ['mrLat', 'mrLong', 'msg', 'bitrate', 'mrDid', 'mrGas', 'gasTankSize', 'mrSpeed', 'mrDid', 'mrEngineLoad', 'mrEngineTemp'];


exports.listAll = function(req, res, next) {
    var query = Vehicle.find({}).select({});

    query.exec(function(err, vehicle) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
            next(err)
        res.json(vehicle);
    });
};

exports.create = function(req, res, next) {
    var newVehicle = new Vehicle(req.body);
    Vehicle.findOne({vid: req.body.vid}, function(err, vehicle) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
            next(err);
        if(!vehicle){
            result = new Vehicle(req.body);
        }
        result.save(function(err, vehiclen) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
            if(err)
                next(err);
            res.json(vehiclen);
        });
    });

};

exports.getByUid = function(req, res, next) {
    Vehicle.findOne({vid: req.params.vid}, function(err, vehicle) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
            next(err);
        res.json(vehicle);
    });
};

//{speed: req.params.speed, gas: req.params.gas, longitude: req.params.longitude, latitude: req.params.latitude}
exports.updateVehicle = function(req, res, next) {
    console.log('Log');
    console.log(req.body);
    Vehicle.findOneAndUpdate({vid: req.params.vid}, {$push: {"data": req.body }, $set: {"mrLat": req.body.latitude, "mrLong": req.body.longitude, "mrSpeed": req.body.speed, "mrGas": req.body.gas, "mrDid": req.body.did}}, {safe: true, upsert: true}, function(err, vehicle) {
        if(err) throw err;
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
            next(err)
        Vehicle.findOne({vid: vehicle.vid}, function(err, vehicleu) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
            if(err)
                next(err);
            res.json(vehicleu);
            console.log('Executed');
        });
    });
};

exports.apiUpdateVehicle = function(req, res, next)
{
    console.log('apiupdateVehicle');
    var set = {};
    for(var i = 0; i < keys.length; i++)
    {
        if(req.body[keys[i]])
        {
            set[keys[i]] = req.body[keys[i]];
        }
    }
    Vehicle.updateOne({ vid: req.params.vid }, { $set: set }, function (err, vehicle) {

        console.log("Vehicle to update: " + vehicle);
        if (err) {
            console.log('update error');
            next(err);
            return;
        }
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        Vehicle.findOne({vid: req.params.vid}, function(err, vehicle)
        {
            console.log("Vehicle to return: " + vehicle);
            if(err)
            {
                console.log('find error');
                next(err);
                return;
            }
            res.send(vehicle);
        });
    });
}

exports.updateMessage = function(req, res, next) {
    Vehicle.findOneAndUpdate({vid: req.params.vid}, {$set: {"msg": req.body.msg}}, {safe: true, upsert: true}, function(err, vehicle) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
            next(err)
        Vehicle.findOne({vid: vehicle.vid}, function(err, vehicleu) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        if(err)
            next(err);
        res.json(vehicleu);
    });
    });
};


exports.init = function(req, res, next) {
    Vehicle.findOne({vid: req.params.vid}, function(err, vehicle) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
            next(err);
            console.log('test');
        res.json({ bitrate: vehicle.bitrate, pids: vehicle.pids});
    });
};

exports.updatePid = function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
    Vehicle.findOneAndUpdate({vid: req.params.vid}, {$push: {"pids": req.body }}, {safe: true, upsert: true}, function(err, vehicle) {

        if(err)
            next(err)
        Vehicle.findOne({vid: vehicle.vid}, function(err, vehicleu) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        if(err)
            next(err);
        res.json(vehicleu);
    });
    });
};

exports.updateVehiclePid = function(req, res, next) {
    console.log('start of updateVehiclePid');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
    var value = {}
    var tank = 0;
    var speed = 0;
    var gas = 0;
    var engineLoad = 0;
    var temp = 0;
    var v;
    console.log(req.body.hasOwnProperty('lat'));
    Vehicle.findOne({vid: req.params.vid}, function(err, vehicle) {

        if(err)
            //next(err);
        tank = vehicle.gasTankSize;
    });
    //console.log(tank);
    var default_pid_map = new Map();
    default_pid_map.set(0x0D, {field:'speed', calculation: function(data) {
        return data * .621371;
    }});
    default_pid_map.set(0x2F, {field:'gas', calculation: function(data) {
        return data * tank / 255.0;
        // 20 is in as a placeholder, it will probably need to be stored as percentage and then calculated later.
    }});
    default_pid_map.set(0x04, {field:'engineLoad', calculation: function(data) {
        return data / 255.0 * 100;
    }});
    default_pid_map.set(0x05, {field:'engineTemp', calculation: function(data) {
        return (data - 40) * 1.8 + 32;
    }});
    value["did"] = req.body.did;
    var length = req.body.pids.length;
    console.log(length);
    for (var i = 0; i < length; i++){
        var result = default_pid_map.get(parseInt(req.body.pids[i].pid));
        value[result.field] = result.calculation(req.body.pids[i].data);
        if(req.body.pids[i].pid == 0x0D){
            speed = 1;
        }
        if(req.body.pids[i].pid == 0x2F){
            gas = 1;
        }
        if(req.body.pids[i].pid == 0x04){
            engineLoad = 1;
        }
        if(req.body.pids[i].pid == 0x05){
            temp = 1;
        }
    }


    var test = default_pid_map.get(13);
    //console.log(result);
    //console.log(req.params);
    if(speed == 1){
        Vehicle.findOneAndUpdate({vid: req.params.vid}, {$set: {"mrSpeed": value.speed, "mrDid": req.body.did}}, {safe:true, upsert: true}, function(err, vehicle) {
        if(err)
            next(err)
        Vehicle.findOne({vid: req.params.vid}, function(err, vehicleu) {
        if(err)
        {
            console.log(vehicleu);
            next(err);
        }
        v = vehicleu;
        //res.json(vehicleu);
    });
    });
    }
    if(gas == 1){
        Vehicle.findOneAndUpdate({vid: req.params.vid}, {$set: {"mrGas": value.gas, "mrDid": req.body.did}}, {safe:true, upsert: true}, function(err, vehicle) {
        if(err)
            next(err)
        Vehicle.findOne({vid: req.params.vid}, function(err, vehicleu) {
        if(err)
        {
            console.log(vehicleu);
            next(err);
        }
        v = vehicleu;
        //res.json(vehicleu);
    });
    });
    }
    if(engineLoad == 1){
        Vehicle.findOneAndUpdate({vid: req.params.vid}, {$set: {"mrEngineLoad": value.engineLoad, "mrDid": req.body.did}}, {safe:true, upsert: true}, function(err, vehicle) {
        if(err)
            next(err)
        Vehicle.findOne({vid: req.params.vid}, function(err, vehicleu) {
        if(err)
        {
            console.log(vehicleu);
            next(err);
        }
        v = vehicleu;
        //res.json(vehicleu);
    });
    });
    }
    if(temp == 1){
        Vehicle.findOneAndUpdate({vid: req.params.vid}, {$set: {"mrEngineTemp": value.engineTemp, "mrDid": req.body.did}}, {safe:true, upsert: true}, function(err, vehicle) {
        if(err)
            next(err)
        Vehicle.findOne({vid: req.params.vid}, function(err, vehicleu) {
        if(err)
        {
            console.log(vehicleu);
            next(err);
        }
        v = vehicleu;
        //res.json(vehicleu);
    });
    });
    }
    if(req.body.hasOwnProperty('latitude')){
        value["latitude"] = req.body.latitude;
        value["longitude"] = req.body.longitude;
        Vehicle.findOneAndUpdate({vid: req.params.vid}, {$set: {"mrLat": req.body.latitude, "mrLong": req.body.longitude}}, {safe:true, upsert: true}, function(err, vehicle) {
        if(err)
            next(err)
        Vehicle.findOne({vid: req.params.vid}, function(err, vehicleu) {
        if(err)
        {
            console.log(vehicleu);
            next(err);
        }
        v = vehicleu;
        //res.json(vehicleu);
    });
    });
    }


    Vehicle.findOneAndUpdate({vid: req.params.vid}, {$push: {"data": value}}, {safe:true, upsert: true}, function(err, vehicle) {
    if(err)
        next(err)
    Vehicle.findOne({vid: req.params.vid}, function(err, vehicleu) {
    if(err)
    {
        console.log(vehicleu);
        next(err);
    }
    v = vehicleu;
    //res.json(vehicleu);
    });
    });


    res.json(v);
};

exports.deleteByUid = function(req, res, next) {
    console.log("deleteByUid");
    if(req.params.vid == "undefined")
        req.params.vid = null;
    Vehicle.remove({vid: req.params.vid}, function(err, vehicle) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
            next(err)
        res.json(vehicle);
    });
};

exports.deletePid = function(req, res, next) {
    console.log("deletePid");
    Vehicle.update({vid: req.params.vid}, {$pullAll: {pid: [req.params.pid] }}, function(err, vehicle) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin,Content-Type,X-Auth-Token');
        if(err)
            next(err)
        res.json(vehicle);
    });
};
