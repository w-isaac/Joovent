module.exports = get_WebsiteRepository;
var util = require('util'),
    repositoryBase = require('./_repositoryBase')(),
    schemaService = require('./../services/schemaService')(),
    mongoose = require('mongoose');

var _repository;
function get_WebsiteRepository() {
    if (!_repository) {

        util.inherits(WebsiteRepository, repositoryBase);
        _repository = new WebsiteRepository();
    }
    return _repository;
}

function WebsiteRepository() {
    var t = this;
    t.name = "Websites";
    t.eventSchema = GetEventSchema();
    t.schema = GetSchema();
    t.CreateOrUpdate = t._createOrUpdate;
    t.Get = Get;
    t.GetById = GetById;
    t.Remove = t._remove;
    t.RemoveById = t._removeById;

    Init();
    function Init() {
        t._init(t.name, schemaService.Create(t.schema));
        t.eventSchema = schemaService.Create(t.eventSchema)
    }

    function Get(conditions, callback) {
        return this._get(conditions, null, null, callback);
    }

    function GetById(id, callback) {
        return this._getById(id, null, null, callback);
    }

    function GetSchema() {
        return  {'WebsiteName': String,
            'AccountId': Number,
            'ThemeId': mongoose.Schema.Types.ObjectId,
            'ActivateOn': {type: Date, default: Date.now},
            'DeactivateOn': {type: Date, default: null},
            'InternalUrl': String,
            'ExternalAuthority': String,
            'IsActive': Boolean,
            'Events':[t.eventSchema]
        };
    }

    function GetEventSchema() {
        return {
            "EventName": String,
            "EventStart": Date,
            "EventEnd": Date,
            "Capacity": Number,
            "EventType": [String],
            "IsActive":Boolean
        };

    }

    return t;
}
