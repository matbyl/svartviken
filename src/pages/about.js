import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import banner from './../assets/images/svartviken_banner.jpg'

import { Header, HeaderContent, HeaderTitle } from '../components/Header'

const AboutSection = styled.section`
  ${tw`flex flex-row flex-wrap justify-center w-full pt-24 pb-24 m-auto`};
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
      <div>
        <Header backgroundImage={banner}>
          <HeaderContent>
            <HeaderTitle>Om oss</HeaderTitle>
          </HeaderContent>
        </Header>
        <AboutSection className="container">
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
