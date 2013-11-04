module.exports = CreateSchemaService;
var mongoose = require('mongoose'),
    fs = require("fs"),
    path = require("path") ,
    xml2js = require("xml2js"),
    _ = require('underscore'),
    common = require('./../common');

var _schemaService;
function CreateSchemaService() {
    if (!_schemaService)
        _schemaService = new SchemaService();
    return _schemaService;
};

function SchemaService() {
    var t = this,
        schemaContainer = [],
        schemaPath;
    t.Create = CreateSchema;
    t.GetByKey = GetSchemaByKey;
    Init();
    function Init() {
        var parser = new xml2js.Parser();
        var rp = global.configurationService.Get("Data.SchemaPath");
        var ap = common.pathHelpers.ResolvePath(rp)
        LoadSchemas(ap);
    }

    //Load all Schemas first before loading SchemaFileRefs
    function LoadSchemas(path) {
        var schemaConfigFile = fs.readFileSync(path)
        ingestSchema(schemaConfigFile);
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

    function ingestSchema(schemaConfigFile) {
        var parser = new xml2js.Parser();
        parser.parseString(schemaConfigFile, function (err, data) {
            var schemas = data.Schemas.Schema;
            var schemaFileRefs = data.Schemas.SchemaFileRef;
            for (var s in schemas) {
                var sp = {};
                var schemaProperties = _.reduce(schemas[s].Fields[0].Field, function (memo, field) {
                        memo[field.$.Name] = mapMongooseFieldType(field.$);
                        return memo;
                    },
                    sp
                );

                var schema = CreateSchema(schemaProperties);
                schemaContainer.push({Key: schemas[s].$.Key, Schema: schema});
            }
            for (var s in schemaFileRefs) {
                var ap = common.pathHelpers.ResolvePath(schemaFileRefs[s].$.Path);
                LoadSchemas(ap);
            }
        });
    }


    function mapMongooseFieldType(attr) {
        var type = attr.Type.toLowerCase().replace("[", "").replace("]", "");
        var isArray = attr.Type.indexOf("[") == 0 && attr.Type.indexOf("]") == attr.Type.length - 1;
        var isIndex = (attr.IsIndex == "true"); // Yes, ugly but casting from string to bool in JS is a bitch
        var field = {};
        switch (type) {
            case "string":
                field.type = isArray ? [String] : String;
                break;
            case "date":
                field.type = isArray ? [Date] : Date;
                break;
            case "objectid":
                field.type = isArray ? [mongoose.Schema.Types.ObjectId] : mongoose.Schema.Types.ObjectId;
                break;
            case "number":
                field.type = isArray ? [Number] : Number;
                break;
            case "mixed":
                field.type = isArray ? [mongoose.Schema.Types.Mixed] : mongoose.Schema.Types.Mixed;
                break;
            case "buffer":
                field.type = isArray ? [Buffer] : Buffer;
                break;
            case "boolean":
                field.type = isArray ? [Boolean] : Boolean;
                break;
            case "reference":
                var referenceType = _.findWhere(schemaContainer, {Key: attr.ReferenceKey});
                if (!referenceType)
                    throw new Error("Schema Reference for " + attr.Name + " not found. Check the order of schema definition and try again.");
                else
                    field.type = [referenceType.Schema];
                break;
            default:
                field.type = isArray ? [Schema.Types.Mixed] : Schema.Types.Mixed;
                break;
        }
        if (isIndex) {
            field.index = true;
        }
        return field;
    }

    return t;
};