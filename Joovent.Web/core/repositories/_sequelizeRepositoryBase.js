module.exports = get_RepositoryBase;
var sequelize = require('sequelize');

function _RepositoryBase() {

}

_RepositoryBase.prototype._init = function (name, model) {
    this.Name = name;
    this.Model = model;
}

_RepositoryBase.prototype._create = function (modelproperties, callback) {
    this.Model.create(modelproperties).success(function (model) {
        if (callback)
            callback(model, null);
    }).error(function (error) {
            if (callback)
                callback(null, error);
        });
}

_RepositoryBase.prototype._update = function (criteria, modelproperties, callback) {
    this.Model.update(modelproperties, criteria).success(function (model) {
        if (callback)
            callback(model, null);
    }).error(function (error) {
            if (callback)
                callback(null, error);
        });
}

_RepositoryBase.prototype._remove = function (criteria, callback) {
    this.Model.destroy(criteria).success(function (model) {
        if (callback)
            callback(model, null);
    }).error(function (error) {
            if (callback)
                callback(null, error);
        });
}
_RepositoryBase.prototype._get = function (criteria, callback) {
    this.Model.findAll({where: criteria}).success(function (model) {
        if (callback)
            callback(model, null);
    }).error(function (error) {
            if (callback)
                callback(null, error);
        });
}
_RepositoryBase.prototype._getById = function (id, callback) {
    this.Model.find(id).success(function (model) {
        if (callback)
            callback(model, null);
    }).error(function (error) {
            if (callback)
                callback(null, error);
        });
}
//Additional fields (create or update)
function get_RepositoryBase() {
    return _RepositoryBase;
}