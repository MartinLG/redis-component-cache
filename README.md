# redis-component-cache
[Nuxt](https://nuxtjs.org) module to cache components in Redis.

> **Disclaimer**: This module does't not work yet, because of an issue in VueJS SSR: https://github.com/vuejs/vue/issues/7595.

## Setup

* Add the redis-component-cache package to your dependencies with npm or yarn:

```bash
# With npm
npm install redis-component-cache --save
# With yarn
yarn add redis-component-cache
```

* Add the module to your ```nuxt.config.js``` and configure the Redis connection:

```javascript
{
  modules: [
    // Simple usage, Redis at localhost:6379, TTL at 15 minutes
    'redis-component-cache',
    
    // With custom TTL: 60 minutes
    ['redis-component-cache', { ttl: 1000 * 60 * 60 }],
    
    //With custom Redis connection
    ['redis-component-cache', {
      redis: {
        port: 6379,
        host: '127.0.0.1'
      }
    }],
    
    //With custom Redis connection and TTL
    ['redis-component-cache', {
      redis: {
        port: 6379,
        host: '127.0.0.1'
      },
      ttl: 1000 * 60 * 60
    }],
  ]
}
```

This module uses [ioredis](https://github.com/luin/ioredis), and is compatible with all the ioredis connection modes (TLS, sentinel...).

This means, the ```redis``` module option takes the same parameters as the ```ioredis``` object.
Follow the [ioredis connection documentation](https://github.com/luin/ioredis#connect-to-redis) to know more about the possible options.

## Cache a component

To cache a component, you need only 2 things:

* Your component must have a unique name
* Your component must have a ```serverCacheKey``` function

Example:

```javascript
<template>
  <div>
    <p>{{ item.message }}</p>
  </div>
</template>

<script>
export default {
  name: 'ChildComponent',
  serverCacheKey: (props) => props.item.id + '::' + props.item.last_updated,
  props: ['item']
}
</script>
```

Follow the [Vue.js SSR Component Level Caching documentation](https://ssr.vuejs.org/en/caching.html#component-level-caching) for more informations about when cacheing your components.

Don't forget that this Redis cache is an external cache and is not reset when you deploy your application.
I will soon add a suffix option to the module, to be able to generate a new cache when the application is updated.

Enjoy.
