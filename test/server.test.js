/**
 * Created by roexber on 1/07/14.
 */
var request = require("supertest"),
    app = require("../server").app,
    assert = require("chai").assert;

it("Server can return a 200 response", function (done) {
    request(app)
        .get("/")
        .expect(200, done);
});

it("Server returns 'OSB Aggregation POC' on base path", function (done) {
    request(app)
        .get("/")
        .end(function (err, res) {
            assert.isTrue(res.text.indexOf("OSB Aggregation POC") > -1);
            done();
        });
});