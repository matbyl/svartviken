const { Howl } = require('howler')

const makeStorageUrl = require('./src/utils/makeStorageUrl')
const baseUrl = 'https://svartviken.netlify.com'
//const baseUrl = 'https://www.svartvikenrp.se'

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  flags: {
    DEV_SSR: false
  },
  siteMetadata: {
    title: 'Svartviken rollspelspodd',
    author: 'Mathias Frithiofsson Bylund',
    description: 'En rollspelspodd.',
    siteUrl: baseUrl,
    feedUrl: baseUrl + '/rss.xml',
    imageUrl: baseUrl + '/svartviken-podcast-cover.png',
    copyright: '2021 Svartviken',
    language: 'sv',
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
            spotify: 'http://www.spotify.com/ns/rss',
          },
          custom_elements: [
            { 'itunes:author': 'Svartviken' },
            { 'itunes:explicit': 'no' },
            { 'itunes:owner': [
              { 'itunes:name': 'Svartviken Rollspelspodd' },
              { 'itunes:email': 'svartvikenrp@gmail.com' },
            ] },
            { 'itunes:image': { _attr: { href: site.siteMetadata.imageUrl } } },
            {
              'itunes:category': [
                { _attr: { text: 'Arts' } },
                { 'itunes:category': { _attr: { text: 'Performing Arts' } } },
              ]
            },
            {
              'itunes:category': [
                { _attr: { text: 'Leisure' } },
                { 'itunes:category': { _attr: { text: 'Games' } } },
                { 'itunes:category': { _attr: { text: 'Hobbies' } } },
              ]
            },
            {
              'itunes:category': [
                { _attr: { text: 'Fiction' } },
                { 'itunes:category': { _attr: { text: 'Drama' } } },
                { 'itunes:category': { _attr: { text: 'Science Fiction' } } },
              ]
            },
            {
              'itunes:category': [
                { _attr: { text: 'International' } },
                { 'itunes:category': { _attr: { text: 'Swedish' } } },
              ]
            },
            { 'spotify:countryOfOrigin': 'sv' },
            { 'googleplay:author': 'Svartviken' },
            {
              'googleplay:category': {
                _attr: {
                  text: 'Games & Hobbies',
                },
              },
            },
          ],
        }),
        feeds: [
          {
            serialize: ({
              query: { site, storageRootConfig, allContentfulCampaign, allContentfulOneshot },
            }) => {
              const storageRoot = storageRootConfig.config.storageRoot
              const formatEpisode = (title, image, episode) => {
                // Itunes only wants images larger than 1400x1400
                const useImage = image.file.url && (image.file.details.image.width >= 1400) && (image.file.details.image.height >= 1400)
                const url = makeStorageUrl(storageRoot, episode.filename)
                const filename = (new URL(url)).pathname.replace(/^\//, '')
                const episodeNr = filename.split('-', 2)[0]
                const oldStyleGuid = 'https://www.svartvikenrp.se/?name=' + filename
                var chosenGuid = filename
                if (episode.pubDate && (Date.parse(episode.pubDate) < Date.parse("2021-09-15"))) {
                  chosenGuid = oldStyleGuid // Use old style of guid for anything published before the website launch.
                }
                var totalseconds = 0
                if (episode.duration) {
                  const parts = episode.duration.split(":")
                  if (parts.length === 2) {
                    const minutes = parseInt(parts[0])
                    const seconds = parseInt(parts[1])
                    totalseconds = (isNaN(minutes) ? 0 : minutes * 60) + (isNaN(seconds) ? 0 : seconds)
                  } else if (parts.length === 3) {
                    const hours = parseInt(parts[0])
                    const minutes = parseInt(parts[1])
                    const seconds = parseInt(parts[2])
                    totalseconds = (isNaN(hours) ? 0 : hours * 60 * 60) + (isNaN(minutes) ? 0 : minutes * 60) + (isNaN(seconds) ? 0 : seconds)
                  }
                }
                return {
                  title: title,
                  description: episode.description.description,
                  date: episode.pubDate,
                  url: site.siteMetadata.siteUrl + '/episodes/' + episode.id,
                  guid: chosenGuid,
                  enclosure: {
                    url: url,
                    length: totalseconds,
                    type: 'audio/mpeg',
                  },
                  custom_elements: [
                    { 'itunes:explicit': 'no' },
                    { 'itunes:duration': totalseconds },
                    { 'itunes:episode': isNaN(parseInt(episodeNr)) ? null : episodeNr },
                  ]
                  + useImage ? [ { 'itunes:image': { _attr: { href: 'https:' + image.file.url } } } ] : []
                }
              }
              const campaignEpisodes = allContentfulCampaign.edges.reduce(
                (acc, edge) => {
                  if (edge.node.episodes) {
                    return acc.concat(
                      edge.node.episodes.map(episode => {
                        return Object.assign(
                          {},
                          edge.node.frontmatter,
                          formatEpisode(
                            `${edge.node.title} - Avsnitt ${episode.number} - ${episode.title}`,
                            edge.node.image,
                            episode
                          )
                        )
                      })
                    )
                  } else { return acc }
                },
                []
              )
              const oneshotEpisodes = allContentfulOneshot.edges.reduce(
                (acc, edge) => {
                  if (edge.node.episodes) {
                    return acc.concat(
                      edge.node.episodes.map(episode => {
                        return Object.assign(
                          {},
                          edge.node.frontmatter,
                          formatEpisode(
                            `${edge.node.title} - Avsnitt ${episode.number}`,
                            edge.node.image,
                            episode
                          )
                        )
                      })
                    )
                  } else { return acc }
                },
                []
              )
              const result = campaignEpisodes.concat(oneshotEpisodes)
              result.sort((a, b) => {
                return ('' + a.date).localeCompare(b.date)
              })
              return result
            },
            query: `
              {
                storageRootConfig: contentfulConfig(name: {eq: "StorageRoot"}) {
                    config { storageRoot }
                }
                allContentfulCampaign {
                  edges{
                    node{
                      id
                      title
                      image {
                        file {
                          url
                          details {
                            image {
                              width
                              height
                            }
                          }
                        }
                      }
                      episodes {
                        id
                        title
                        number
                        pubDate
                        description {
                          description
                        }
                        filename
                        duration
                      }
                    }
                  }
                }
                allContentfulOneshot {
                  edges{
                    node{
                      id
                      title
                      image {
                        file {
                          url
                          details {
                            image {
                              width
                              height
                            }
                          }
                        }
                      }
                      episodes {
                        id
                        number
                        pubDate
                        description {
                          description
                        }
                        filename
                        duration
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: 'Svartvikens Rollspelspodd',
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
        icon: `src/assets/favicon-32x32.png`,
      },
    },
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
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
        // Learn about environment variables
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
  ],
}
