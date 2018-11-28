var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSchema = new Schema({
	did: {
		type: Number,
		index: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	speed: {
		type: Number
	},
	gas: {
		type: Number
	},
	longitude: {
		type: Number,
		min: -180,
		max: 180
	},
	latitude: {
		type: Number,
		min: -90,
		max: 90
	},
	engineTemp: {
		type:Number
	},
	engineLoad: {
		type:Number
	}
});

var pidSchema = new Schema({
	pid: {
		type: Number
	}
});
	
var VehicleSchema = new Schema({
	vid: {
		type: Number,
		index: true
	},
	mrLat: {
		type: Number,
		min: -90,
		max: 90
	},
	mrLong: {
		type: Number,
		min: -180,
		max: 180
		},
	mrSpeed: {
		type: Number
	},
	mrGas: {
		type: Number
	},
	mrDid: {
		type: Number
	},
	mrEngineTemp: {
		type: Number
	},
	mrEngineLoad: {
		type: Number
	},
	msg: {
		type: String
	},
	bitrate: {
		type: Number
	},
	gasTankSize: {
		type: Number
	},
	data: [dataSchema],
	pids: [pidSchema]
	
});

module.exports = mongoose.model('Vehicles', VehicleSchema);
module.exports = mongoose.model('Datas', dataSchema);

	
