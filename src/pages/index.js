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
  ${tw`bg-black text-white flex flex-row flex-wrap-reverse p-4`};
`

const LeftColumn = styled.div`
  ${tw`sm:w-full lg:w-1/2 sm:text-lg flex sm:text-center lg:text-justify `};
`

const CampaignTitle = styled.h1`
  ${tw`text-6xl`}
`

const CampaignDescription = styled.p`
  ${tw`text-lg`}
`
const EpisodeTitle = styled.h1`
  ${tw`text-2xl`}
`

const EpisodeDescription = styled.p`
  ${tw`sm:text-base`}
`

const RightColumn = styled.div`
  ${tw`sm:w-full lg:w-1/2`};

  height: 100%;
  flex: 50%;
  display: flex;
  flex-direction: column;

  img {
    width: 80%;
    -webkit-filter: drop-shadow(5px 5px 5px #222);
    filter: drop-shadow(5px 5px 5px #222);
    margin: 60px auto;

    animation-name: floatingAnimation;
    animation-duration: 3s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  @keyframes floatingAnimation {
    0% {
      transform: scale(0.99);
      -webkit-filter: drop-shadow(5px 5px 5px #222);
      filter: drop-shadow(5px 5px 5px #222);
    }

    50% {
      transform: scale(1);
      -webkit-filter: drop-shadow(10px 10px 10px #222);
      filter: drop-shadow(10px 10px 10px #222);
    }

    100% {
      transform: scale(0.99);
      -webkit-filter: drop-shadow(5px 5px 5px #222);
      filter: drop-shadow(5px 5px 5px #222);
    }
  }
`

const LatestEpisode = styled.div`
  ${tw`sm:text-center m-auto`}
`

class BlogIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const campaigns = this.props.data.allContentfulCampaign.edges
      .map(e => e.node)
      .filter(c => !c.oneShot)
    const latestCampaign = campaigns[0]

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

              <AudioPlayerButton episode={latestCampaign.episodes[0]} />
            </LatestEpisode>
          </LeftColumn>

          <RightColumn>
            <img src={logo} />
          </RightColumn>
        </HomeHeader>
        <div>
          <CampaignCardList campaigns={campaigns} />
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
