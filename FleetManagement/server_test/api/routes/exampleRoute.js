module.exports = function(app) {
	var example = require('../controllers/exampleController');
	var manager = require('../controllers/managerController');
	var vehicle = require('../controllers/vehicleController');
	
	app.route('/').get(function(req, res){
		res.send("Hello world");
	});

	app.route('/example')
		.get(example.listAll)
		.post(example.create);

	app.route('/example/:vid')
		.get(example.getByUid)
		.put(example.updateExample)
		.delete(example.deleteByUid);

	app.route('/manager')
		.get(manager.listAll)
		.post(manager.create)
		
	app.route('/manager/login')
		.post(manager.comparePassword)

	app.route('/manager/:username')
		.get(manager.getVehicles)
		.put(manager.updateVehicles)
		.delete(manager.deleteVehicle);

	app.route('/vehicle')
		.get(vehicle.listAll)
		.post(vehicle.create);
	
	app.route('/vehicle/init/:vid')
		.get(vehicle.init);
	
	app.route('/vehicle/:vid')
		.get(vehicle.getByUid)
		.put(vehicle.updateVehicle)
		.delete(vehicle.deleteByUid);
		
	app.route('/vehicle/message/:vid')
		.put(vehicle.updateMessage);
		
	app.route('/vehicle/send/:vid')
		.put(vehicle.updatePid);
		
	app.route('/vehicle/send/:vid/:pid')
		.delete(vehicle.deletePid);

	app.route('/vehicle/pid/:vid')
		.put(vehicle.updateVehiclePid);

	app.route('/manager/chart/:user')
		.get(manager.getChart)
		.put(manager.updateChart);
		
	app.route('/manager/chart/update/:user')
		.put(manager.editChart)
};
