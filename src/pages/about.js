import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import banner from './../assets/images/svartviken_banner.jpg'
import {graphql} from 'gatsby'

import { Header, HeaderContent, HeaderTitle } from '../components/Header'

const AboutSection = styled.section`
  ${tw`flex flex-row flex-wrap justify-center w-full pt-24 pb-24 m-auto`};
`
const About = styled.section`
  ${tw`w-full text-center text-xl m-auto`};
`

const PlayerSection = styled.div`
  ${tw`w-3/12 text-center justify-center p-12`};
`

const CharacterName = styled.h4`
  ${tw`text-lg font-bold`};
`

const CharacterInformation = styled.div`
  ${tw`flex-auto`};
`

const CharacterDescription = styled.div`
  ${tw`flex-auto text-gray-600`};
`

const CharacterPersonality = styled.div`
  ${tw`flex-auto font-semibold text-gray-700`};
`

const Avatar = styled.img`
  ${tw`rounded-full m-auto`};
`

export default class AboutPage extends React.Component {
  render() {
    return (
      <div className="min-w-full">
        <Header backgroundImage={banner}>
          <HeaderContent>
            <HeaderTitle>Om oss</HeaderTitle>
          </HeaderContent>
        </Header>
        <AboutSection className="container">
          <About>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</About>
          {this.props.data.allContentfulPlayer.edges.map(({ node }) => (
            <PlayerSection>
              <Avatar src={node.avatar.fluid.src} />
              <CharacterName>
                {node.firstname + ' ' + node.lastname}
              </CharacterName>
              <CharacterPersonality>Chaotic Neutral</CharacterPersonality>
              <CharacterDescription>{node.about.about}</CharacterDescription>
            </PlayerSection>
          ))}
        </AboutSection>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query {
    allContentfulPlayer {
      edges {
        node {
          firstname
          lastname
          about {
            about
          }
          avatar {
            fluid(maxWidth: 90) {
              src
            }
          }
        }
      }
    }
  }
`
