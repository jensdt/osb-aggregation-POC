var restify = require('restify');

var client = restify.createJsonClient({
    url: 'http://mysterious-sands-1012.herokuapp.com:80',
    version: '~1.0'
});

exports.getCountry = function (req, resp) {
    console.log('in get Country');
    var countryId = req.params.id;
    client.get('/country/' + countryId, function (err, req, res, country) {
        if (err) {
            console.log("An error ocurred:", err);
        } else {
            console.log('GET     /country/' + countryId + ' returned: %j', country);
            resp.send(country);
        }
    });
}
