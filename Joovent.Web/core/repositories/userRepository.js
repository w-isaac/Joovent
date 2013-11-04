module.exports = get_UserRepository;
var user = require('./../models').User,
    util = require('util'),
    repositoryBase = require('./_sequelizeRepositoryBase')(),
    _repository;
function get_UserRepository() {
    if (!_repository) {

        util.inherits(UserRepository, repositoryBase);
        _repository = new UserRepository();
    }
    return _repository;
}

function UserRepository() {
    var t = this;

    t.name = "Users";
    t.Get = t._get;
    t.GetById = t._getById;
    t.Create = t._create;
    t.Update = t._update;
    t.Remove = t._remove;

    Init();

    function Init() {
       var model = user();
        t._init(t.name, model);
    }

    return t;
}
