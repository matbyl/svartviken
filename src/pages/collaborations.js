import React from 'react'
import { Header, HeaderContent, HeaderTitle } from '../components/Header'
import { graphql} from 'gatsby'
import tw, { styled } from 'twin.macro'
import Head from '../components/head'
import richText from '../components/RichText'

const CardList = styled.div`
  ${tw`flex flex-row flex-wrap w-full lg:p-10 md:pr-2 justify-center`}
`

const Card = styled.div`
  ${tw`lg:w-1/2 w-full my-4 md:my-0 md:p-8 max-w-2xl`}
`

const CardContent = styled.div`
  ${tw`md:shadow-xl bg-white rounded p-4`}

  min-height: 400px;
`



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
              <Card>
                <CardContent>
                  <h1 className="block text-xl mb-8 w-full text-center md:text-left">
                    {node.name}
                  </h1>
                  <div className="flex flex-col md:flex-row">
                    <div className="w-64 m-auto md:flex-1 md:mr-4">
                      <img src={node.logo.fluid.src} />
                    </div>
                    <div className="flex-1 mt-4 md:mt-0">
                      {richText(
                        JSON.parse(node.description.raw),
                        references
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
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
              ... on ContentfulPlayer {
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
