module.exports = CreateService;
var mongoose = require("mongoose"),
    configurationService = require('./configurationService');

var _mds;
function CreateService() {
    if (!_mds)
        _mds = new MongooseDocumentService();
    return _mds;
}

function MongooseDocumentService() {
    var t = this, mongoUri;
    Init();
    function Init() {
        var config = configurationService();
        var mongoUri = process.env.MONGOHQ_URL || config.Get("Data.MongoHQ.Url");
        mongoose.connect(mongoUri);
        var db = mongoose.connection;
        db.on('error',console.error.bind(console,'connection error:'));
        db.once('open',function(){
            console.log("Connection to Database successful.");
        })
    }
    return t;
}
