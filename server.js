require('./src/db');

var express = require('express'),
    bodyParser = require('body-parser'),
    url = require('url'),
    winston = require("winston");

exports.app = app = express();

winston.handleExceptions(new winston.transports.Console());

// parse application/json
app.use(bodyParser.json());

require("./src/routes");

var enableDocs = process.env.SWAGGER_URI;
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