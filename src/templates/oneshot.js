import React from 'react'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Head from '../components/head'
import richText from '../components/RichText'

import { Header, HeaderContent } from '../components/Header'
import { Episode } from '../components/Episode'

const Title = styled.h1`
  ${tw`text-white text-lg xl:text-6xl`};
`

const Description = styled.div`
  ${tw`text-white text-base xl:text-xl`};
`

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
          {data.contentfulOneshot.description ? (
            <Description>
              {richText(
                JSON.parse(data.contentfulOneshot.description.raw),
                new Map(data.contentfulOneshot.description.references)
              )}
            </Description>
          ) : null}
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
