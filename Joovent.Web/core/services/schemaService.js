module.exports = CreateSchemaService;
var mongoose = require('mongoose');
var _schemaService;
function CreateSchemaService() {
    if (!_schemaService)
        _schemaService = new SchemaService();
    return _schemaService;
};

function SchemaService() {
    var t = this;
    t.Create = CreateSchema;
    function CreateSchema(schemaProperties) {
        var _sc = schemaProperties;
        _sc.CreatedOn = Date;
        _sc.LastUpdatedOn = Date;
        var schema = new mongoose.Schema(schemaProperties);
        return schema;
    };
    return t;
};