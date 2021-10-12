const CracoAlias = require('craco-alias')
const ScopedCss = require('craco-plugin-scoped-css')

module.exports = {

  plugins: [
    {
      plugin: CracoAlias,
      options: {
        aliases: {
          '@': './src'
        }
      }
    },
    {
      plugin: ScopedCss
    }
  ]

}
