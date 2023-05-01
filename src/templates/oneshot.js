import React from 'react'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Head from '../components/head'

import { Header, HeaderContent } from '../components/Header'
import { Episode } from '../components/Episode'
import { Title } from '../components/SeriesCard'
import { RichTextDescription } from '../components/Descriptions'

const Episodes = styled.ul`
  ${tw`flex flex-wrap justify-center w-full my-12 mx-auto `};
`
const OneShot = ({ data }) => {
  return (
    <div className="min-w-full">
      <Head
        title={
          data.contentfulOneshot.title + ' | Oneshot | Svartviken Rollspelspodd'
        }
      />
      <Header backgroundImage={data.contentfulOneshot.image.fluid.src}>
        <HeaderContent className="container">
          <Title>{data.contentfulOneshot.title}</Title>
          <RichTextDescription white description={data.contentfulOneshot.description} />
        </HeaderContent>
      </Header>
      <Episodes>
        {data.contentfulOneshot.episodes.map(episode => (
          <div className="w-full md:w-5/12 my-1 md:m-1 bg-white shadow-lg rounded">
            <Episode episode={episode} />
          </div>
        ))}
      </Episodes>
    </div>
  )
}

export const query = graphql`
  query($id: String!) {
    contentfulOneshot(id: { eq: $id }) {
      id
      title
      description {
        raw
        references {
          contentful_id
          internal {
            contentDigest
            owner
            type
          }
          about_richtext {
            raw
          }
          id
        }
      }
      image {
        fluid(maxWidth: 800) {
          src
        }
      }
      episodes {
        id
        title
        number
        description {
          description
        }
        filename
        campaign {
          title
        }
      }
    }
  }
`
export default OneShot
