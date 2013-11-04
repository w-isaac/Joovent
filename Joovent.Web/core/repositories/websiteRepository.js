module.exports = get_WebsiteRepository;
var util = require('util'),
    repositoryBase = require('./_mongooseRepositoryBase')(),
    schemaService = require('./../services').schemaService();

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
    t.CreateOrUpdate = t._createOrUpdate;
    t.Get = Get;
    t.GetById = GetById;
    t.Remove = t._remove;
    t.RemoveById = t._removeById;

    Init();
    function Init() {
        t._init(t.name, schemaService.GetByKey("Websites"));
    }

    function Get(conditions, callback) {
        return this._get(conditions, null, null, callback);
    }

    function GetById(id, callback) {
        return this._getById(id, null, null, callback);
    }
    return t;
}
