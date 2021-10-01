const bodyParser = require('body-parser')
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href:"https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;500&display=swap"}
    ]
  },

  loading: {color: '#ff2b40',duration: 6000, throttle: 0},

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/stlyes/main.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/core-components.js',
    '@/plugins/date-filter.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: process.env.BASE_URL || 'https://nuxt-blog-1eeb7-default-rtdb.firebaseio.com'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
  
  env: {
    baseUrl: process.env.BASE_URL || 'https://nuxt-blog-1eeb7-default-rtdb.firebaseio.com',
    fbAPIKey: 'AIzaSyBDzTitQr5vmGm8gA6-d5Op-4PhoI_WCco',
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  router: {
    middleware: 'log',
  },

  serverMiddleware: [
    bodyParser.json(),
    '@/api'
  ],
}
