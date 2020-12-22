import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import HeaderAlpha from './../assets/header_alpha.svg'
import tw, { styled } from 'twin.macro'
import logo from './../assets/Svartviken_logo_genomskinlig.png'

import CampaignCardList from '../components/CampaignCardList'
import OneshotCardList from '../components/OneshotCardList'
import AudioPlayerButton from '../components/AudioPlayerButton'
import SearchBox from '../components/SearchBox'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { filter } from 'lodash'

const HomeHeader = styled.header`
  ${tw`bg-black text-white flex flex-row flex-wrap-reverse w-full p-4 md:p-10`};
`

const LeftColumn = styled.div`
  ${tw`sm:w-full lg:w-1/2 sm:text-lg flex sm:text-center lg:text-justify pb-5 lg:pl-20`};
`

const CampaignTitle = styled.h1`
  ${tw`text-xl mt-5 lg:text-6xl`}
`

const CampaignDescription = styled.p`
  ${tw`text-lg pb-5`}
`
const EpisodeTitle = styled.h1`
  ${tw`text-lg lg:text-2xl`}
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
`

const Logo = styled.img`
  ${tw`w-64 py-5 lg:w-7/12 m-auto`}
`

const LatestEpisode = styled.div`
  ${tw`sm:text-center m-auto`}
`

const MainSection = styled.section`
  ${tw`mx-auto my-12 text-center`}
`

class SvartvikenIndex extends React.Component {
  constructor(props) {
    super(props)

    const campaigns = this.props.data.allContentfulCampaign.edges.map(
      e => e.node
    )

    const oneshots = this.props.data.allContentfulOneshot.edges.map(e => e.node)

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
    return this.props.data.allContentfulCampaign.edges.map(e => e.node)
  }

  handleSearchChange(event) {
    const searchTerm = event.target.value
    this.setState({
      searchTerm,
      campaigns: this.filterCampaigns(searchTerm),
    })
  }

  handleFilterChange(event) {
    const searchFilter = event.target.value
    this.setState({
      searchFilter,
    })
  }

  filterCampaigns(searchFilter) {
    return this.getCampaigns().filter(c =>
      searchFilter === ''
        ? true
        : c.title.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
    )
  }

  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )

    const latestCampaign =
      this.state.campaigns.length > 0
        ? this.state.campaigns[0]
        : this.getCampaigns()[0]

    console.log(latestCampaign)
    const firstEpisodeOfLatestCampaign = latestCampaign.episodes.find(
      e => e.number === 1 || e.number === 0
    )
    return (
      <div className="w-full">
        <HomeHeader className="z-depth-3">
          <LeftColumn>
            <LatestEpisode className="container text-center md:text-left">
              <CampaignTitle>{latestCampaign.title}</CampaignTitle>
              {latestCampaign.description ? (
                <CampaignDescription>
                  {documentToReactComponents(latestCampaign.description.json)}
                </CampaignDescription>
              ) : null}
              <EpisodeTitle>{firstEpisodeOfLatestCampaign.title}</EpisodeTitle>
              <EpisodeDescription
                dangerouslySetInnerHTML={{
                  __html:
                    firstEpisodeOfLatestCampaign.description.childMarkdownRemark
                      .html,
                }}
              ></EpisodeDescription>

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
        <img src={HeaderAlpha} className="header-bottom -my-1" />

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
          description {
            json
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
            description {
              childMarkdownRemark {
                html
              }
            }
            filename
          }
        }
      }
    }

    allContentfulOneshot {
      edges {
        node {
          id
          title
          description {
            json
          }
          image {
            fluid(maxWidth: 800) {
              src
            }
          }
          episodes {
            id
            number
            description {
              childMarkdownRemark {
                html
              }
            }
            filename
          }
        }
      }
    }
  }
`
