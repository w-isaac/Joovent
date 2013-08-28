module.exports = CreateSchemaService;
var mongoose = require('mongoose'),
    fs = require("fs"),
    path = require("path") ,
    xml2js = require("xml2js"),
    configurationService = require('./configurationService')(),
    _ = require('underscore');

var _schemaService;
function CreateSchemaService() {
    if (!_schemaService)
        _schemaService = new SchemaService();
    return _schemaService;
};

function SchemaService() {
    var t = this, schemaContainer = [];
    t.Create = CreateSchema;
    t.GetByKey = GetSchemaByKey;
    Init();
    function Init() {
        LoadSchemas();
    }

    function LoadSchemas() {
        var parser = new xml2js.Parser();
        var schemaConfigFile = fs.readFileSync(path.join(__dirname, './metadata/schemas.xml'));
        parser.parseString(schemaConfigFile, function (err, data) {
            var schemas = data.Schemas.Schema;
            for (var s in schemas) {
                var id = schemas[s].$.Id;
                var key = schemas[s].$.Key;

                var sp = {};
                var schemaProperties = _.reduce(schemas[s].Fields[0].Field, function (memo, field) {
                        memo[field.$.Name] = MapMongooseFieldType(field.$.Type);
                        return memo;
                    },
                    sp
                );

                var schema = CreateSchema(schemaProperties);
                schemaContainer.push({Id: id, Key: key, Schema: schema});
            }
        });


    }

    function CreateSchema(schemaProperties) {
        var _sc = schemaProperties;
        _sc.CreatedOn = Date;
        _sc.LastUpdatedOn = Date;
        var schema = new mongoose.Schema(schemaProperties);
        return schema;
    };
    function GetSchemaByKey(key) {
        var result = _.findWhere(schemaContainer, {Key: key});
        if (result)
            return result.Schema;

        return null;
    }

    function MapMongooseFieldType(type) {
        switch (type.toLowerCase()) {
            case "string":
                return String;
            case "date":
                return Date;
            case "objectid":
                return mongoose.Schema.Types.ObjectId;
            case "number":
                return Number;
            default:
                return String;
        }
    }

    return t;
};