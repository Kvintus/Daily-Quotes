// Inside vue.config.js
module.exports = {
  pwa: {
    name: 'Daily Quotes',
    assetsVersion: '1.2.1',
    themeColor: '#010d17',
    msTileColor: '#010d17',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // workboxPluginMode: 'GenerateSW',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/sw.js',
      // ...other Workbox options...
    }
  }
}