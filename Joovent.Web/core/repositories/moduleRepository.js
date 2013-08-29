module.exports = get_ModuleRepository;
var util = require('util'),
    repositoryBase = require('./_repositoryBase')(),
    schemaService = require('./../services/schemaService')();

var _repository;
function get_ModuleRepository() {
    if (!_repository) {

        util.inherits(ModuleRepository, repositoryBase);
        _repository = new ModuleRepository();
    }
    return _repository;
}

function ModuleRepository() {
    var t = this;
    t.name = "Modules";

    t.CreateOrUpdate = t._createOrUpdate;
    t.Get = Get;
    t.GetById = GetById;
    t.Remove = t._remove;
    t.RemoveById = t._removeById;

    Init();
    function Init() {
        t._init(t.name, schemaService.GetByKey("Modules"));
    }

    function Get(conditions, callback) {
        return this._get(conditions, null, null, callback);
    }

    function GetById(id, callback) {
        return this._getById(id, null, null, callback);
    }

    return t;
}
