// Require express and create an instance of it
var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(__dirname + '/public'));
app.use('/build/', express.static(path.join(__dirname + '/node_modules/three/build')));
app.use('/jsm/', express.static(path.join(__dirname + '/node_modules/three/examples/jsm')));
app.use('/fonts/', express.static(path.join(__dirname + '/node_modules/three/examples/fonts')));

// start the server in the port 3000 !
app.listen(3000, function () {
    console.log('Example app listening on port 3000.');
});