/**
 * Created by roexber on 27/06/14.
 */
var async = require('async'),
    winston = require("winston"),
    countries = require('./countries'),
    nmscs = require('./nmscs');

exports.getNmscWithCountryAsync = function (req, res) {
    winston.profile('asyncParallel');
    async.parallel({
            country: function (callback) {
                countries.getNmscCountry("53a7f1a1e6b5c2024d8f043e", callback);
            },nmsc: function (callback) {
                nmscs.getNmsc("53a7f1a1e6b5c2024d8f043e", callback);
            }

        },
        function (err, results) {
            results.nmsc.country = results.country;
            res.send(results.nmsc);
            winston.profile('asyncParallel');
        });
}