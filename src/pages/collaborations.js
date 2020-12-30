import React from 'react'
import banner from './../assets/images/svartviken_banner.jpg'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Header, HeaderContent, HeaderTitle } from '../components/Header'
import { graphql } from 'gatsby'

export default class CollaborationsPage extends React.Component {
    render() {
        return (
            <div className="min-w-full" backgroundImage={banner}>
                <Header>
                    <HeaderContent>
                        <HeaderTitle>Våra Samarbeten</HeaderTitle>
                    </HeaderContent>
                </Header>
                {this.props.data.allContentfulCollaboration.edges.map(({ node }) => (
                    <div className="w-full container md:w-1/2 block mx-auto my-12 p-4">
                        <h1 className="block w-full">{node.name}</h1>

                        <div className="flex flex-col md:flex-row">
                            <img className="w-64 md:mr-4" src={node.logo.fluid.src} />
                            <div className="mt-4 md:mt-0">{documentToReactComponents(node.description.json)}</div>

                        </div>

                    </div>))}


            </div >

        );
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
              json
          }
        }
      }
    }
  }
`
