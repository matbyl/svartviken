const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const campaignTemplate = path.resolve('src/templates/campaign.js')

    resolve(
      graphql(
        `
          {
            allContentfulCampaign {
              edges {
                node {
                  id
                  title
                  oneShot
                  description {
                    description
                  }
                  image {
                    fluid(maxWidth: 800) {
                      src
                    }
                  }
                  episodes {
                    title
                    description {
                      description
                    }
                    audio {
                      file {
                        url
                      }
                    }
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
        })
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
}
