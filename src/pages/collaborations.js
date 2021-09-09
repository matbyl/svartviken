import React from 'react'
import { Header, HeaderContent, HeaderTitle } from '../components/Header'
import { graphql } from 'gatsby'
import Head from '../components/head'
import richText from '../components/RichText'

import { CardList, Card } from '../components/CardList'

export default class CollaborationsPage extends React.Component {
  render() {
    return (
      <div className="min-w-full">
        <Head title="Våra samarbeten" />
        <Header>
          <HeaderContent>
            <HeaderTitle>Våra Samarbeten</HeaderTitle>
          </HeaderContent>
        </Header>
        <CardList>
          {this.props.data.allContentfulCollaboration.edges.map(({ node }) => {
            const references = new Map(
              node.description.references.map(x => [
                x.contentful_id,
                { id: x.id, type: x.internal.type },
              ])
            )

            return (
              <Card
                title={node.name}
                image={node.logo.fluid.src}
              >{richText(JSON.parse(node.description.raw), references)}</Card>
            )
          })}
        </CardList>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query {
    allContentfulCollaboration {
      edges {
        node {
          name
          logo {
            fluid(maxWidth: 800) {
              src
            }
          }
          description {
            raw
            references {
              ... on ContentfulCampaign {
                id
                contentful_id
                internal {
                  type
                }
              }
              ... on ContentfulOneshot {
                id
                contentful_id
                internal {
                  type
                }
              }
            }
          }
        }
      }
    }
  }
`
