import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import HeaderAlpha from './../assets/header_alpha.svg'
import ChevronIcon from './../assets/icons/chevron.svg'

import tw, { styled } from 'twin.macro'
import logo from './../assets/Svartviken_logo_genomskinlig.png'

import CampaignCardList from '../components/CampaignCardList'
import AudioPlayerButton from '../components/AudioPlayerButton'

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

const SearchBar = ({ onChange, onFilterChange }) => (
  <div className="flex flex-row my-4 mx-auto w-full md:w-3/4 focus:shadow-outline shadow-lg bg-white">
    <input
      onChange={onChange}
      className="flex-1 h-16 bg-transparent focus:outline-none text-xl px-8"
      type="search"
      placeholder="Search..."
    />
    <div className="flex flex-row">
      <select
        name="pod-category"
        id="pod-category"
        className="h-16 px-3 bg-transparent text-xl px-8 appearance-none"
      >
        <option value="one-shot">All</option>
        <option value="one-shot">Campaign</option>
        <option value="one-shot">One shot</option>
      </select>
      <img src={ChevronIcon} className="my-auto mx-4 w-8 h-8" />
    </div>
  </div>
)

class BlogIndex extends React.Component {
  constructor(props) {
    super(props)

    const campaigns = this.props.data.allContentfulCampaign.edges.map(
      e => e.node
    )

    this.state = {
      campaigns,
      searchFilter: '',
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  getCampaigns() {
    return this.props.data.allContentfulCampaign.edges.map(e => e.node)
  }

  handleSearchChange(event) {
    const searchFilter = event.target.value
    this.setState({
      searchFilter,
      campaigns: this.filterCampaigns(
        searchFilter,
        this.state.campaignsActive,
        this.state.oneShotsActive
      ),
    })
  }

  filterCampaigns(searchFilter, campaignsActive, oneShotsActive) {
    return this.getCampaigns()
      .filter(c =>
        searchFilter === ''
          ? true
          : c.title.toLowerCase().indexOf(searchFilter.toLowerCase()) !== -1
      )
      .filter(c => {
        if (campaignsActive && oneShotsActive) {
          return true
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
              <CampaignDescription
                dangerouslySetInnerHTML={{
                  __html: latestCampaign.description.childMarkdownRemark.html,
                }}
              ></CampaignDescription>
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
          <SearchBar onChange={this.handleSearchChange} />
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
          description {
            childMarkdownRemark {
              html
            }
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
  }
`
