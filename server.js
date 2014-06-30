require('./src/db');

var express = require('express'),
    bodyParser = require('body-parser'),
    winston = require("winston"),
    countries = require('./src/routes/countries'),
    nmscs = require('./src/routes/nmscs'),
    dealers = require('./src/routes/dealers'),
    aggregate = require('./src/routes/aggregate'),
    url = require('url'),
    swagger = require('swagger-node-express'),
    param = require("./node_modules/swagger-node-express/lib/paramTypes.js"),
    modelspec = require('./src/api/model-spec.js');
    app = express();

winston.handleExceptions(new winston.transports.Console);

// parse application/json
app.use(bodyParser.json());
//Couple the application to the Swagger module.
swagger.setAppHandler(app);
swagger.addModels(modelspec);
//set api info
swagger.setApiInfo({
	swaggerVersion: "2.1",
	title : "OSB Aggregation API Documentation"
});

app.get("/", function (req, res) {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end("OSB Aggregation POC");
});

app.get('/nmscs', nmscs.findAll);
var findAll = {
  'spec': {
	  method: "GET",
	  path : "/nmscs",
	  summary : "Get all Nmscs",
	  notes : "Get all Nmscs",
      description : "Operations about Nmscs",
      type : "array",
      items: {
        $ref: "Nmsc"
      },
      errorResponses : [swagger.errors.notFound('Nmsc')],
      nickname : "findAllNmscs"
  },
  'action': nmscs.findAll
};
app.get('/nmscs/:id', nmscs.findById);
var findNmscById = {
  'spec': {
	description : "Operations about Nmscs",
	path : "/nmscs/{nmscId}",
	notes : "Returns an Nmsc based on ID",
	summary : "Find Nmsc by ID",
	method: "GET",
	type : "Nmsc",
	parameters : [param.path("nmscId", "ID of the Nmsc that needs to be fetched", "string")],
	errorResponses : [swagger.errors.notFound('Nmsc')],
	nickname : "getNmscById"
  },
 'action': nmscs.findById
};
app.post('/nmscs', nmscs.addNmsc);
app.put('/nmscs/:id', nmscs.updateNmsc);
app.delete('/nmscs/:id', nmscs.deleteNmsc);

app.get('/countries/:id', countries.getCountry);

app.get('/dealers/:id', dealers.getDealer);
app.get('/dealers/:id/dealerships', dealers.getDealerships);

app.get('/async/:id', aggregate.getNmscWithCountryAsync);

var api = require('osb-api');
app.get('/api', api.sayHello);

swagger.addGet(findAll);
swagger.addGet(findNmscById);

//Configures the app's base path and api version.
swagger.configureSwaggerPaths("", "api-docs", "");
swagger.configure("http://localhost:3000", "1.0.0");
swagger.configureDeclaration('nmscs', {
	description: 'Operations about Nmscs'
});
// Serve up swagger ui at /docs via static route
var docs_handler = express.static('./swagger-ui/');
app.get(/^\/docs(\/.*)?$/, function(req, res, next) {
	if (req.url === '/docs') { // express static bars on root url w/o trailing
		// slash
		res.writeHead(302, {
			'Location' : req.url + '/'
		});
		res.end();
		return;
	}
	// take off leading /docs so that connect locates file correctly
	req.url = req.url.substr('/docs'.length);
	return docs_handler(req, res, next);
});

var port = Number(process.env.PORT || 3000);

app.listen(port);
winston.log('info', 'Listening on port ' + port + '...');