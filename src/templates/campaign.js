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

const Campaign = ({ data }) => {
  return (
    <div className="min-w-full">
      <Head
        title={
          data.contentfulCampaign.title +
          ' | Kampanj | Svartviken Rollspelspodd'
        }
      />
      <Header backgroundImage={data.contentfulCampaign.image.fluid.src}>
        <HeaderContent className="container mx-auto">
          <Title>{data.contentfulCampaign.title}</Title>
          <RichTextDescription description={data.contentfulCampaign.description} />
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
export default Campaign
