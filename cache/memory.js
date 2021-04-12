var utils = require('./utils');

var cache = {};

module.exports = function () {
    var self = this;

    self.get = function (key, cb) {
        if (!cache[key]) return cb(null, null);
        if (cache[key]['ttl'] && cache[key]['created_on'] + cache[key]['ttl'] < new Date().getTime()) {
            delete cache[key];
            return cb(null, null);
        }
        return cb(null, utils.clone(cache[key]['value']));
    }

    self.set = function (key, value, ttl, cb) {
        var data = {value: value};
        if (ttl) {
            data.ttl = ttl;
            data.created_on = new Date()
        }
        cache[key] = data;
        if (cb) cb();
    }

    self.clear = function (key, cb) {
        delete cache[key];
        if (cb) cb();
    }

    return self;
}

