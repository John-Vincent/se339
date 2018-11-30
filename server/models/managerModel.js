var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chartSchema = new Schema({
	name: {
		type: String
	},
	active: {
		type: Boolean
	}
});


// Manager Schema
var ManagerSchema = new Schema({
	username: {
		type: String,
		index:true
	},
	password: {
		type: String
	},
	name: {
		type: String
	},
	vehicles: [{
		vid: Number
	}],
	charts: [chartSchema]
});

module.exports = mongoose.model('Managers', ManagerSchema);

