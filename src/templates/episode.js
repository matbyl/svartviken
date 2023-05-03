import React from 'react'
import { graphql, Link } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Head from '../components/head'

import AudioPlayerButton from '../components/AudioPlayerButton'
import { Header, HeaderContent } from '../components/Header'
import { episodeUrl } from '../utils/urls'
import { Title } from '../components/SeriesCard'
import { MarkdownDescription } from '../components/Descriptions'

const PreTitle = styled.div`
  display: block;
  font-weight: bold;
  font-family: 'Colus', Arial, Helvetica, sans-serif;
`

const EpisodeNumber = styled.div`
  ${tw`text-gray-500 text-lg xl:text-2xl`};
  display: inline;
  margin: 0 0.5em;
`

const NavigationButton = styled(Link)`
  ${tw`text-white font-bold text-lg w-8`};
  margin: auto 0
`

const NavigationButtonPlaceholder = styled.div`
  ${tw`w-8`}
`

const CampaignLink = styled(Link)`
  ${tw`text-white`};
`

function EpisodeNavButton({ episode, children }) {
  return episode !== null ? (
    <NavigationButton to={episodeUrl(episode.id)}>
      {children}
    </NavigationButton>
  ) : <NavigationButtonPlaceholder />
}

function campaignInfo(campaignData, oneshotData) {
  const campaignName = campaignData?.title || oneshotData?.title
  const campaignId = campaignData?.id || null
  const oneshotId = oneshotData?.id || null
  var campaignURL = null
  if (campaignId !== null) {
    campaignURL = '/campaigns/' + campaignId
  } else if (oneshotId !== null) {
    campaignURL = '/oneshots/' + oneshotId
  }
  const episodes = Array.from(campaignData?.episodes || []).concat(
    Array.from(oneshotData?.episodes || [])
  )

  return { campaignName, campaignURL, episodes }
}

const Episode = ({ data }) => {
  let { title, number, description, campaign, oneshot } = data.contentfulEpisode
  let { campaignName, campaignURL, episodes } = campaignInfo(campaign?.[0], oneshot?.[0])
  episodes.sort((a, b) => (a.number > b.number ? 1 : -1))

  const nextEpisode = episodes.find(episode => episode.number > number) || null
  const prevEpisode = episodes.reverse().find(episode => episode.number < number) || null

  // console.log(JSON.stringify({next: nextEpisode, prev: prevEpisode}))

  return (
    <div className="flex min-h-a min-w-full bg-black">
      <Head
        title={
          title +
          (campaign !== null && campaign.length > 0
            ? ' | Kampanj ' + campaign[0].title
            : '')
        }
      />
      <Header className="flex m-auto" backgroundImage={''}>
        <EpisodeNavButton episode={prevEpisode}>&lt;</EpisodeNavButton>
        <HeaderContent className="container">
          <PreTitle>
            <EpisodeNumber>Avsnitt {number} av <CampaignLink to={campaignURL}>{campaignName}</CampaignLink></EpisodeNumber>
          </PreTitle>
          <Title>{title}</Title>
          <MarkdownDescription className="text-white m-auto text-center" description={description} />
          <AudioPlayerButton episode={data.contentfulEpisode} light={true} />
          <div className="flex justify-center"></div>
        </HeaderContent>
        <EpisodeNavButton episode={nextEpisode}>&gt;</EpisodeNavButton>
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
        id
        title
        episodes {
          id
          number
        }
      }
      oneshot {
        id
        title
        episodes {
          id
          number
        }
      }
    }
  }
`

export default Episode
