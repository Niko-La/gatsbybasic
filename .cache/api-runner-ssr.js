var plugins = [{
      plugin: require('/home/linuxnikola/gatsby/www/node_modules/gatsby-plugin-typography/gatsby-ssr'),
      options: {"plugins":[],"pathToConfigModule":"src/utils/typography"},
    },{
      plugin: require('/home/linuxnikola/gatsby/www/node_modules/gatsby-remark-autolink-headers/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/linuxnikola/gatsby/www/node_modules/gatsby-plugin-glamor/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/linuxnikola/gatsby/www/node_modules/gatsby-plugin-manifest/gatsby-ssr'),
      options: {"plugins":[],"name":"GatsbyJS","short_name":"GatsbyJS","start_url":"/","background_color":"#ffffff","theme_color":"#663399","display":"minimal-ui","icon":"src/assets/gatsby-icon.png"},
    },{
      plugin: require('/home/linuxnikola/gatsby/www/node_modules/gatsby-plugin-twitter/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/linuxnikola/gatsby/www/node_modules/gatsby-plugin-react-helmet/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/linuxnikola/gatsby/www/node_modules/gatsby-plugin-google-analytics/gatsby-ssr'),
      options: {"plugins":[],"trackingId":"UA-93349937-1"},
    },{
      plugin: require('/home/linuxnikola/gatsby/www/node_modules/gatsby-plugin-fullstory/gatsby-ssr'),
      options: {"plugins":[],"fs_org":"B2TRP"},
    },{
      plugin: require('/home/linuxnikola/gatsby/www/node_modules/gatsby-plugin-sitemap/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/home/linuxnikola/gatsby/www/node_modules/gatsby-plugin-feed/gatsby-ssr'),
      options: {"plugins":[],"feeds":[{"query":"\n              {\n                allMarkdownRemark(\n                  sort: { order: DESC, fields: [frontmatter___date] }\n                  filter: {\n                    frontmatter: { draft: { ne: true } }\n                    fileAbsolutePath: { regex: \"/docs.blog/\" }\n                  }\n                ) {\n                  edges {\n                    node {\n                      excerpt\n                      html\n                      frontmatter {\n                        title\n                        date\n                        excerpt\n                        author {\n                          id\n                        }\n                      }\n                      fields {\n                        slug\n                      }\n                    }\n                  }\n                }\n              }\n            ","output":"/blog/rss.xml"}]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
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
  } else {
    return [defaultReturn]
  }
}
