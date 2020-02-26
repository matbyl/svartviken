import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import tw from 'tailwind.macro'

import AudioPlayerButton from '../components/AudioPlayerButton'
import { Header, HeaderContent } from '../components/Header'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'

const EpisodeNumber = styled.h1`
  ${tw`text-gray-500 text-lg xl:text-2xl`};
`

const Title = styled.h1`
  ${tw`text-white text-lg xl:text-6xl`};
`

const Description = styled.p`
  ${tw`text-white text-base xl:text-xl`};
`

export default ({ data }) => {
  return (
    <div className="flex min-h-full min-w-full bg-black">
      <Header className="flex m-auto" backgroundImage={''}>
        <HeaderContent className="container">
          <EpisodeNumber>Avsnitt {data.contentfulEpisode.number}</EpisodeNumber>
          <Title>{data.contentfulEpisode.title}</Title>
          <Description>
            {data.contentfulEpisode.description.description}
          </Description>
          <AudioPlayerButton episode={data.contentfulEpisode} light={true} />

          <div className="flex justify-center">
            <FacebookShareButton
              className="m-1"
              url={'https://asd.asd/test/' + data.contentfulEpisode.id}
              quote={'asd'}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton url={'as'} title={'as'} className="m-1">
              <TwitterIcon size={32} round />
            </TwitterShareButton>
          </div>
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
      audio {
        file {
          url
        }
      }
    }
  }
`
