var plugins = [{
      plugin: require('/home/linuxnikola/Desktop/gatsby/www/node_modules/gatsby-plugin-typography/gatsby-browser'),
      options: {"plugins":[],"pathToConfigModule":"src/utils/typography"},
    },{
      plugin: require('/home/linuxnikola/Desktop/gatsby/www/node_modules/gatsby-plugin-canonical-urls/gatsby-browser'),
      options: {"plugins":[],"siteUrl":"https://www.gatsbyjs.org"},
    },{
      plugin: require('/home/linuxnikola/Desktop/gatsby/www/node_modules/gatsby-remark-autolink-headers/gatsby-browser'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/linuxnikola/Desktop/gatsby/www/node_modules/gatsby-plugin-nprogress/gatsby-browser'),
      options: {"plugins":[],"color":"#9D7CBF","showSpinner":false},
    },{
      plugin: require('/home/linuxnikola/Desktop/gatsby/www/node_modules/gatsby-plugin-glamor/gatsby-browser'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/linuxnikola/Desktop/gatsby/www/node_modules/gatsby-plugin-catch-links/gatsby-browser'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/linuxnikola/Desktop/gatsby/www/node_modules/gatsby-plugin-offline/gatsby-browser'),
      options: {"plugins":[],"navigateFallback":null,"navigateFallbackWhitelist":[]},
    },{
      plugin: require('/home/linuxnikola/Desktop/gatsby/www/node_modules/gatsby-plugin-twitter/gatsby-browser'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/linuxnikola/Desktop/gatsby/www/node_modules/gatsby-plugin-google-analytics/gatsby-browser'),
      options: {"plugins":[],"trackingId":"UA-93349937-1"},
    }]
// During bootstrap, we write requires at top of this file which looks
// basically like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-browser.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-browser.js"),
//     options: { ... },
//   },
// ]

export function apiRunner(api, args, defaultReturn) {
  let results = plugins.map(plugin => {
    if (plugin.plugin[api]) {
      const result = plugin.plugin[api](args, plugin.options)
      return result
    }
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else if (defaultReturn) {
    return [defaultReturn]
  } else {
    return []
  }
}

export function apiRunnerAsync(api, args, defaultReturn) {
  return plugins.reduce(
    (previous, next) =>
      next.plugin[api]
        ? previous.then(() => next.plugin[api](args, next.options))
        : previous,
    Promise.resolve()
  )
}
