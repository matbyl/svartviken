import React from 'react'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
} from 'react-share'
import { Link } from 'gatsby'

import AudioPlayerButton from './AudioPlayerButton'

export const EpisodeTitleLink = styled(Link)`
  ${tw`mt-8`}
  font-family: 'Jost', Arial, Helvetica, sans-serif;
  font-size: 20px;

  :hover {
    text-decoration: underline;
  }
`

export const Episode = props => {
  const { episode } = props

  return (
    <EpisodeContent>
      <EpisodeDescription>
        <EpisodeTitleLink to={'episodes/' + episode.id}>
          {episode.title}
        </EpisodeTitleLink>
        <p>{episode.description.description}</p>

        <div className="flex absolute bottom-0">
          <FacebookShareButton
            url={'https://asd.asd/test/' + episode.id}
            quote={'asd'}
            className="m-1"
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton url={'as'} title={'as'} className="m-1  ">
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>
      </EpisodeDescription>
      <EpisodePlayButtonWrapper>
        <AudioPlayerButton episode={episode} />
      </EpisodePlayButtonWrapper>
    </EpisodeContent>
  )
}

const EpisodeContent = styled.div`
  ${tw`flex h-full px-10 pb-8`}
  z-index: 1;
`

const EpisodeDescription = styled.div`
  ${tw`flex-1 py-10 pr-5 h-48 relative`}
`

const EpisodePlayButtonWrapper = styled.div`
  ${tw`w-16 m-auto`}
`
