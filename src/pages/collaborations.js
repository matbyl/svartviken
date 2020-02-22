import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import banner from './../assets/images/svartviken_banner.jpg'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Header, HeaderContent, HeaderTitle } from '../components/Header'


export default class CollaborationsPage extends React.Component {
    render() {
        return (
            <div className="min-w-full" backgroundImage={banner}>
                <Header>
                    <HeaderContent>
                        <HeaderTitle>Våra Samarbeten</HeaderTitle>
                    </HeaderContent>
                </Header>
                {this.props.data.allContentfulCollaboration.edges.map(({ node }) => (<div className="container mx-auto my-12 px-64">
                    <h1>{node.name}</h1>
                    <div className="flex flex-row">
                        <img className="w-2/4" src={node.logo.fluid.src} />
                        <p className="m-4">
                            {documentToReactComponents(node.description.json)}
                        </p>
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
