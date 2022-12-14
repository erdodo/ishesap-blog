import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _47b29ead = () => interopDefault(import('../pages/giris-yap.vue' /* webpackChunkName: "pages/giris-yap" */))
const _72f9914d = () => interopDefault(import('../pages/kalıp.vue' /* webpackChunkName: "pages/kalıp" */))
const _72c67158 = () => interopDefault(import('../pages/profil.vue' /* webpackChunkName: "pages/profil" */))
const _63cdb0fe = () => interopDefault(import('../pages/uye-ol.vue' /* webpackChunkName: "pages/uye-ol" */))
const _1b61f18a = () => interopDefault(import('../pages/kategori/tumu.vue' /* webpackChunkName: "pages/kategori/tumu" */))
const _33f78616 = () => interopDefault(import('../pages/detay/_title.vue' /* webpackChunkName: "pages/detay/_title" */))
const _7e99fe8c = () => interopDefault(import('../pages/kategori/_title.vue' /* webpackChunkName: "pages/kategori/_title" */))
const _e3fb842c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/giris-yap",
    component: _47b29ead,
    name: "giris-yap"
  }, {
    path: "/kal%C4%B1p",
    component: _72f9914d,
    name: "kalıp"
  }, {
    path: "/profil",
    component: _72c67158,
    name: "profil"
  }, {
    path: "/uye-ol",
    component: _63cdb0fe,
    name: "uye-ol"
  }, {
    path: "/kategori/tumu",
    component: _1b61f18a,
    name: "kategori-tumu"
  }, {
    path: "/detay/:title?",
    component: _33f78616,
    name: "detay-title"
  }, {
    path: "/kategori/:title?",
    component: _7e99fe8c,
    name: "kategori-title"
  }, {
    path: "/",
    component: _e3fb842c,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
