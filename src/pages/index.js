import React from 'react'
import { graphql } from 'gatsby'

import HeaderAlpha from './../assets/images/header-alpha.svg'
import tw, { styled } from 'twin.macro'
import logo from './../assets/images/svartviken-logo.jpg'

import CampaignCardList from '../components/CampaignCardList'
import OneshotCardList from '../components/OneshotCardList'
import AudioPlayerButton from '../components/AudioPlayerButton'
import SearchBox from '../components/SearchBox'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Link } from 'gatsby'
import Head from '../components/head'
import ReactMarkdown from 'react-markdown'
import richText from '../components/RichText'

const HomeHeader = styled.header`
  ${tw`bg-black text-white flex flex-row flex-wrap-reverse w-full p-4 md:p-10`};
`

const LeftColumn = styled.div`
  ${tw`sm:w-full lg:w-1/2 sm:text-lg flex sm:text-center lg:text-justify pb-5 lg:pl-20`};
`

const CampaignTitle = styled(Link)`
  font-family: 'Colus', Arial, Helvetica, sans-serif;
  font-size: 28px;

  :hover {
    text-decoration: underline;
  }
  ${tw`text-white text-xl mt-5 lg:text-6xl`}
`

const CampaignDescription = styled.div`
  ${tw`text-lg pb-5`}
`
const EpisodeTitle = styled.h1`
  ${tw`text-lg lg:text-2xl`}
`

const EpisodeDescription = styled(ReactMarkdown)`
  ${tw`sm:text-base`}
`

const RightColumn = styled.div`
  ${tw`sm:w-full lg:w-1/2`};

  height: 100%;
  flex: 50%;
  display: flex;
  flex-direction: column;
`

const Logo = styled.img`
  ${tw`w-64 py-5 lg:w-7/12 m-auto`}
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

const LatestEpisode = styled.div`
  ${tw`sm:text-center m-auto`}
`

const MainSection = styled.section`
  ${tw`mx-auto my-12 text-center`}
`

const orderEpisodes = (a, b) => {
  if (!a.episodes) {
    return -1
  } else if (!b.episodes) {
    return 1
  } else if (a.episodes[0].pubDate === b.episodes[0].pubDate) {
    return 0
  } else if (
    new Date(a.episodes[0].pubDate) > new Date(b.episodes[0].pubDate)
  ) {
    return -1
  } else {
    return 1
  }
}

class SvartvikenIndex extends React.Component {
  constructor(props) {
    super(props)

    const campaigns = this.getCampaigns()

    const oneshots = this.getOneshots()

    this.state = {
      campaigns,
      oneshots,
      searchFilter: 'all',
      searchTerm: '',
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }

  getCampaigns() {
    return this.props.data.allContentfulCampaign.edges
      .map(e => e.node)
      .sort(orderEpisodes)
  }

  getOneshots() {
    return this.props.data.allContentfulOneshot.edges
      .map(e => e.node)
      .sort(orderEpisodes)
  }

  handleSearchChange(event) {
    const searchTerm = event.target.value
    this.setState({
      searchTerm,
      campaigns: this.search(this.getCampaigns(), searchTerm),
      oneshots: this.search(this.getOneshots(), searchTerm),
    })
  }

  handleFilterChange(event) {
    const searchFilter = event.target.value
    this.setState({
      searchFilter,
    })
  }

  search(items, searchFilter) {
    return items.filter(c =>
      searchFilter === ''
        ? true
        : c.title.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
    )
  }

  render() {
    const latestCampaign =
      this.state.campaigns.length > 0
        ? this.state.campaigns[0]
        : this.getCampaigns()[0]

    const firstEpisodeOfLatestCampaign = latestCampaign.episodes.find(
      e => e.number === 1 || e.number === 0
    )
    return (
      <div className="w-full">
        <Head title="" />
        <HomeHeader className="z-depth-3">
          <LeftColumn>
            <LatestEpisode className="container text-center md:text-left">
              <CampaignTitle to={'/campaigns/' + latestCampaign.id}>
                {latestCampaign.title}
              </CampaignTitle>
              {latestCampaign.description ? (
                <CampaignDescription>
                  {richText(
                    JSON.parse(latestCampaign.description.raw),
                    new Map()
                  )}
                </CampaignDescription>
              ) : null}
              <EpisodeTitle>{firstEpisodeOfLatestCampaign.title}</EpisodeTitle>
              <EpisodeDescription
                children={firstEpisodeOfLatestCampaign.description.description}
              />

              <AudioPlayerButton
                light={true}
                episode={latestCampaign.episodes[0]}
              />
            </LatestEpisode>
          </LeftColumn>

          <RightColumn>
            <Logo src={logo} alt="svartviken-logo" />
          </RightColumn>
        </HomeHeader>
        <img
          src={HeaderAlpha}
          alt="hero-banner-bottom-alpha"
          className="header-bottom -my-1"
        />

        <MainSection>
          <SearchBox
            searchTerm={this.state.searchTerm}
            filter={this.state.searchFilter}
            onSearchChange={this.handleSearchChange}
            onFilterChange={this.handleFilterChange}
          />
          {
            {
              all: (
                <div className="w-full">
                  <CampaignCardList campaigns={this.state.campaigns} />
                  <OneshotCardList oneshots={this.state.oneshots} />
                </div>
              ),
              campaign: <CampaignCardList campaigns={this.state.campaigns} />,
              oneShot: <OneshotCardList oneshots={this.state.oneshots} />,
            }[this.state.searchFilter]
          }
        </MainSection>
      </div>
    )
  }
}

export default SvartvikenIndex

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
          system1 {
            systemName
          }
          description {
            raw
          }
          image {
            fluid(maxWidth: 800) {
              src
            }
          }
          episodes {
            id
            title
            number
            pubDate
            description {
              description
            }
            filename
            campaign {
              title
            }
          }
        }
      }
    }

    allContentfulOneshot {
      edges {
        node {
          id
          title
          system {
            systemName
          }
          description {
            raw
          }
          image {
            fluid(maxWidth: 800) {
              src
            }
          }
          episodes {
            id
            number
            pubDate
            description {
              description
            }
            filename
            oneshot {
              title
            }
          }
        }
      }
    }
  }
`
