/**
 * Created by roexber on 20/06/14.
 */
var mongoose = require('mongoose'),
    winston = require('winston');
var Nmsc = mongoose.model('Nmsc');

exports.findAll = function (req, res) {
    winston.profile('findAllNmscs');
    Nmsc.find(function (err, nmscs, count) {
        res.send(nmscs);
        winston.profile('findAllNmscs');
    });
};

exports.findById = function (req, res) {
    Nmsc.findById(1, function (err, nmsc) {
        res.send(nmsc);
    });
};

exports.addNmsc = function (req, res) {
    winston.log('POST: ' + req.body);
    winston.log(req.body);

    var nmsc = new Nmsc();
    bindReqParams(req, nmsc);
    saveNmsc(nmsc, res);
};

exports.updateNmsc = function (req, res) {
    winston.log('PUT: ' + req.body);
    winston.log(req.body);

    Nmsc.findById(req.params.id, function (err, nmsc) {
        bindReqParams(req, nmsc);
        saveNmsc(nmsc, res);
    });
};

exports.deleteNmsc = function (req, res) {
    winston.log('DELETE:' + req.params.id);

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
};

var bindReqParams = function (req, nmsc) {
    nmsc.name = req.body.name;
    nmsc.code = req.body.code;
};

exports.getNmsc = function (nmscId, callback) {
    Nmsc.findById(nmscId).lean().exec(function (err, nmsc) {
        winston.log('info', 'mongoose nmsc:' + nmsc);
        callback(null, nmsc);
    });
};