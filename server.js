require('./src/db');

var express = require('express'),
    bodyParser = require('body-parser'),
    winston = require("winston"),
    countries = require('./src/routes/countries'),
    nmscs = require('./src/routes/nmscs'),
    dealers = require('./src/routes/dealers'),
    aggregate = require('./src/routes/aggregate'),
    url = require('url');

exports.app = app = express();

winston.handleExceptions(new winston.transports.Console);

// parse application/json
app.use(bodyParser.json());

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

var api = require('osb-api');
app.get('/api', api.sayHello);

var enableDocs = process.env.ENABLE_DOCS;
winston.log('info', enableDocs);
if (enableDocs !== undefined) {
    require("./docs/generate-docs.js");

    // Serve up swagger ui at /docs via static route
    var docs_handler = express.static('./docs/swagger-ui/');
    app.get(/^\/docs(\/.*)?$/, function (req, res, next) {
        if (req.url === '/docs') { // express static bars on root url w/o trailing
            // slash
            res.writeHead(302, {
                'Location': req.url + '/'
            });
            res.end();
            return;
        }
        // take off leading /docs so that connect locates file correctly
        req.url = req.url.substr('/docs'.length);
        return docs_handler(req, res, next);
    });
}

var port = Number(process.env.PORT || 3000);
app.listen(port);
winston.log('info', 'Listening on port ' + port + '...');