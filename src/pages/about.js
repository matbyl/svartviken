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
  ${tw`flex flex-row flex-wrap justify-center w-full m-auto bg-white`};
`

const PlayerSection = styled.div`
  ${tw`w-full flex flex-col md:flex-row p-12 md:even:flex-row-reverse even:bg-gray-200 justify-center`};
`

const PlayerAvatar = styled.div`
  ${tw`w-full md:w-4/12 px-8 my-auto`};
`

const PlayerDescription = styled.div`
  ${tw`w-full md:w-4/12 flex`};
`

const CharacterName = styled.h1`
  ${tw`text-center text-2xl md:text-3xl font-bold`};
`

const CharacterPersonality = styled.h1`
  ${tw`flex-auto text-center font-semibold text-gray-700 border-t-2 border-gray-700 text-lg md:text-3xl`};
`

const CharacterAttributes = styled.div`
  ${tw`flex-auto text-center`};
`

const Avatar = styled.img`
  ${tw`m-auto`};
`

const commaSeperate = arr =>
  arr
    .flatMap(e => [', ', e])
    .slice(1)
    .join('')
export default class AboutPage extends React.Component {
  render() {
    return (
      <div className="min-w-full">
        <Head title="Om oss" />
        <Header backgroundImage={banner}>
          <HeaderContent>
            <HeaderTitle>Om oss</HeaderTitle>
          </HeaderContent>
        </Header>
        <AboutSection>
          {this.props.data.allContentfulSvartvikenMember.edges.map(
            ({ node }) => (
              <PlayerSection key={node.id}>
                <PlayerAvatar>
                  <Avatar src={node.profilePicture.fluid.src} />
                  <CharacterName>{node.name}</CharacterName>
                  <CharacterPersonality>{node.alignment}</CharacterPersonality>
                  <CharacterAttributes>
                    {commaSeperate(node.attributes)}
                  </CharacterAttributes>
                </PlayerAvatar>
                <PlayerDescription>
                  <ul>
                    <li>
                      <b>Arketyp: </b> {node.arketyp}
                    </li>
                    <li>
                      <b>Big NoNos: </b>
                      {node.bigNoNos.bigNoNos}
                    </li>
                    <li>
                      <b>Debut: </b> {node.debut}
                    </li>
                    <li>
                      <b>Favoritrollspel: </b>
                      {node.favoriteRpg}
                    </li>
                    <li>
                      <b>Ice breakers: </b>
                      {node.iceBreakers.iceBreakers}
                    </li>
                    <li>
                      <b>Rollspelsvana: </b>
                      {node.rpgHabit.rpgHabit}
                    </li>
                    <li>
                      <b>Skills: </b>
                      {commaSeperate(node.skills)}
                    </li>
                    <li>
                      <b>Team: </b>
                      {node.team}
                    </li>
                    <li>
                      <b>Svagheter: </b>
                      {node.weaknesses.weaknesses}
                    </li>
                    <li>
                      <b>Födelseår: </b>
                      {node.birthyear}
                    </li>
                    <li>
                      <b>Födelseort: </b>
                      {node.birthplace}
                    </li>
                  </ul>
                </PlayerDescription>
              </PlayerSection>
            )
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
          alignment
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
            fluid(maxWidth: 1920) {
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
