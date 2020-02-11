import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import tw from 'tailwind.macro'

import { Header, HeaderContent } from '../components/Header'
import { Episode } from '../components/Episode'

const Title = styled.h1`
  ${tw`text-white text-lg xl:text-6xl`};
`

const Description = styled.p`
  ${tw`text-white text-base xl:text-xl`};
`

const Episodes = styled.ul`
  ${tw`flex flex-wrap justify-center w-full m-auto `};
`

export default ({ data }) => {
  return (
    <div className="min-w-full">
      <Header backgroundImage={data.contentfulCampaign.image.fluid.src}>
        <HeaderContent className="container">
          <Title>{data.contentfulCampaign.title}</Title>
          <Description>
            {data.contentfulCampaign.description.description}
          </Description>
          {/* {data.contentfulCampaign.characters
            ? data.contentfulCampaign.characters.map(character => (
                <div className="w-1/2 m-auto">
                  <h3 className="text-lg text-white">
                    {character.name} ({character.playedBy.firstname}{' '}
                    {character.playedBy.lastname})
                  </h3>
                  <p className="text-white">
                    {character.description.description}
                  </p>
                </div>
              ))
            : ''} */}
        </HeaderContent>
      </Header>
      <Episodes>
        {data.contentfulCampaign.episodes.map(episode => (
          <div className="w-5/12 m-1 bg-white shadow-lg rounded">
            <Episode episode={episode} />
          </div>
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
        id
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
      characters {
        name
        description {
          description
        }
        playedBy {
          firstname
          lastname
        }
      }
    }
  }
`
