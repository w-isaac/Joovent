/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

//Joovent Services
process.env.CONFIG_PATH = path.join(__dirname, "/configuration/config.json");
require("./core/startup.js")(process.env.CONFIG_PATH, function () {
    //Initialization Complete Logic Here
});
/*
 var websiteRepository = require("./core/repositories/websiteRepository")();
 websiteRepository.CreateOrUpdate(null, {'name': 'test',
 'ExternalAuthority': 'test'}, function (e, o) {
 console.log("created " + o._id);
 if (e)
 console.log(e);
 else
 {
 websiteRepository.GetById(o._id, function (e2, o2) {
 console.log("retrieved " + o2._id);
 var id;
 if (!e) {
 id = o2._id;

 websiteRepository.CreateOrUpdate(id, {'ExternalAuthority': 'what test?'}, function (e3, o3) {
 console.log("updated");
 /*websiteRepository.RemoveById(id,function (e4,o4){
 console.log("removed");
 });*/
/*});

 }
 });
 }
 });               */


// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
