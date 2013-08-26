module.exports = get_RepositoryBase;

var mongoose = require('mongoose');
function _RepositoryBase(name, schema) {
    this.Init(this.Name, this.Schema);
}
_RepositoryBase.prototype._init = function (name, schema) {
    this.Name = name;
    this.Schema = schema;
    this.Model = mongoose.model(this.Name, this.Schema);
}

_RepositoryBase.prototype._create = function (modelProperties, callback) {
    this.Model.create(modelProperties, function (error, data) {
        if (callback) callback(error, data);
    });
};

_RepositoryBase.prototype._update = function (conditions, modelProperties, options, callback) {
    this.Model.findOneAndUpdate(conditions, modelProperties, options, function (err, data) {
        if (callback)
            callback(err, data);
    });
};
_RepositoryBase.prototype._updateById = function (id, modelProperties, options, callback) {
    this.Model.findByIdAndUpdate(id, modelProperties, options, function (err, data) {
        if (callback)
            callback(err, data);
    });
};
_RepositoryBase.prototype._remove = function (conditions, callback) {
    this.Model.findOneAndRemove(conditions, null, function (err, data) {
        if (callback)
            callback(err, data);
    });
};
_RepositoryBase.prototype._removeById = function (id, callback) {
    this.Model.findByIdAndRemove(id, null, function (err, data) {
        if (callback)
            callback(err, data);
    });
};
_RepositoryBase.prototype._get = function (conditions, fields, options, callback) {
    return this.Model.find(conditions, fields, options, function (err, data) {
        if (callback)
            callback(err, data);
    });
}
_RepositoryBase.prototype._getById = function (id, fields, options, callback) {
    return this.Model.findById(id, fields, options, function (err, data) {
        if (callback)
            callback(err, data);
    });
}
_RepositoryBase.prototype._createOrUpdate = function (id, modelProperties, callback) {
    if (id) {
        this._updateById(id, modelProperties, null, function (err, data) {
            if (callback)
                callback(err, data);
        });
    }
    else {
        this._create(modelProperties, function (err, data) {
            if (callback)
                callback(err, data);
        });
    }
}

function get_RepositoryBase() {
    return _RepositoryBase;
};