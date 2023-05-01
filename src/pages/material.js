import React from 'react'
import banner from './../assets/images/svartviken_banner.jpg'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Header, HeaderContent, HeaderTitle } from '../components/Header'
import { graphql } from 'gatsby'
import Head from '../components/head'

import { CardList, Card } from '../components/CardList'
import { LinkButton } from '../components/Button'

export default class MaterialPage extends React.Component {
  render() {
    return (
      <div className="min-w-full" backgroundImage={banner}>
        <Head title="Material" />
        <Header>
          <HeaderContent>
            <HeaderTitle>Material</HeaderTitle>
          </HeaderContent>
        </Header>
        <CardList>
          {this.props.data.allContentfulMedia.edges.map(({ node }) => (
            <Card title={node.name} image={node.cover.fluid.src}>
              <p className="flex-1">
                {documentToReactComponents(JSON.parse(node.description.raw))}
              </p>

              <LinkButton className="self-center justify-end mt-4"href={node.media.file.url}>Ladda ner</LinkButton>
            </Card>
          ))}
        </CardList>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query {
    allContentfulMedia {
      edges {
        node {
          name
          description {
            raw
          }
          cover {
            fluid {
              src
            }
          }
          media {
            file {
              url
            }
          }
        }
      }
    }
  }
`
