require('./src/db');

var express = require('express'),
    bodyParser = require('body-parser'),
    countries = require('./src/routes/countries'),
    winston = require("winston"),
    nmscs = require('./src/routes/nmscs');

winston.handleExceptions(new winston.transports.Console);

var app = express();

// parse application/json
app.use(bodyParser.json());

app.get("/", function(req, res){
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("OSB Aggregation POC");
});

app.get('/nmscs', nmscs.findAll);
app.get('/nmscs/:id', nmscs.findById);
app.post('/nmscs', nmscs.addNmsc);
app.put('/nmscs/:id', nmscs.updateNmsc);
app.delete('/nmscs/:id', nmscs.deleteNmsc);

app.get('/countries/:id', countries.getCountry);

var api = require('osb-api');
app.get('/api', api.sayHello);

var port = Number(process.env.PORT || 3000);

app.listen(port);
winston.log('info', 'Listening on port ' + port + '...');