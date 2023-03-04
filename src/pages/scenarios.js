import React from 'react'
import richText from '../components/RichText'
import { Header, HeaderContent, HeaderTitle } from '../components/Header'
import { graphql } from 'gatsby'
import Head from '../components/head'
import { CardList, Card } from '../components/CardList'

const ScenariosPage = ({data}) => {

    const scenarios = data.allContentfulScenarios.edges.map(({node}) => node);

    console.log(data)

    return (
      <div className="min-w-full">
        <Head title="Material" />
        <Header>
          <HeaderContent>
            <HeaderTitle>Material</HeaderTitle>
          </HeaderContent>
        </Header>
        <CardList>
          {scenarios.map(({ id, name, description, cover, link }) => {

            const references = new Map(
              description.references.map(x => [
                x.contentful_id,
                { id: x.id, type: x.internal.type },
              ])
            )

            return (<Card key={id} title={name} image={cover.fluid.src} link={link}>
              {richText(JSON.parse(description.raw), references)}
              {link ? link.map(url => <a href={url}>Få tag på det här</a>):''}
            </Card>)
          })  
        }
        </CardList>
      </div>
    )
  }

export default ScenariosPage

export const pageQuery = graphql`
  query {
    allContentfulScenarios {
      edges {
        node {
          id
          name
          description {
            raw
            references {
              ... on ContentfulOneshot {
                id
                contentful_id
                internal {
                  type
                }
              }
            }
          }
          cover {
            fluid {
              src
            }
          }
          link
        }
      }
    }
  }
`