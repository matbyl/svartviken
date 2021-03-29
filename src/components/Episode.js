import React from 'react'
import tw, { styled } from 'twin.macro'
import { Link } from 'gatsby'

import AudioPlayerButton from './AudioPlayerButton'

export const EpisodeTitleLink = styled(Link)`
  font-family: 'Jost', Arial, Helvetica, sans-serif;
  font-size: 20px;

  :hover {
    text-decoration: underline;
  }
`

export const EpisodeNumber = styled.h2`
  font-family: 'Jost', Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #2e2e2e;
`

export const Episode = props => {
  const { episode } = props

  return (
    <EpisodeContent>
      <EpisodeDescription>
        <EpisodeNumber>Avsnitt {episode.number}</EpisodeNumber>
        <EpisodeTitleLink to={'/episodes/' + episode.id}>
          {episode.title || ''}
        </EpisodeTitleLink>
        <div className="flex flex-col md:flex-row w-full">
          <div
            className="flex-1"
            dangerouslySetInnerHTML={{
              __html: episode.description.childMarkdownRemark.html,
            }}
          ></div>


          <EpisodePlayButtonWrapper>
            <AudioPlayerButton episode={episode} />
          </EpisodePlayButtonWrapper>

        </div>
{/* 
        <div className="flex mt-10 bottom-0">
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
        </div> */}
      </EpisodeDescription>
    </EpisodeContent>
  )
}

const EpisodeContent = styled.div`
  ${tw`flex h-full px-6 md:px-10`}
  z-index: 1;
`

const EpisodeDescription = styled.div`
  ${tw`flex-1 py-10 pr-5 relative`}
`

const EpisodePlayButtonWrapper = styled.div`
  ${tw`w-16 md:m-auto`}
`
