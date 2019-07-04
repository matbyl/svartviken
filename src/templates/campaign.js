import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import tw from 'tailwind.macro'

import { Header, HeaderContent } from '../components/Header'

const Title = styled.h1`
  ${tw`text-white text-lg xl:text-6xl`};
`

const Description = styled.p`
  ${tw`text-white text-base xl:text-xl`};
`

const Episodes = styled.ul`
  ${tw`flex flex-wrap justify-center w-full m-auto `};
`

const Episode = styled.li`
  ${tw` w-1/2 h-48 text-center bg-white shadow-lg rounded`};
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
          {/* {data.contentfulCampaign.characters.map(character => (
            <Character>
              <h3>{character.name}</h3>
              <div>description...</div>
            </Character>
          ))} */}
        </HeaderContent>
      </Header>
      <Episodes className="container">
        {data.contentfulCampaign.episodes
          // .sort(
          //   (a, b) => Date.parse(a.published_on) > Date.parse(b.published_on)
          // )
          .map(episode => (
            <Episode>
              <h3>{episode.title}</h3>
              <div>{episode.description.description}</div>
            </Episode>
          ))}
      </Episodes>
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
