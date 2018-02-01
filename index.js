const RedisComponentCache = require('./redis-component-cache')

module.exports = function nuxtRedisComponnetCache (options) {
  if (this.options.render.ssr === false) {
    // SSR Disabled
    return
  }

  // Create empty bundleRenderer object if not defined
  if (typeof this.options.render.bundleRenderer !== 'object' || this.options.render.bundleRenderer === null) {
    this.options.render.bundleRenderer = {}
  }

  // Disable if cache explicitly provided in project
  if (this.options.render.bundleRenderer.cache) {
    return
  }

  this.options.render.bundleRenderer.cache = RedisComponentCache(Object.assign({
    redis: {
      port: 6379,
      host: '127.0.0.1'
    },
    ttl: 1000 * 60 * 15
  }, options))
}