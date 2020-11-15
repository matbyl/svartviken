require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Svartviken rollspelspodd',
    author: 'Mathias Frithiofsson Bylund',
    description: 'En rollspelspodd.',
    siteUrl: 'https://svartviken.netlify.com',
    feedUrl: 'https://svartviken.netlify.com/rss.xml',
    imageUrl: 'https://svartviken.netlify.com/svartviken-podcast-cover.jpg',
    docs: 'http://example.com/rss/docs.html',
    copyright: '2019 Svartviken',
    language: 'se',
    categories: ['RP', 'Roleplaying'],
  },
  pathPrefix: '/gatsby-starter-blog',
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        //trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
                feedUrl
                feed_url: feedUrl
                imageUrl
                image_url: imageUrl
                copyright
                language
                categories
              }
            }
          }
        `,
        setup: ({ query: { site } }) => ({
          title: site.siteMetadata.title,
          description: site.siteMetadata.description,
          site_url: site.siteMetadata.siteUrl,
          feed_url: site.siteMetadata.feedUrl,
          copyright: site.siteMetadata.copyright,
          image_url: site.siteMetadata.imageUrl,
          language: site.siteMetadata.language,
          categories: site.siteMetadata.categories,
          custom_namespaces: {
            itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
            googleplay: 'http://www.google.com/schemas/play-podcasts/1.0',
          },
          custom_elements: [
            { 'itunes:author': 'Svartviken' },
            {
              'itunes:category': {
                _attr: {
                  text: 'Games &amp; Hobbies',
                },
              },
            },
            { 'googleplay:author': 'Svartviken' },
            {
              'googleplay:category': {
                _attr: {
                  text: 'Games &amp; Hobbies',
                },
              },
            },
          ],
        }),
        feeds: [
          {
            serialize: ({ query: { site, allContentfulEpisode } }) => {
              return allContentfulEpisode.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  title: edge.node.title,
                  description: edge.node.description.description,
                  date: edge.node.pubDate,
                  url: site.siteMetadata.siteUrl + '/episode/' + edge.node.id,
                  guid: site.siteMetadata.siteUrl + '/episode/' + edge.node.id,
                  enclosure: {
                    url: 'https://www.svartvikenrp.se/media/' + edge.node.filename,
                    type: 'mp3',
                  },
                })
              })
            },
            query: `
              {
                allContentfulEpisode {
                  edges{
                    node{
                      id
                      title
                      description {
                        description
                      }
                      filename
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Svartvikens Rollspelspodd",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Svartviken Rollspelspodd`,
        short_name: `Svartviken`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        tailwind: true,
        purgeOnly: ['src/css/main.css'],
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `93broy6zhdtc`,
        // Learn about environment variables: c
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
}
