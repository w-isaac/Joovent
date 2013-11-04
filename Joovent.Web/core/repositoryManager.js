var _ = require('underscore');
module.exports.Manager = get_RepositoryManager();
var _repositoryManager;
function get_RepositoryManager() {
    if (!_repositoryManager) {
        _repositoryManager = new RepositoryManager();
    }
    return _repositoryManager;
}

function RepositoryManager() {
    var t = this;
    var catalog = [];
    t.Get = Get;
    t.Clear = Clear;
    t.RegisterRepository = RegisterRepository;
    t.Count = Count;
    function RegisterRepository(repositoryName, repositoryPath) {
        if (!_.findWhere(catalog, {'name': repositoryName})) {
            catalog.push({'name': repositoryName, 'path': repositoryPath});
        }
    }

    function Get(repositoryName) {
        var repo = _.findWhere(catalog, {'name': repositoryName});
        return require('./../' + repo.path)();
    }

    function Count() {
        return catalog.length;
    }

    function Clear() {
        catalog = [];
    }

    return t;
}
