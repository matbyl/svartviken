import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import styled from 'styled-components'
import logo from './../assets/Svartviken_logo_genomskinlig.png'

import '../styles/tailwind.css'
import '../styles/main.scss'
import CampaignCardList from '../components/CampaignCardList'
import AudioPlayerButton from '../components/AudioPlayerButton'

const LeftColumn = styled.div`
  height: 100%;
  flex: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h3 {
    margin: 35px auto 5px auto;
  }
`

const HomeHeader = styled.div`
  background: linear-gradient(
    119.36deg,
    #0a0a0a 0%,
    #1d1d1d 99.99%,
    #1d1d1d 100%
  );
  display: flex;
  height: 850px;
  flex-direction: row;
  flex-wrap: wrap;
  background: linear-gradient(
    119.36deg,
    #0a0a0a 0%,
    #1d1d1d 99.99%,
    #1d1d1d 100%
  );
  color: white;
`

const RightColumn = styled.div`
  height: 100%;
  flex: 50%;
  display: flex;
  flex-direction: column;

  img {
    width: 600px;
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
  width: 800px;
  margin: 0px 70px;
  font-size: 24px;
  color: ghostwhite;
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
            <LatestEpisode>
              <h1>{latestCampaign.title}</h1>
              <span
                dangerouslySetInnerHTML={{
                  __html: latestCampaign.description.description,
                }}
              />
              <h3>{latestCampaign.episodes[0].title}</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: latestCampaign.episodes[0].description.description,
                }}
              />

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
