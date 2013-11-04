var should = require("should"), path = require("path"), sequelize = require('sequelize');

describe("User Repository", function () {
    var repository, id;
    var userMock = {
        "username": "tester1@joovent.com",
        'email': "tester1@joovent.com",
        'password': 'qwerty',
        'firstname': 'Tester',
        'lastname': 'One'
    };

    before(function (done) {
        process.env.ROOT_PATH = path.join(__dirname, "./../../Joovent.Web");

        require('./../../Joovent.Web/core/startup')(path.join(__dirname, './../configuration/config.json'), function () {
            repository = require("./../../Joovent.Web/core/repositories").userRepository();

            //Remove all duplicate key entries
            repository.Remove({email: 'tester1@joovent.com'}, function (data, error) {
                if (error) done(error);
                done();
            });
        });
    });
    describe("Create", function () {
        it("single item successfully", function (done) {
            repository.Create(userMock, function (data, error) {
                if (error) done(error);
                should.not.exist(error);
                should.exist(data);
                done();
            });
        });
    });
    describe("Get", function () {
        it("single item by condition successfully", function (done) {
            repository.Get({"username": "tester1@joovent.com"}, function (data, error) {
                if (error)done(error);
                should.not.exist(error);
                should.exist(data);
                should.exist(data[0].id);
                id = data[0].id;
                done();
            });
        });
        it("single item by id successfully", function (done) {
            repository.GetById(id, function (data, error) {
                if (error)done(error);
                should.not.exist(error);
                should.exist(data);
                done();
            });
        });
    });
    describe("Update", function () {
        it("single item by id", function (done) {
            repository.Update({id: id}, {"firstname": "Noel"}, function (data, error) {
                if (error)done(error);
                should.not.exist(error);
                done();
            });
        });
    });

    describe("Remove", function () {
        it("single item by id", function (done) {
            repository.Remove({id: id}, function (data, error) {
                if (error)done(error);
                should.not.exist(error);
                done();
            });
        });
    });
    after(function (done) {
        require('./../../Joovent.Web/core/startup').dispose();
        done();
    });
});