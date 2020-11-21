import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import HeaderAlpha from './../assets/header_alpha.svg'

import tw,  {styled} from 'twin.macro'
import logo from './../assets/Svartviken_logo_genomskinlig.png'

import CampaignCardList from '../components/CampaignCardList'
import AudioPlayerButton from '../components/AudioPlayerButton'

const HomeHeader = styled.header`
  ${tw`bg-black text-white flex flex-row flex-wrap-reverse p-10`};
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

const EnabledToggleButton = styled.button`
  ${tw`py-2 mx-2 px-4 rounded-full shadow-md`}
  ${tw`bg-green-500 text-white`}
`

const DisabledToggleButton = styled.button`
  ${tw`py-2 mx-2 px-4 rounded-full shadow-md`}
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
  ${tw`w-11/12 lg:w-7/12 m-auto`}
`

const LatestEpisode = styled.div`
  ${tw`sm:text-center m-auto`}
`

const MainSection = styled.section`
  ${tw`mx-auto my-12 text-center`}
`

const ToggleButton = ({ onClick, disabled, children }) =>
  disabled ? (
    <DisabledToggleButton onClick={onClick}>{children}</DisabledToggleButton>
  ) : (
      <EnabledToggleButton onClick={onClick}>{children}</EnabledToggleButton>
    )

const SearchBar = ({ onChange }) => (
  <div className="w-1/6 my-4 mx-auto">
    <input
      onChange={onChange}
      className="w-full h-16 px-3 rounded focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"
      type="search"
      placeholder="Search..."
    />
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
      campaignsActive: true,
      oneShotsActive: true,
      searchFilter: '',
    }

    this.toggleCampaigns = this.toggleCampaigns.bind(this)
    this.toggleOneShots = this.toggleOneShots.bind(this)
    this.handleSearchChange = this.handleSearchChange.bind(this)
  }

  toggleCampaigns() {
    const campaignsActive = !this.state.campaignsActive
    this.setState({
      campaignsActive,
      campaigns: this.filterCampaigns(
        this.state.searchFilter,
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
        this.state.searchFilter,
        this.state.campaignsActive,
        oneShotsActive
      ),
    })
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
    // .filter(c => !c.oneShot)
    const latestCampaign =
      this.state.campaigns.length > 0
        ? this.state.campaigns[0]
        : this.getCampaigns()[0]

    const firstEpisodeOfLatestCampaign = latestCampaign.episodes.find(e => e.number === 1);
    return (
      <div>
        <HomeHeader className="z-depth-3">
          <LeftColumn>
            <LatestEpisode className="container text-center md:text-left">
              <CampaignTitle>{latestCampaign.title}</CampaignTitle>
              <CampaignDescription>
                {latestCampaign.description.description}
              </CampaignDescription>
              <EpisodeTitle>{firstEpisodeOfLatestCampaign.title}</EpisodeTitle>
              <EpisodeDescription>
                {firstEpisodeOfLatestCampaign.description.description}
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
        <img src={HeaderAlpha} className="header-bottom" />

        <MainSection>
          <SearchBar onChange={this.handleSearchChange} />
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
          description {
            description
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
              description
            }
            filename
          }
        }
      }
    }
  }
`
