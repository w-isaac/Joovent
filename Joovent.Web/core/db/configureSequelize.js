module.exports = function (onInitComplete) {
    if (!global.db.Sequelize) {
        console.log("...PostgreSQL");
        var Sequelize = require('sequelize'),
            sequelize = null,
            postgreConfiguration = global.configurationService.Get("Data.PostgreSQL");

        sequelize = new Sequelize(postgreConfiguration.Database,
            postgreConfiguration.UserName,
            postgreConfiguration.Password, {
                dialect: 'postgres',
                host: postgreConfiguration.Host,
                logging: postgreConfiguration.Logging
            });

        global.db.Sequelize = Sequelize;
        global.db.sequelize = sequelize;
        global.db.Models = {
            User: sequelize.import(__dirname + './../models/user')
        };

        /*
         Associations can be defined here. E.g. like this:
         global.db.User.hasMany(global.db.SomethingElse)
         */
        console.log("Synchronizing Sequelize Tables")
        sequelize.sync().complete(function () {

            console.log("...synchronization complete")
            onInitComplete();

        }).error(function (err) {
                onInitComplete(err);
            });
    }
}
module.exports.Dispose = function () {
    console.log("...PostgreSQL");
    global.db.Sequelize = null;
    global.db.sequelize = null;
}
