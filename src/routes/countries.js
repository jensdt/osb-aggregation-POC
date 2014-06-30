var restify = require('restify'),
    winston = require('winston');

var client = restify.createJsonClient({
    url: 'http://powerful-refuge-3004.herokuapp.com:80',
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
            winston.log('GET     /api/countries/' + countryId + ' returned: %j', country);
            resp.send(country);
        }
        winston.profile('getCountry');
    });
};

exports.getNmscCountry = function (nmscId, callback) {
    client.get('/api/countries/3cfd47a9-f164-4cea-b1a9-5bfd3d8029d3', function (err, req, res, country) {
        callback(null, country);
    });
};
