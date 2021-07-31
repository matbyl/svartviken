import React from 'react'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Head from '../components/head'

import AudioPlayerButton from '../components/AudioPlayerButton'
import { Header, HeaderContent } from '../components/Header'
import ReactMarkdown from 'react-markdown'

const EpisodeNumber = styled.h1`
  ${tw`text-gray-500 text-lg xl:text-2xl`};
`

const Title = styled.h1`
  ${tw`text-white text-lg xl:text-6xl`};
`

const Description = styled(ReactMarkdown)`
  ${tw`text-white text-base xl:text-xl`};
`

const Episode = ({ data }) => {
  return (
    <div className="flex min-h-a min-w-full bg-black">
      <Head
        title={
          data.contentfulEpisode.title +
          (data.contentfulEpisode.length > 0
            ? ' | Kampanj ' + data.contentfulEpisode.campaign[0].title
            : '')
        }
      />
      <Header className="flex m-auto" backgroundImage={''}>
        <HeaderContent className="container">
          <EpisodeNumber>Avsnitt {data.contentfulEpisode.number}</EpisodeNumber>
          <Title>{data.contentfulEpisode.title}</Title>
          <Description
            children={data.contentfulEpisode.description.description}
          />
          <AudioPlayerButton episode={data.contentfulEpisode} light={true} />

          <div className="flex justify-center"></div>
        </HeaderContent>
      </Header>
    </div>
  )
}

export const query = graphql`
  query($id: String!) {
    contentfulEpisode(id: { eq: $id }) {
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
`

export default Episode
