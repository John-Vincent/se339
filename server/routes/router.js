var express = require('express');
var auth = express.Router(), noauth = express.Router();
var path = require('path');
var authguard = require(path.resolve(__dirname, "../modules/authguard"));
var example = require(path.resolve(__dirname, '../controllers/exampleController'));
var manager = require(path.resolve(__dirname, '../controllers/managerController'));
var vehicle = require(path.resolve(__dirname, '../controllers/vehicleController'));

auth.use(authguard);

//Example of how to render html file upon get request
auth.route('/example')
    .get(example.listAll)
    .post(example.create);

auth.route('/example/:vid')
    .get(example.getByUid)
    .put(example.updateExample)
    .delete(example.deleteByUid);

auth.route('/manager')
    .get(manager.listAll);

noauth.route('/manager')
      .post(manager.create);

noauth.route('/manager/login')
    .post(manager.comparePassword)

auth.route('/manager/:username')
    .get(manager.getVehicles)
    .put(manager.updateVehicles)
    .delete(manager.deleteVehicle);

auth.route('/vehicle')
    .get(vehicle.listAll)
    .post(vehicle.create);

auth.route('/vehicle/init/:vid')
    .get(vehicle.init);

auth.route('/vehicle/:vid')
    .get(vehicle.getByUid)
    .put(vehicle.updateVehicle)
    .delete(vehicle.deleteByUid);

auth.route('/vehicle/message/:vid')
    .put(vehicle.updateMessage);

auth.route('/vehicle/send/:vid')
    .put(vehicle.updatePid);

auth.route('/vehicle/send/:vid/:pid')
    .delete(vehicle.deletePid);

auth.route('/vehicle/pid/:vid')
    .put(vehicle.updateVehiclePid);

auth.route('/manager/chart/:user')
    .get(manager.getChart)
    .put(manager.updateChart);

auth.route('/manager/chart/update/:user')
    .put(manager.editChart);

module.exports = {auth: auth, noauth: noauth};