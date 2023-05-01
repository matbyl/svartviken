import React from 'react'
import { Header, HeaderContent, HeaderTitle } from '../components/Header'
import { graphql } from 'gatsby'
import Head from '../components/head'
import richText from '../components/RichText'

import { CardList, Card } from '../components/CardList'
import { ExternalLink } from '../components/Link'
import { LinkButton } from '../components/Button'
import { RichTextDescription } from '../components/Descriptions'

const CollaborationsPage = ({ data }) => {
  const collaborations = data.allContentfulCollaboration.edges
    .map(({ node }) => node)
    .sort((a, b) => a.weight - b.weight)

  return (
    <div className="min-w-full">
      <Head title="Våra samarbeten" />
      <Header>
        <HeaderContent>
          <HeaderTitle>Våra Samarbeten</HeaderTitle>
        </HeaderContent>
      </Header>
      <CardList>
        {collaborations.map(collaboration => {
          const references = new Map(
            collaboration.description.references.map(x => [
              x.contentful_id,
              { id: x.id, type: x.internal.type },
            ])
          )

          return (
            <Card
              key={collaboration.id}
              title={collaboration.name}
              image={collaboration.logo.fluid.src}
            >
              <div className="flex-1">
                <RichTextDescription description={collaboration.description} />
              </div>

              {collaboration.link.map(l => (
                <LinkButton key={l} className="inline-block mt-4 mb-8 self-center " href={l}>
                  Läs mer
                </LinkButton>
              ))}
            </Card>
          )
        })}
      </CardList>
    </div>
  )
}

export default CollaborationsPage

export const pageQuery = graphql`
  query {
    allContentfulCollaboration {
      edges {
        node {
          id
          name
          weight
          link
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
