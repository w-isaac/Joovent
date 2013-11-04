module.exports.Init = InitConfigurationService;

var fs = require("fs"), _ = require("underscore");

var _configurationService;
function InitConfigurationService(configPath) {
    _configurationService = new ConfigurationService(configPath);
    //return _configurationService;
    global.configurationService = _configurationService;
}

function ConfigurationService(configPath) {
    var t = this,
        _config;
    t.Get = Get;
    Init(configPath);

    function Init(configPath) {
        var data = fs.readFileSync(configPath);
        _config = JSON.parse(data);
    }

    /*
     * Get returns mocks value based on a mocks key.
     * Usage: Pass in mocks key. If multi level, then use "." as a delimiter.
     * For example: Get("Database.Connection.Url")
     * */
    function Get(key) {
        if (key) {
            var keys = key.split(".");
            return _.reduce(keys, function (memo, item) {
                return memo[item]
            }, _config);
        }
        return _config;
    }

    return t;
}

