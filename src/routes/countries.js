var restify = require('restify'),
    winston = require('winston');

var client = restify.createJsonClient({
    url: 'http://mysterious-sands-1012.herokuapp.com:80',
    version: '~1.0'
});

exports.getCountry = function (req, resp) {
    winston.profile('getCountry');
    winston.log('in get Country');
    var countryId = req.params.id;
    client.get('/country/' + countryId, function (err, req, res, country) {
        if (err) {
            winston.log("An error ocurred:", err);
        } else {
            winston.log('GET     /country/' + countryId + ' returned: %j', country);
            resp.send(country);
        }
        winston.profile('getCountry');
    });
};

exports.getNmscCountry = function (nmscId, callback) {
    client.get('/country/1', function (err, req, res, country) {
        callback(null, country);
    });
};
