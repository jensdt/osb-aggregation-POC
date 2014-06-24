var restify = require('restify'),
    winston = require('winston');

var timings = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({ filename: 'logs/timings.log' })
    ]
});

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: 'logs/osb-aggregation.log' })
    ]
});

var client = restify.createJsonClient({
    url: 'http://mysterious-sands-1012.herokuapp.com:80',
    version: '~1.0'
});

exports.getCountry = function (req, resp) {
    timings.profile('getCountry');
    logger.log('in get Country');
    var countryId = req.params.id;
    client.get('/country/' + countryId, function (err, req, res, country) {
        if (err) {
            logger.log("An error ocurred:", err);
        } else {
            logger.log('GET     /country/' + countryId + ' returned: %j', country);
            resp.send(country);
        }
        timings.profile('getCountry');
    });
}
