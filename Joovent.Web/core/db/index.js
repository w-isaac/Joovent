var mongooseLoaded,
    sequelizeLoaded,
    initComplete;

var dbLoaded = function () {
        if (mongooseLoaded && sequelizeLoaded) {
            initComplete();
        }
    },
    dbLoadError = function (err) {
        initComplete();
    };
exports.Init = function (onInitComplete) {
    console.log("Initializing Databases");
    if (!global.hasOwnProperty('db'))
        global.db = {};
    mongooseLoaded = false;
    sequelizeLoaded = false;
    initComplete = onInitComplete;

    require('./configureMongoose.js')(function (err) {
        if (!err) {
            mongooseLoaded = true;
            dbLoaded();
        }
        else
            dbLoadError(err);
    });
    require('./configureSequelize.js')(function (err) {

        if (!err) {
            sequelizeLoaded = true;
            dbLoaded();
        }
        else
            dbLoadError(err);
    });
}

exports.Dispose = function () {

    console.log("Closing Database Connections");
    require('./configureMongoose.js').Dispose();
    require('./configureSequelize.js').Dispose();

}


