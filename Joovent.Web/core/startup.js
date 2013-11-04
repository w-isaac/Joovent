module.exports = Initialize;
module.exports.dispose = Dispose;
var //mongoose = require("mongoose"),
//Sequelize = require("sequelize-postgres").sequelize,
    configurationService = require('./services').configurationService,
//repositoryManager = require('./repositoryManager').Manager,
    path = require('path'),
    db = require('./db');

var configService;

function Initialize(configPath, onInitComplete) {
    var cp = configPath || process.env.CONFIG_PATH;
    InitConfiguration(cp);
    InitDB(onInitComplete);
//    InitMongoose(function () {
//        InitSequelize(function () {
//            RegisterRepositories(function () {
//                if (onInitComplete)onInitComplete();
//            });
//        })
//    });

}

function InitConfiguration(configPath) {
    //configService = configurationService.Init(configPath);
    configurationService.Init(configPath);
}

function InitDB(onInitComplete) {
    db.Init(function () {
        if (onInitComplete)
            onInitComplete();
    });
}

//
//function InitMongoose(callback) {
//    var mongoUri = process.env.MONGOHQ_URL || configService.Get("Data.MongoDB.Url");
//    mongoose.connect(mongoUri);
//    var db = mongoose.connection;
//    db.on('error', console.error.bind(console, 'connection error:'));
//    db.once('open', function () {
//        console.log("Connection to Database successful.");
//        if (callback)
//            callback();
//    })
//}
//function RegisterRepositories(callback) {
//    var repositories = configService.Get('Data.Repositories');
//    for (var r in repositories) {
//        repositoryManager.RegisterRepository(repositories[r].name, repositories[r].path);
//    }
//    if (callback)
//        callback();
//
//}
//function InitSequelize(callback) {
//    var postgreConfiguration = configService.Get("Data.PostgreSQL");
//    var sequelize = new Sequelize(postgreConfiguration.Database,
//        postgreConfiguration.UserName,
//        postgreConfiguration.Password, {
//            dialect: 'postgres'
//        });
//
//    if (callback)
//        callback();
//}

function Dispose() {
    //Kill Mongoose Connection
   db.Dispose();

}
