import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'
import tw from 'twin.macro'
import banner from './../assets/images/svartviken_banner.jpg'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Header, HeaderContent, HeaderTitle } from '../components/Header'
import placeholder from './../assets/images/maximalfocus.jpg'

const AboutSection = styled.section`
  ${tw`flex flex-row flex-wrap justify-center w-full pt-24 pb-24 m-auto`};
`
const About = styled.section`
  ${tw`w-full text-center text-xl m-auto`};
`

const PlayerSection = styled.div`
  ${tw`w-full flex flex-row p-12 even:flex-row-reverse`};
`

const PlayerAvatar = styled.div`
${tw`w-1/2`};
`

const PlayerDescription = styled.div``

const CharacterName = styled.h4`
  ${tw`text-lg text-center font-bold`};
`

const CharacterInformation = styled.div`
  ${tw`flex-auto`};
`

const CharacterDescription = styled.div`
  ${tw`flex-auto text-gray-600`};
`

const CharacterPersonality = styled.div`
  ${tw`flex-auto text-center font-semibold text-gray-700`};
`

const Avatar = styled.img`
  ${tw``};
`

const options = {
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment]
    }, [])
  },
}

export default class AboutPage extends React.Component {
  render() {
    return (
      <div className="min-w-full">
        <Header backgroundImage={banner}>
          <HeaderContent>
            <HeaderTitle>Om oss</HeaderTitle>
          </HeaderContent>
        </Header>
        <AboutSection>
          {/* <About>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</About> */}
          {this.props.data.allContentfulPlayer.edges.map(({ node }) =>
            node.svartvikenMember ? (
              <PlayerSection>
                <PlayerAvatar>
                  {node.avatar ? <Avatar src={placeholder} /> : null}
                </PlayerAvatar>
                <PlayerDescription>
                  <CharacterName>
                    {node.firstname + ' ' + node.lastname}
                  </CharacterName>
                  <CharacterPersonality>Chaotic Neutral</CharacterPersonality>
                  {node.about_richtext ? (
                    <CharacterDescription>
                      {documentToReactComponents(
                        node.about_richtext.json,
                        options
                      )}
                    </CharacterDescription>
                  ) : null}
                </PlayerDescription>
              </PlayerSection>
            ) : null
          )}
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
          svartvikenMember
          about_richtext {
            json
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
