/**
 * Created by roexber on 20/06/14.
 */
var mongoose = require('mongoose');
var Nmsc = mongoose.model('Nmsc');

exports.findAll = function (req, res) {
    Nmsc.find(function (err, nmscs, count) {
        res.send(nmscs);
    });
};

exports.findById = function (req, res) {
    Nmsc.findById(req.params.id, function (err, nmsc) {
        res.send(nmsc);
    });
};

exports.addNmsc = function (req, res) {
    console.log('POST: ' + req.body);
    console.log(req.body);

    var nmsc = new Nmsc();
    bindReqParams(req, nmsc);
    saveNmsc(nmsc, res);
};

exports.updateNmsc = function (req, res) {
    console.log('PUT: ' + req.body);
    console.log(req.body);

    Nmsc.findById(req.params.id, function (err, nmsc) {
        bindReqParams(req, nmsc);
        saveNmsc(nmsc, res);
    });
};

exports.deleteNmsc = function (req, res) {
    console.log('DELETE:' + req.params.id);

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