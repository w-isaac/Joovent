module.exports = get_ThemeRepository;
var util = require('util'),
    repositoryBase = require('./_mongooseRepositoryBase')(),
    schemaService = require('./../services').schemaService();

var _repository;
function get_ThemeRepository() {
    if (!_repository) {

        util.inherits(ThemeRepository, repositoryBase);
        _repository = new ThemeRepository();
    }
    return _repository;
}

function ThemeRepository() {
    var t = this;
    t.name = "Themes";

    t.CreateOrUpdate = t._createOrUpdate;
    t.Get = Get;
    t.GetById = GetById;
    t.Remove = t._remove;
    t.RemoveById = t._removeById;

    Init();
    function Init() {
        t._init(t.name, schemaService.GetByKey("Themes"));
    }

    function Get(conditions, callback) {
        return this._get(conditions, null, null, callback);
    }

    function GetById(id, callback) {
        return this._getById(id, null, null, callback);
    }
    return t;
}
