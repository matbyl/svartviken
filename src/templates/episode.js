import React from 'react'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Head from '../components/head'

import AudioPlayerButton from '../components/AudioPlayerButton'
import { Header, HeaderContent } from '../components/Header'

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
      <Head
        title={
          data.contentfulEpisode.title +
          (data.contentfulEpisode.length > 0 ? ' | Kampanj ' +
            data.contentfulEpisode.campaign[0].title : '')
        }
      />
      <Header className="flex m-auto" backgroundImage={''}>
        <HeaderContent className="container">
          <EpisodeNumber>Avsnitt {data.contentfulEpisode.number}</EpisodeNumber>
          <Title>{data.contentfulEpisode.title}</Title>
          <Description>
            {data.contentfulEpisode.description.description}
          </Description>
          <AudioPlayerButton episode={data.contentfulEpisode} light={true} />

          <div className="flex justify-center">
            {/* <FacebookShareButton
              className="m-1"
              url={
                'https://www.svartvikenrp.se/media/' +
                data.contentfulEpisode.filename
              }
              quote={'asd'}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <TwitterShareButton url={'as'} title={'as'} className="m-1">
              <TwitterIcon size={32} round />
            </TwitterShareButton> */}
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
        childMarkdownRemark {
          html
        }
      }
      filename
      campaign {
        title
      }
    }
  }
`
