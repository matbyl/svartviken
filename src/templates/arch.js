import React from 'react'
import { graphql } from 'gatsby'
import tw, { styled } from 'twin.macro'
import Head from '../components/head'

import { Header, HeaderContent } from '../components/Header'
import { Episode } from '../components/Episode'
import { Title } from '../components/SeriesCard'
import { RichTextDescription } from '../components/Descriptions'
import CardBox from '../components/CardBox'

const Episodes = styled.ul`
  ${tw`flex flex-wrap justify-center w-full my-12 mx-auto `};
`

const Arch = ({ data }) => {
  return (
    <div className="min-w-full">
      <Head
        title={
          data.contentfulArch.titel + ' | Kampanj | Svartviken Rollspelspodd'
        }
      />
      <Header backgroundImage={data.contentfulArch.coverImage.fluid.src}>
        <HeaderContent className="container mx-auto">
          <Title>{data.contentfulArch.titel}</Title>
          <RichTextDescription
            white
            description={data.contentfulArch.description}
          />
        </HeaderContent>
      </Header>
      <Episodes>
        {data.contentfulArch.oneshotcampaign.map(x => (
          <CardBox
            campaignType={x.internal.type}
            id={x.id}
            title={x.title}
            description={x.description}
            link={
              x.internal.type === 'ContentfulOneshot'
                ? '/oneshots/' + x.id
                : '/campaigns/' + x.id
            }
            episodes={x.episodes}
            imageSrc={'https:' + x.image.fluid.src}
            system={x.system || x.system1[0]}
          />
        ))}
      </Episodes>
    </div>
  )
}

export const query = graphql`
  query($id: String!) {
    contentfulArch(id: { eq: $id }) {
      id
      titel
      description {
        raw
      }
      coverImage {
        fluid(maxWidth: 800) {
          src
        }
      }
      oneshotcampaign {
        ... on ContentfulCampaign {
          id
          title
          description {
            raw
          }
          internal {
            type
          }
          system1 {
            systemName
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
        ... on ContentfulOneshot {
          id
          title
          description {
            raw
          }
          internal {
            type
          }

          image {
            fluid(maxWidth: 800) {
              src
            }
          }
          system {
            systemName
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
export default Arch
