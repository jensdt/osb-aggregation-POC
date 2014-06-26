var winston = require('winston');

exports.getDealer = function (req, resp) {
    winston.profile('getDealer');
    winston.log('in get Dealer');
    var dealer = getDealerJson(req);
    resp.send(dealer);
    winston.profile('getDealer');
};

var getDealerJson = function (req) {
    return {"_id": req.params.id, "name": "dealer"};
};

exports.getDealerships = function (req, resp) {
    winston.profile('getDealerships');
    winston.log('in get Dealerships');
    var dealerId = req.params.id;
    var dealerships = [
        {"_id": "345735343257575427", "name": "dealership1", "dealer": {"_id": dealerId}},
        {"_id": "345735343257575428", "name": "dealership2", "dealer": {"_id": dealerId}}
    ];
    resp.send(dealerships);
    winston.profile('getDealerships');
};