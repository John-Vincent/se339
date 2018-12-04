var express = require('express');
var auth = express.Router(), noauth = express.Router();
var path = require('path');
var authguard = require(path.resolve(__dirname, "../modules/authguard"));
var example = require(path.resolve(__dirname, '../controllers/exampleController'));
var manager = require(path.resolve(__dirname, '../controllers/managerController'));
var vehicle = require(path.resolve(__dirname, '../controllers/vehicleController'));

//Example of how to render html file upon get request
auth.route('/example')
    .all(authguard)
    .get(example.listAll)
    .post(example.create);

auth.route('/example/:vid')
    .all(authguard)
    .get(example.getByUid)
    .put(example.updateExample)
    .delete(example.deleteByUid);

auth.route('/manager')
    .all(authguard)
    .get(manager.listAll);

noauth.route('/manager')
      .post(manager.create);

noauth.route('/manager/login')
    .post(manager.comparePassword)

auth.route('/manager/:username')
    .all(authguard)
    .get(manager.getVehicles)
    .put(manager.updateVehicles)
    .delete(manager.deleteVehicle);

auth.route('/vehicle')
    .all(authguard)
    .get(vehicle.listAll)
    .post(vehicle.create);

auth.route('/vehicle/init/:vid')
    .all(authguard)
    .get(vehicle.init);

auth.route('/vehicle/:vid')
    .all(authguard)
    .get(vehicle.getByUid)
    .put(vehicle.updateVehicle)
    .delete(vehicle.deleteByUid);

auth.route('/vehicle/message/:vid')
    .all(authguard)
    .put(vehicle.updateMessage);

auth.route('/vehicle/send/:vid')
    .all(authguard)
    .put(vehicle.updatePid);

auth.route('/vehicle/send/:vid/:pid')
    .all(authguard)
    .delete(vehicle.deletePid);

auth.route('/vehicle/pid/:vid')
    .all(authguard)
    .put(vehicle.updateVehiclePid);

auth.route('/manager/chart/:user')
    .all(authguard)
    .get(manager.getChart)
    .put(manager.updateChart);

auth.route('/manager/chart/update/:user')
    .all(authguard)
    .put(manager.editChart);

module.exports = {auth: auth, noauth: noauth};