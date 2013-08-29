var should = require("should"), path = require("path");

describe("Module Repository", function () {
    var repository, id;
    var moduleMock = {
        "ModuleName": "RSVP",
        "ModuleTypeName": "RSVP.Module",
        'RequireSSL': false,
        'ModuleCategory': "Party",
        'DefaultView': "Start.html",
        'Scope': "All",
        'Author': 'Jeremy Horn',
        'ImageUrl': "http://www.abc.com/sds.png",
        'IsActive':true

    };

    before(function (done) {
        repository = require("./../../Joovent.Web/core/repositories/moduleRepository")();
        require('./../../Joovent.Web/core/startup')(path.join(__dirname, './../configuration/config.json'), function () {
            done();
        });
    });
    describe("Create", function () {
        it("single item successfully", function (done) {
            repository.CreateOrUpdate(null, moduleMock, function (error, data) {
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
            repository.Get({"ModuleName": "RSVP"}, function (error, data) {
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
            repository.CreateOrUpdate(id, {"ModuleName": "RSVP Module"}, function (error, data) {
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