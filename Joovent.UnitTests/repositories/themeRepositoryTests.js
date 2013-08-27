var should = require("should"), path = require("path");

describe("Theme Repository", function () {
    var repository, id;
    var themeMock = {
        "ThemeName": "Romance Gala",
        "MaxSupportedEvents": 3,
        'ThemeImageUrl': "http://images/chooseone.png",
        'EventType': "Gala",
        'ActivateOn': new Date(),
        'DeactivateOn': null,
        'Author': 'Jeremy Horn',
        'BaseUrl': "http://base/url"
    };

    before(function (done) {
        repository = require("./../../Joovent.Web/core/repositories/themeRepository")();
        require('./../../Joovent.Web/core/startup')(path.join(__dirname, './../configuration/config.json'), function () {
            done();
        });
    });
    describe("Create", function () {
        it("single item successfully", function (done) {
            repository.CreateOrUpdate(null, themeMock, function (error, data) {
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
            repository.Get({"ThemeName": "Romance Gala"}, function (error, data) {
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
            repository.CreateOrUpdate(id, {"ThemeName": "Midnight Gala"}, function (error, data) {
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