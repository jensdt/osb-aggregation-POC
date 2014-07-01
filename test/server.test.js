/**
 * Created by roexber on 1/07/14.
 */
var request = require("supertest"),
    app = require("../server").app,
    assert = require("chai").assert;

it("should return a 200 response", function (done) {
    request(app)
        .get("/")
        .expect(200, done);
});

it("should return 'OSB Aggregation POC' on base path", function (done) {
    request(app)
        .get("/")
        .end(function (err, res) {
            assert.isTrue(res.text.indexOf("OSB Aggregation POC") > -1);
            done();
        });
});