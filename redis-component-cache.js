'use strict'

module.exports = RedisComponentCache

var RedisClient = require('ioredis');

const hasSymbol = typeof Symbol === 'function'
var makeSymbol
if (hasSymbol) {
  makeSymbol = function (key) {
    return Symbol.for(key)
  }
} else {
  makeSymbol = function (key) {
    return '_' + key
  }
}

var REDIS = makeSymbol('redis')
var TTL = makeSymbol('ttl')

function RedisComponentCache (options) {
  if (!(this instanceof RedisComponentCache)) {
    return new RedisComponentCache(options)
  }

  this[REDIS] = new RedisClient(options.redis)
  this[TTL] = options.ttl || 3600
}

RedisComponentCache.prototype.set = function (key, val) {
  this[REDIS].set(key, val)
  this[REDIS].expire(key, this[TTL])
}

RedisComponentCache.prototype.get = function (key, cb) {
  this[REDIS].get(key).then((res) => {
    cb(res)
  })
}

RedisComponentCache.prototype.has = function (key, cb) {
  this[REDIS].exists(key).then((res) => {
    cb(1 === res)
  })
}
