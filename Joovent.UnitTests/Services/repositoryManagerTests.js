var should = require("should"), path = require("path");
var config;
describe("Repository Manager", function () {
    var config, rm, webRoot, repositories;
    ;
    before(function (done) {
        webRoot = './../../Joovent.Web';
        var configPath = path.join(__dirname, "./../configuration/config.json");
        config = require(require('path').join(webRoot, '/core/services/configurationService')).Init(configPath);
        done();
    });
    describe("Initialization", function () {

        it("should initialize successfully", function () {
            rm = require(require('path').join(webRoot, './core/repositoryManager')).Manager;
            should.exist(rm);
        });
    });
    describe("Registration", function () {
        before(function (done) {
            repositories = config.Get('Data.Repositories');
            done();
        });
        it("should register repository successfully", function () {
            rm.RegisterRepository(repositories[0].name, repositories[0].path);
            rm.Count().should.be.equal(1);
        });
    });
    describe("Get Repository", function () {
        it("should get repository successfully", function () {
            var repo = rm.Get(repositories[0].name);
            should.exist(repo);
        });
    });
});