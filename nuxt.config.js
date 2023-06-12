export default {
  target: 'static',
  router: {
    base: '/ite18_project/'
  },
  axios: {
    // Base URL of the API
    baseURL: 'http://localhost:1337',
    // Headers to send with every request
    headers: {
      common: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  },
  auth: {
    // Authentication options
    strategies: {
      local: {
        token: {
          property: 'jwt',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: 'http://localhost:1337/api/auth/local',
            method: 'post',
          },
          user: {
            url: 'http://localhost:1337/api/users/me',
            method: 'get',
          },
          logout: false,
        },
      },
    },
  },
  head: {
    // HTML head configuration
    title: 'frontend',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      // Meta tags
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: [], // Global CSS files
  plugins: ['~plugins/axios'], // Plugins to run before rendering pages
  components: true, // Auto import components
  buildModules: [
    // Modules for development and build
    '@nuxtjs/eslint-module', // ESLint module
    '@nuxtjs/tailwindcss', // Tailwind CSS module
  ],
  modules: [
    // Modules
    '@nuxtjs/axios', // Axios module for making HTTP requests
    '@nuxtjs/auth-next' // Auth module for authentication
  ],
  build: {
    // Build configuration
    transpile: [
      'defu' // Packages to transpile
    ]
  }
}
