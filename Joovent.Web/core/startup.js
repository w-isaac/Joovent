module.exports = Initialize;

var mongoose = require("mongoose"),
    configurationService = require('./services/configurationService');

var configService;

function Initialize(configPath, onInitComplete) {
    var cp = configPath || process.env.CONFIG_PATH;
    InitConfiguration(cp);
    InitMongoose(function () {
        if (onInitComplete) onInitComplete();
    });
}
function InitConfiguration(configPath) {
    configService = configurationService.Init(configPath);
}

function InitMongoose(callback) {
    var mongoUri = process.env.MONGOHQ_URL || configService.Get("Data.MongoHQ.Url");
    mongoose.connect(mongoUri);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connection to Database successful.");
        if (callback)
            callback();
    })
}

