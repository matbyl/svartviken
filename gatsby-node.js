const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const campaignTemplate = path.resolve('src/templates/campaign.js')
    const oneshotTemplate = path.resolve('src/templates/oneshot.js')
    const episodeTemplate = path.resolve('src/templates/episode.js')

    resolve(
      graphql(
        `
          {
            allContentfulCampaign {
              edges {
                node {
                  id
                  title
                  description {
                    json
                  }
                  episodes {
                    id
                    title
                    description {
                      childMarkdownRemark {
                        html
                      }
                    }
                    filename
                  }
                }
              }
            }
            allContentfulOneshot {
              edges {
                node {
                  id
                  title
                  description {
                    json
                  }
                  episodes {
                    id
                    title
                    description {
                      childMarkdownRemark {
                        html
                      }
                    }
                    filename
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allContentfulCampaign.edges.forEach(({ node }) => {
          const path = '/campaigns/' + node.id
          createPage({
            path,
            component: campaignTemplate,
            context: {
              id: node.id,
            },
          })

          if (node.episodes) {
            node.episodes.forEach(episode => {
              const path = '/episodes/' + episode.id
              createPage({
                path,
                component: episodeTemplate,
                context: {
                  id: episode.id,
                },
              })
            })
          }
        })
        result.data.allContentfulOneshot.edges.forEach(({ node }) => {
          const path = '/oneshots/' + node.id
          createPage({
            path,
            component: oneshotTemplate,
            context: {
              id: node.id,
            },
          })

          if (node.episodes) {
            node.episodes.forEach(episode => {
              const path = '/episodes/' + episode.id
              createPage({
                path,
                component: episodeTemplate,
                context: {
                  id: episode.id,
                },
              })
            })
          }
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
}
