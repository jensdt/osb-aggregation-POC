require('./db');

var express = require('express'),
    bodyParser = require('body-parser'),
    countries = require('./routes/countries'),
    nmscs = require('./routes/nmscs');

var app = express();

// parse application/json
app.use(bodyParser.json());

app.get('/nmscs', nmscs.findAll);
app.get('/nmscs/:id', nmscs.findById);
app.post('/nmscs', nmscs.addNmsc);
app.put('/nmscs/:id', nmscs.updateNmsc);
app.delete('/nmscs/:id', nmscs.deleteNmsc);

app.get('/countries/:id', countries.getCountry);

var api = require('osb-api');
/*app.get('/api', api.sayHello);*/

var port = Number(process.env.PORT || 3000);

app.listen(port);
console.log('Listening on port ' + port + '...');