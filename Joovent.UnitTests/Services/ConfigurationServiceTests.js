var should = require("should"), path = require("path");
var config;
describe("Configuration Service", function () {
    describe("Load", function () {
        it("should load configuration successfully", function () {
            var configPath = path.join(__dirname, "../mocks/configMock.json");
            config = require('./../../Joovent.Web/services/configurationService').Init(configPath);
            should.exist(config);
        });
    });
    describe("Get", function(){
       it("should load single node successfully",function(){
           var val = config.Get("test");
           val.should.equal("value");
       });
        it("should load descendant node successfully",function(){
            var val = config.Get("test1.test2.test3");
            val.should.equal("reached");
        });
        it("should load all nodes if null is passed in as key",function(){
            var val = config.Get();
            should.exist(val);
        });
    });
});