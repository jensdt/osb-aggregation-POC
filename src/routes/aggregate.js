/**
 * Created by roexber on 27/06/14.
 */
var _ = require("underscore"),
    async = require('async'),
    winston = require("winston"),
    countries = require('./countries'),
    nmscs = require('./nmscs');

exports.getNmscWithCountryAsync = function (req, res) {
    winston.profile('asyncParallel');
    async.parallel({
            nmsc: function (callback) {
                nmscs.getNmsc("53a7f1a1e6b5c2024d8f043e", callback);
            },
            country: function (callback) {
                countries.getNmscCountry("53a7f1a1e6b5c2024d8f043e", callback);
            }
        },
        function (err, results) {
            res.send(results);
            winston.profile('asyncParallel');
        });
}