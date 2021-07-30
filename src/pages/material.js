import React from 'react'
import banner from './../assets/images/svartviken_banner.jpg'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Header, HeaderContent, HeaderTitle } from '../components/Header'
import {graphql} from 'gatsby'
import Head from '../components/head';

export default class MaterialPage extends React.Component {
    render() {
        return (
            <div className="min-w-full" backgroundImage={banner}>
                <Head title='Material' />
                <Header>
                    <HeaderContent>
                        <HeaderTitle>Material</HeaderTitle>
                    </HeaderContent>
                </Header>
                {this.props.data.allContentfulMedia.edges.map(({ node }) => (<div className="container mx-auto my-12 px-64">
                    <h1>{node.name}</h1>
                    <p>
                        {documentToReactComponents(JSON.parse(node.description.raw))}
                    </p>

                    <a href={node.media.file.url} >Ladda ner</a>
                </div>))}
            </div >
        );
    }
}

export const pageQuery = graphql`
  query {
    allContentfulMedia {
      edges {
        node {
          name
          description { raw }
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
