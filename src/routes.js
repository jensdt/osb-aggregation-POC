/**
 * Created by roexber on 1/07/14.
 */
var nmscs = require('./routes/nmscs'),
    countries = require('./routes/countries'),
    dealers = require('./routes/dealers'),
    aggregate = require('./routes/aggregate'),
    api = require('osb-api');

app.get("/", function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("OSB Aggregation POC");
});

app.get('/nmscs', nmscs.findAll);
app.get('/nmscs/:id', nmscs.findById);
app.post('/nmscs', nmscs.addNmsc);
app.put('/nmscs/:id', nmscs.updateNmsc);
app.delete('/nmscs/:id', nmscs.deleteNmsc);

app.get('/countries/:id', countries.getCountry);

app.get('/dealers/:id', dealers.getDealer);
app.get('/dealers/:id/dealerships', dealers.getDealerships);

app.get('/async/:id', aggregate.getNmscWithCountryAsync);

app.get('/api', api.sayHello);
