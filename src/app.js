/**
 * Created by roexber on 1/07/14.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    url = require('url'),
    winston = require("winston");

require('./db');

exports.app = app = express();

winston.handleExceptions(new winston.transports.Console());

// parse application/json
app.use(bodyParser.json());

require("./routes");
