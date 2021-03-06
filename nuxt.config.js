module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Coala Software',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'https://www.coalasw.com/' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  plugins: ['~/plugins/vuetify.js'],
  css: ['~/assets/style/app.styl'],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    extractCSS: true,
    extend (config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  },
  serverMiddleware: ['~/api/index.js'],
  modules: ['@nuxtjs/axios', '@nuxtjs/auth'],
  axios: {
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          // token.accessToken이 아니면, express-jwt에서 오류 발생
          login: { propertyName: 'token.accessToken' }
        }
      }
    }
  }
}
