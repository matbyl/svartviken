import React from 'react'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Head from '../components/head'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

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

const Campaign = ({ data }) => {
  return (
    <div className="min-w-full">
      <Head title={data.contentfulCampaign.title + ' | Kampanj | Svartviken Rollspelspodd'} />
      <Header backgroundImage={data.contentfulCampaign.image.fluid.src}>
        <HeaderContent className="container">
          <Title>{data.contentfulCampaign.title}</Title>
          {data.contentfulCampaign.description ? (
            <Description>
              {documentToReactComponents(
                JSON.parse(data.contentfulCampaign.description.raw)
              )}
            </Description>
          ) : null}
        </HeaderContent>
      </Header>
      <Episodes>
        {data.contentfulCampaign.episodes.map(episode => (
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
    contentfulCampaign(id: { eq: $id }) {
      id
      title
      description {
        raw
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
      } 
    }
  }
`
export default Campaign;
