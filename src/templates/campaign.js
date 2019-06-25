import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import tw from 'tailwind.macro'

const Header = styled.div`
  height: 500px;
  background: black;
  overflow: hidden;
  background-image: ${props =>
    'linear-gradient(to bottom right,rgba(0,0,0,1),rgba(0,0,0,0.54)), url(' +
      props.backgroundImage +
      ')' || 'none'};
  background-size: cover;
  display: flex;
`

const HeaderContent = styled.div`
  ${tw`m-auto text-center`};
`

const Title = styled.h1`
  ${tw`text-white text-lg xl:text-6xl`};
`

const Description = styled.p`
  ${tw`text-white text-base xl:text-xl`};
`

const Content = styled.div`
  ${tw`flex justify-center w-full bg-gray-200`};
`

const Episodes = styled.ul`
  ${tw`shadow-2xl m-3 p-3 rounded-lg flex-shrink bg-white`};
`

const Episode = styled.li`
  ${tw`p-2 hover:bg-blue-400 cursor-pointer`};
`

const Info = styled.div`
  ${tw`flex-1`};
`

const HeaderImage = styled.img`
  ${tw`object-cover w-full opacity-25`};
`

const Character = styled.div``

export default ({ data }) => {
  return (
    <div>
      <Header backgroundImage={data.contentfulCampaign.image.fluid.src}>
        <HeaderContent className="container">
          <Title>{data.contentfulCampaign.title}</Title>
          <Description>
            {data.contentfulCampaign.description.description}
          </Description>
        </HeaderContent>
      </Header>
      <Content>
        <Episodes>
          {data.contentfulCampaign.episodes
            // .sort(
            //   (a, b) => Date.parse(a.published_on) > Date.parse(b.published_on)
            // )
            .map(episode => (
              <Episode>{episode.title}</Episode>
            ))}
        </Episodes>
        <Info>
          {/* {data.contentfulCampaign.characters.map(character => (
            <Character>
              <h3>{character.name}</h3>
              <div>description...</div>
            </Character>
          ))} */}
        </Info>
      </Content>
    </div>
  )
}

export const query = graphql`
  query($id: String!) {
    contentfulCampaign(id: { eq: $id }) {
      id
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
`
