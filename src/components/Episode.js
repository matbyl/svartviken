import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'
import tw, { styled } from 'twin.macro'
import { Link } from 'gatsby'

import AudioPlayerButton from './AudioPlayerButton'
import ReactMarkdown from 'react-markdown'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export const EpisodeTitleLink = styled(Link)`
  ${tw`text-black`}  
  font-family: 'Jost', Arial, Helvetica, sans-serif;
  font-size: 20px;
`

export const EpisodeNumber = styled.h2`
  font-family: 'Jost', Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #2e2e2e;
`

export const Episode = props => {
  const { episode } = props;

  return (
    <EpisodeContent>
      <EpisodeDescription>
        
        {!episode.title ?
          (<div>
          <EpisodeTitleLink to={'/episodes/' + episode.id}>
            Avsnitt {episode.number}
          </EpisodeTitleLink></div>) : (<div><EpisodeNumber>Avsnitt {episode.number}</EpisodeNumber>
          <EpisodeTitleLink to={'/episodes/' + episode.id}>
            {episode.title || ''}
          </EpisodeTitleLink></div>)
        }
        
        <div className="flex flex-col md:flex-row w-full">
            
            <ReactMarkdown className="flex-1" children={episode.description.description}></ReactMarkdown>
          

          <EpisodePlayButtonWrapper>
            <AudioPlayerButton episode={episode} />
          </EpisodePlayButtonWrapper>

        </div>
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
