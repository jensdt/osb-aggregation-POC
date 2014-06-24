/**
 * Created by roexber on 20/06/14.
 */
var mongoose = require('mongoose'),
    winston = require('winston');
var Nmsc = mongoose.model('Nmsc');


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

exports.findAll = function (req, res) {
    timings.profile('findAllNmscs')
    Nmsc.find(function (err, nmscs, count) {
        res.send(nmscs);
        timings.profile('findAllNmscs')
    });
};

exports.findById = function (req, res) {
    Nmsc.findById(req.params.id, function (err, nmsc) {
        res.send(nmsc);
    });
};

exports.addNmsc = function (req, res) {
    logger.log('POST: ' + req.body);
    logger.log(req.body);

    var nmsc = new Nmsc();
    bindReqParams(req, nmsc);
    saveNmsc(nmsc, res);
};

exports.updateNmsc = function (req, res) {
    logger.log('PUT: ' + req.body);
    logger.log(req.body);

    Nmsc.findById(req.params.id, function (err, nmsc) {
        bindReqParams(req, nmsc);
        saveNmsc(nmsc, res);
    });
};

exports.deleteNmsc = function (req, res) {
    logger.log('DELETE:' + req.params.id);

    Nmsc.findById(req.params.id, function (err, nmsc) {
        nmsc.remove(function (err, nmsc) {
            res.redirect('/nmscs');
        });
    });
};

var saveNmsc = function (nmsc, res) {
    nmsc.save(function (err, nmsc, count) {
        res.redirect('/nmscs');
    });
}

var bindReqParams = function (req, nmsc) {
    nmsc.name = req.body.name;
    nmsc.code = req.body.code;
}