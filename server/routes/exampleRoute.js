module.exports = function(app) {
	var example = require('../controllers/exampleController');
	var manager = require('../controllers/managerController');
	var vehicle = require('../controllers/vehicleController');
	const path = require('path');

	//Example of how to render html file upon get request
	app.route('/api/example')
		.get(example.listAll)
		.post(example.create);

	app.route('/api/example/:vid')
		.get(example.getByUid)
		.put(example.updateExample)
		.delete(example.deleteByUid);

	app.route('/api/manager')
		.get(manager.listAll)
		.post(manager.create)

	app.route('/api/manager/login')
		.post(manager.comparePassword)

	app.route('/api/manager/:username')
		.get(manager.getVehicles)
		.put(manager.updateVehicles)
		.delete(manager.deleteVehicle);

	app.route('/api/vehicle')
		.get(vehicle.listAll)
		.post(vehicle.create);

	app.route('/api/vehicle/init/:vid')
		.get(vehicle.init);

	app.route('/api/vehicle/:vid')
		.get(vehicle.getByUid)
		.put(vehicle.updateVehicle)
		.delete(vehicle.deleteByUid);

	app.route('/api/vehicle/message/:vid')
		.put(vehicle.updateMessage);

	app.route('/api/vehicle/send/:vid')
		.put(vehicle.updatePid);

	app.route('/api/vehicle/send/:vid/:pid')
		.delete(vehicle.deletePid);

	app.route('/api/vehicle/pid/:vid')
		.put(vehicle.updateVehiclePid);

	app.route('/api/manager/chart/:user')
		.get(manager.getChart)
		.put(manager.updateChart);

	app.route('/api/manager/chart/update/:user')
		.put(manager.editChart);
};
