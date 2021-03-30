import React from 'react'
import Layout from '../components/layout'
import tw, { styled } from 'twin.macro'
import banner from './../assets/images/svartviken_banner.jpg'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Header, HeaderContent, HeaderTitle } from '../components/Header'
import placeholder from './../assets/images/maximalfocus.jpg'
import Head from '../components/head'

const AboutSection = styled.section`
  ${tw`flex flex-row flex-wrap justify-center w-full m-auto bg-black`};
`
const About = styled.section`
  ${tw`w-full text-center text-xl m-auto`};
`

const PlayerSection = styled.div`
  ${tw`w-full flex flex-col md:flex-row p-12 md:even:flex-row-reverse even:bg-gray-200 bg-white`};
`

const PlayerAvatar = styled.div`
  ${tw`w-full md:w-1/2`};
`

const PlayerDescription = styled.div`
${tw`w-full md:w-1/2 flex`};
`

const CharacterName = styled.h1`
  ${tw`text-center text-2xl md:text-6xl font-bold`};

`

const CharacterInformation = styled.div`
  ${tw`flex-auto`};
`

const CharacterDescription = styled.div`
  ${tw`flex-auto text-gray-600 ml-4 my-auto`};
`

const CharacterPersonality = styled.h1`
  ${tw`flex-auto text-center font-semibold text-gray-700 border-t-2 border-gray-700 text-lg md:text-5xl`};
`

const Avatar = styled.img`
  ${tw`m-auto`};
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
        <Head title='Om oss' />
        <Header backgroundImage={banner}>
          <HeaderContent>
            <HeaderTitle>Om oss</HeaderTitle>
          </HeaderContent>
        </Header>
        <AboutSection>
          {/* <About>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</About> */}
          {this.props.data.allContentfulSvartvikenMember.edges.map(({ node }) =>

              <PlayerSection key={node.id}>
                <PlayerAvatar>
                  <Avatar src={node.profilePicture.fluid.src} />
                  <CharacterName>
                    {node.name}
                  </CharacterName>
                  <CharacterPersonality>Chaotic Neutral</CharacterPersonality>
                </PlayerAvatar>
                <PlayerDescription>

                  <ul>
                    <li>
                      {node.arketyp}
                    </li>
                    <li>
                      <ul>
                      {node.attributes.map(atr => <li>{atr}</li>)}
                      </ul>
                    </li>
                    <li>
                      {node.bigNoNos.bigNoNos}
                    </li>
                    <li>
                      {node.birthyear}
                    </li>
                    <li>
                      {node.birthplace}
                    </li>
                    <li>
                      {node.debut}
                    </li>
                    <li>
                      {node.favoriteRpg}
                    </li>
                    <li>
                      {node.iceBreakers.iceBreakers}
                    </li>
                    <li>
                      {node.rpgHabit.rpgHabit}
                    </li>
                    <li>
                      {node.skills}
                    </li>
                    <li>
                      {node.team}
                    </li>
                    <li>
                      {node.weaknesses.weaknesses}
                    </li>
                  </ul>
                </PlayerDescription>
              </PlayerSection>
          )}
        </AboutSection>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query {
    allContentfulSvartvikenMember {
      edges {
        node {
          id
          name
          arketyp
          attributes
          bigNoNos {
            bigNoNos
          }
          birthyear
          birthplace
          debut
          favoriteRpg
          iceBreakers {
            iceBreakers
          }
          profilePicture {
            fluid(maxWidth: 90) {
              src
            }
          }
          rpgHabit {
            rpgHabit
          }
          skills
          team
          weaknesses {
            weaknesses
          }
        }
      }
    }
  }
`
