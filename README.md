Node-REST-aggregation-POC
===================

NodeJS RESTful aggregation POC
Small example for aggregation of RESTful webservices using NodeJS.

Ready to be deployed to Heroku.
https://devcenter.heroku.com/articles/getting-started-with-nodejs

node modules:
express // handling GET PUT POST DELETE
mongoose // mongoDB connection
body-parser // converting from and to JSON
restify // calling RESTful webservices
winston // logging
osb-api // github dependency
async // parallel processing
swagger-node-express // documentation

run this app by using its default Grunt task:
grunt

if grunt is not recognized:
npm install -g grunt-cli

Testing done with
chai
mocha
supertest
