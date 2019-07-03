import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import tw from 'tailwind.macro'

import styled from 'styled-components'
import logo from './../assets/Svartviken_logo_genomskinlig.png'

import '../styles/tailwind.css'
import '../styles/main.scss'
import CampaignCardList from '../components/CampaignCardList'
import AudioPlayerButton from '../components/AudioPlayerButton'

const HomeHeader = styled.header`
  ${tw`bg-black text-white flex flex-row flex-wrap-reverse p-20`};
`

const LeftColumn = styled.div`
  ${tw`sm:w-full lg:w-1/2 sm:text-lg flex sm:text-center lg:text-justify pb-5 lg:pl-20`};
`

const CampaignTitle = styled.h1`
  ${tw`text-6xl`}
`

const CampaignDescription = styled.p`
  ${tw`text-lg pb-5`}
`
const EpisodeTitle = styled.h1`
  ${tw`text-2xl`}
`

const EpisodeDescription = styled.p`
  ${tw`sm:text-base`}
`

const ToggleButton = styled.button`
  ${tw`bg-green-500 text-white py-2 px-4 rounded-full`}
`

const DisabledToggleButton = styled.button`
  ${tw`bg-gray-300 text-gray-600 py-2 px-4 rounded-full`}
`

const RightColumn = styled.div`
  ${tw`sm:w-full lg:w-1/2`};

  height: 100%;
  flex: 50%;
  display: flex;
  flex-direction: column;
`

const Logo = styled.img`
  ${tw`w-7/12 m-auto`}
`

const LatestEpisode = styled.div`
  ${tw`sm:text-center m-auto`}
`

class BlogIndex extends React.Component {
  constructor(props) {
    super(props)

    const campaigns = this.props.data.allContentfulCampaign.edges.map(
      e => e.node
    )

    this.state = {
      campaigns,
      campaignsActive: true,
    }

    this.toggleCampaigns = this.toggleCampaigns.bind(this)
  }

  toggleCampaigns() {
    const campaigns = this.props.data.allContentfulCampaign.edges.map(
      e => e.node
    )

    this.setState({
      campaignsActive: !this.state.campaignsActive,
      campaigns: campaigns.filter(c => {
        if (this.state.campaignsActive) {
          return c.oneShot
        } else {
          return !c.oneShot
        }
      }),
    })
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    // .filter(c => !c.oneShot)
    const latestCampaign = this.state.campaigns[0]

    return (
      <div>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
          link={[
            {
              rel: 'stylesheet',
              href: 'https://use.fontawesome.com/releases/v5.5.0/css/all.css',
              integrity:
                'sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU',
              crossorigin: 'anonymous',
            },
          ]}
        />
        <HomeHeader className="z-depth-3">
          <LeftColumn>
            <LatestEpisode className="container text-center md:text-left">
              <CampaignTitle>{latestCampaign.title}</CampaignTitle>
              <CampaignDescription>
                {latestCampaign.description.description}
              </CampaignDescription>
              <EpisodeTitle>{latestCampaign.episodes[0].title}</EpisodeTitle>
              <EpisodeDescription>
                {latestCampaign.episodes[0].description.description}
              </EpisodeDescription>

              <AudioPlayerButton
                light={true}
                episode={latestCampaign.episodes[0]}
              />
            </LatestEpisode>
          </LeftColumn>

          <RightColumn>
            <Logo src={logo} />
          </RightColumn>
        </HomeHeader>
        <div>
          {this.state.campaignsActive ? (
            <ToggleButton onClick={this.toggleCampaigns}>
              Kampanjer
            </ToggleButton>
          ) : (
            <DisabledToggleButton onClick={this.toggleCampaigns}>
              Kampanjer
            </DisabledToggleButton>
          )}
          <CampaignCardList campaigns={this.state.campaigns} />
        </div>
      </div>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }

    allContentfulCampaign {
      edges {
        node {
          id
          title
          oneShot
          description {
            description
          }
          image {
            fluid(maxWidth: 800) {
              src
            }
          }
          episodes {
            title
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
      }
    }
  }
`
