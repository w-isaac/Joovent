module.exports = function (onInitComplete) {
    if (!global.db.Mongoose) {
        console.log("...MongoDB");
        var mongoose = require("mongoose");
            //configService = require('./../services').configurationService();

        var mongoUri = process.env.MONGOHQ_URL || global.configurationService.Get("Data.MongoDB.Url");
        mongoose.connect(mongoUri);
        var db = mongoose.connection;
        db.on('error', function (err) {
            console.error.bind(console, 'connection error:')
            onInitComplete(err);
        });
        db.once('open', function () {
            console.log("Connection to MongoDB successful.");
            global.db.Mongoose = mongoose;
            global.db.mongoosedb = db;
            onInitComplete();
        });
    }
}
module.exports.Dispose = function(){
    console.log("...MongoDB")
    global.db.Mongoose.connection.close();
    global.db.Mongoose = null;
    global.db.mongoosedb = null;
}