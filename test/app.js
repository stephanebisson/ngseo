var express = require('express');
var ngseo = require('./ngseo.js');
var app = express();
app.use(ngseo());

app.listen(3000);
console.log('Listening on port 3000');