var express = require('express');
var ngseo = require('../src/ngseo.js');
var app = express();
app.use(ngseo('public'));

app.listen(3000);
console.log('Listening on port 3000');