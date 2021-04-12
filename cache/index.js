var utils = require('./utils');
var cache = {
  type: 'memcache',
  config: {
    host: "",
    port: ""
  }
}

var cacheClient = null;
if (cache.type == "redis") {
    console.log('Inside redis cache');
}
else if (cache.type == 'memcache') {
    console.log('Inside memcache');
    cacheClient = require('./memcache')(cache.config);
}
else if (cache.type == 'memory') {
    cacheClient = require('./memory')();
} else {
    throw new Exception("Not a valid cache type");
}

var cacheConstructor = function (namespace) {
    var self = this;
    self.get = function (key, cb) {
        key = namespace + "++" + key;
        return cacheClient.get(key, cb);
    };
    self.set = function (key, value, cb=()=> {}, publish=true) {
        if (typeof cb === "boolean") {
            publish = cb;
            cb = ()=> {};
        }
        key = namespace + "++" + key;
        var value = utils.clone(value);
        return cacheClient.set(key, value, '', cb, publish);
    };
    self.clear = function (key, cb=()=> {}, publish=true) {
        key = namespace + "++" + key;
        if (typeof cb === "boolean") {
            publish = cb;
            cb = ()=> {};
        }
        return cacheClient.clear(key, cb, publish);
    };
};

module.exports = function (namespace) {
    if (!namespace) {
        throw new Error("namespace is required");
    }

    return new cacheConstructor(namespace);
}
