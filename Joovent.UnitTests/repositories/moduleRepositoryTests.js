var should = require("should"), path = require("path"),mongoose = require('mongoose');

describe("Module Repository", function () {
    var repository, id;
    var moduleMock = {
        "ModuleName": "RSVP",
        "ModuleTypeName": "RSVP.Module",
        'RequireSSL': false,
        'ModuleCategory': "Party",
        'DefaultView': "Start.html",
        'Scope': "All",
        'Author': 'Jeremy Horn',
        'ImageUrl': "http://www.abc.com/sds.png",
        'IsActive':true,
        'ContentTypes': [
            {
                'Name': 'What is your favorite color?',
                'Category': 'General',
                'IsRequired': true,
                'ValueType': [
                    {
                        'ValueTypeName': 'Color',
                        'Version': 0,
                        'ControlTemplate': [
                            {
                                'ControlKey': 'ColorPicker',
                                'FileSource': 'CommonControls.html',
                                'Parameters': [
                                    {
                                        'Key': 'ShowTitle',
                                        'Value': true
                                    },
                                    {
                                        'Key': 'ShowFooter',
                                        'Value': false
                                    }
                                ]
                            }
                        ]
                    }
                ],
                'DefaultValue': '#000000',
                'Order': 1
            } ,
            {
                'Name': 'What is your secondary color?',
                'Category': 'General',
                'IsRequired': true,
                'ValueType': [
                    {
                        'ValueTypeName': 'Color',
                        'Version': 0,
                        'ControlTemplate': [
                            {
                                'ControlKey': 'ColorPicker',
                                'FileSource': 'CommonControls.html',
                                'Parameters': [
                                    {
                                        'Key': 'ShowTitle',
                                        'Value': true
                                    },
                                    {
                                        'Key': 'ShowFooter',
                                        'Value': false
                                    }
                                ]
                            }
                        ]
                    }
                ],
                'DefaultValue': '#000000',
                'Order': 2
            }
        ],
        'Resources': [
            {
                'FileName': "Picture1.jpg",
                'FileUrl': 'Picture1.jpg',
                'MatchUrl': 'Picture1.jpg',
                'ResourceType': 'Image'
            },
            {
                'FileName': "Picture2.jpg",
                'FileUrl': 'Picture2.jpg',
                'MatchUrl': 'Picture2.jpg',
                'ResourceType': 'Image'
            }
        ],
        'Views': [
            {
                'ViewName': 'Main',
                'IsDefault': true,
                'MatchUrl': 'main.html',
                'FileName': 'main.html',
                'FileUrl': 'main.html',
                'PageTitle': 'Main',
                'Resources': [
                    {
                        'FileName': "main.css",
                        'FileUrl': 'main.css',
                        'MatchUrl': 'main.css',
                        'ResourceType': 'Css'
                    },
                    {
                        'FileName': "main.js",
                        'FileUrl': 'main.js',
                        'MatchUrl': 'main.js',
                        'ResourceType': 'Javascript'
                    }
                ]
            }
        ]
    };

    before(function (done) {
        process.env.ROOT_PATH = path.join(__dirname,"./../../Joovent.Web");

        require('./../../Joovent.Web/core/startup')(path.join(__dirname, './../configuration/config.json'), function () {
            repository = require("./../../Joovent.Web/core/repositories").moduleRepository();
            done();
        });
    });
    describe("Create", function () {
        it("single item successfully", function (done) {
            repository.CreateOrUpdate(null, moduleMock, function (error, data) {
                if (error) done(error);
                should.not.exist(error);
                should.exist(data);
                should.exist(data._doc);
                done();
            });
        });
    });
    describe("Get", function () {
        it("single item by condition successfully", function (done) {
            repository.Get({"ModuleName": "RSVP"}, function (error, data) {
                if (error)done(error);
                should.not.exist(error);
                should.exist(data);
                should.exist(data[0]._id);
                id = data[0]._id;
                done();
            });
        });
        it("single item by id successfully", function (done) {
            repository.GetById(id, function (error, data) {
                if (error)done(error);
                should.not.exist(error);
                should.exist(data);
                done();
            });
        });
    });
    describe("Update", function () {
        it("single item by id", function (done) {
            repository.CreateOrUpdate(id, {"ModuleName": "RSVP Module"}, function (error, data) {
                if (error)done(error);
                should.not.exist(error);
                should.exist(data);
                done();
            });
        });
    });

   describe("Remove", function () {
        it("single item by id", function (done) {
            repository.Remove(id, function (error, data) {
                if (error)done(error);
                should.not.exist(error);
                done();
            });
        });
    });
    after(function(done){
        require('./../../Joovent.Web/core/startup').dispose();
        done();
    });
});