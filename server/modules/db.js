var path = require('path');
module.exports =
{
    mongoose: require('mongoose'),
    Example: require(path.resolve(__dirname, '../models/exampleModel')),
    Manager: require(path.resolve(__dirname, '../models/managerModel')),
    Vehicle: require(path.resolve(__dirname, '../models/vehicleModel')),
    connect: function(){
        const uri = 'mongodb://fleet:manager@ds259855.mlab.com:59855/fleetdb';
        const urilocal = 'mongodb://localhost/fleetManagement';
        mongoose.Promise = global.Promise;

        if (!process.env.LOCAL_DB)
        {
            mongoose.connect(uri, { useMongoClient: true });
        }
        else
        {
            mongoose.connect(urilocal, { useMongoClient: true });
        }
    }
}
