var utils = require('./utils');
var cache = {};
var Memcached = require('memcached');

module.exports = function (config) {

    var memcachedAddr = config.host || 'localhost';
    var memcachedPort = config.port || '11211';
    var memcached = new Memcached(memcachedAddr + ':' + memcachedPort);

    var self = this;

    self.get = function (key, cb) {
        if (!cache[key]) {
            memcached.get(key, function (err, data) {
                if (err) throw err;
                if (!data) {
                    cache[key] = "_N";
                    return cb(null, null);
                }
                data = JSON.parse(data);
                cache[key] = data.key;
                return cb(null, utils.clone(cache[key]));
            });
        } else if (cache[key] == "_N") {
            return cb(null, null);
        } else {
            return cb(null, utils.clone(cache[key]));
        }
    }
    self.set = function (key, value, ttl, cb) {
        cache[key] = value;
        var obj = {};
        obj = {key: value}
        value = JSON.stringify(obj);

        if (!ttl) {
            ttl = 24 * 60 * 60;
        }
        memcached.set(key, value, ttl, function (err) {
            if (err) {
                console.log("error", err);
                if (cb) cb(err);
            } else {
                if (cb) cb(null);
            }
        });
    }
    self.clear = function (key, cb) {
        if (cache[key]) {
            delete cache[key];
        }

        memcached.del(key, function (err, data) {
            if (err) throw err;
            delete cache[key];
            if (cb) cb();
        });
    }

    return self;
}
