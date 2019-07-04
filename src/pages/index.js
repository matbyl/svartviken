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

const EnabledToggleButton = styled.button`
  ${tw`my-5 py-2 mx-2 px-4 rounded-full shadow-md`}
  ${tw`bg-green-500 text-white`}
`

const DisabledToggleButton = styled.button`
  ${tw`my-5 py-2 mx-2 px-4 rounded-full shadow-md`}
  ${tw`bg-gray-300 text-gray-600`}
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

const MainSection = styled.section`
  ${tw`m-auto text-center`}
`

/*
  {this.state.campaignsActive ? (
            <ToggleButton onClick={this.toggleCampaigns}>
              Kampanjer
            </ToggleButton>
          ) : (
            <DisabledToggleButton onClick={this.toggleCampaigns}>
              Kampanjer
            </DisabledToggleButton>
          )}
*/
const ToggleButton = ({ onClick, disabled, children }) =>
  disabled ? (
    <DisabledToggleButton onClick={onClick}>{children}</DisabledToggleButton>
  ) : (
    <EnabledToggleButton onClick={onClick}>{children}</EnabledToggleButton>
  )

class BlogIndex extends React.Component {
  constructor(props) {
    super(props)

    const campaigns = this.props.data.allContentfulCampaign.edges.map(
      e => e.node
    )

    this.state = {
      campaigns,
      campaignsActive: true,
      oneShotsActive: true,
    }

    this.toggleCampaigns = this.toggleCampaigns.bind(this)
    this.toggleOneShots = this.toggleOneShots.bind(this)
  }

  toggleCampaigns() {
    const campaignsActive = !this.state.campaignsActive
    this.setState({
      campaignsActive,
      campaigns: this.filterCampaigns(
        campaignsActive,
        this.state.oneShotsActive
      ),
    })
  }

  toggleOneShots() {
    const oneShotsActive = !this.state.oneShotsActive
    this.setState({
      oneShotsActive,
      campaigns: this.filterCampaigns(
        this.state.campaignsActive,
        oneShotsActive
      ),
    })
  }

  getCampaigns() {
    return this.props.data.allContentfulCampaign.edges.map(e => e.node)
  }

  filterCampaigns(campaignsActive, oneShotsActive) {
    return this.getCampaigns().filter(c => {
      if (campaignsActive && oneShotsActive) {
        return true
      } else if (oneShotsActive && !campaignsActive) {
        return c.oneShot
      } else if (campaignsActive && !oneShotsActive) {
        return !c.oneShot
      } else {
        return false
      }
    })
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    // .filter(c => !c.oneShot)
    const latestCampaign =
      this.state.campaigns.length > 0
        ? this.state.campaigns[0]
        : this.getCampaigns()[0]

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

        <MainSection>
          <ToggleButton
            onClick={this.toggleCampaigns}
            disabled={!this.state.campaignsActive}
          >
            Kampanjer
          </ToggleButton>
          <ToggleButton
            onClick={this.toggleOneShots}
            disabled={!this.state.oneShotsActive}
          >
            One shots
          </ToggleButton>
          <CampaignCardList campaigns={this.state.campaigns} />
        </MainSection>
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
