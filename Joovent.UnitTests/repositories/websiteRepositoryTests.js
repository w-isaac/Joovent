var should = require("should"), path = require("path");

describe("Website Repository", function () {
    var repository, id;
    var websiteMock = {
        "WebsiteName": "Splinter's Event",
        "ExternalAuthority": "http://www.splintersevent.com",
        'AccountId': 1,
        'ThemeId': null,
        'ActivateOn': new Date(),
        'DeactivateOn': null,
        'InternalUrl': '/splintersevent',
        'IsActive': true,
        'Events':[{
            "EventName": "First Event",
            "EventStart": new Date(),
            "EventEnd": new Date(),
            "Capacity": 30,
            "EventType": ['Party'],
            "IsActive":true
        }]
    };

    before(function (done) {
        repository = require("./../../Joovent.Web/core/repositories/websiteRepository")();
        require('./../../Joovent.Web/core/startup')(path.join(__dirname, './../configuration/config.json'), function () {
            done();
        });
    });
    describe("Create", function () {
        it("single item successfully", function (done) {
            repository.CreateOrUpdate(null, websiteMock, function (error, data) {
                if (error) done(error);
                should.not.exist(error);
                should.exist(data);
                should.exist(data._doc);
                done();
            });
        });
    });
    describe("Get", function () {
        it("single item by condition successfully", function (done) {
            repository.Get({"WebsiteName": "Splinter's Event"}, function (error, data) {
                if (error)done(error);
                should.not.exist(error);
                should.exist(data);
                should.exist(data[0]._id);
                id = data[0]._id;
                done();
            });
        });
        it("single item by id successfully", function (done) {
            repository.GetById(id, function (error, data) {
                if (error)done(error);
                should.not.exist(error);
                should.exist(data);
                done();
            });
        });
    });
    describe("Update", function () {
        it("single item by id", function (done) {
            repository.CreateOrUpdate(id, {"WebsiteName": "Shinobi's Dinner"}, function (error, data) {
                if (error)done(error);
                should.not.exist(error);
                should.exist(data);
                done();
            });
        });
    });

   describe("Remove", function () {
        it("single item by id", function (done) {
            repository.Remove(id, function (error, data) {
                if (error)done(error);
                should.not.exist(error);
                done();
            });
        });
    });
    after(function(done){
        require('./../../Joovent.Web/core/startup').dispose();
        done();
    });
});