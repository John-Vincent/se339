var app = require('./server');

var ports = process.env.PORT || 8080;

app.listen(ports);