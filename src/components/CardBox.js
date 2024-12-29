import React from 'react'
import { Link } from 'gatsby'
import tw, { styled } from 'twin.macro'
import { Episode } from './Episode'
import SystemDisplay from './SystemDisplay'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { trimmedRichText } from './RichText'
import {
  TrimmedRichTextCardDescription,
  TrimmedRichTextDescription,
} from './Descriptions'
import { campaignUrl } from '../utils/urls'
import { LinkButton } from './Button'

const Card = styled.div`
  ${tw`lg:w-1/2 w-full text-left flex-col lg:p-10 md:rounded`}
`

const Header = styled.div`
  ${tw`bg-cover bg-center md:rounded`}
  height: 200px;
  background-image: url(${props => props.src});
  overflow: hidden;
  box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
    1px 3px 8px rgba(39, 44, 49, 0.03);
`

const Title = styled(Link)`
  ${tw`text-black`}
  font-family: 'Colus', Arial, Helvetica, sans-serif;
  font-size: 28px;

  :hover {
    text-decoration: underline;
  }
`

const CampaignContent = styled.div`
  ${tw`relative px-6 pt-6 md:px-10 md:pt-10 md:-mt-8 border-b`}

  z-index: 1;
`
const CampaignType = styled.div`
  ${tw`border border-2 border-gray-500 font-bold text-gray-500 rounded-full m-4 py-1 px-4 float-right`}
`

const ContentWithEpisode = styled.div`
  ${tw`md:shadow-xl md:w-11/12  w-full bg-white m-auto rounded`}
`

class CardBox extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {
      id,
      title,
      imageSrc,
      link,
      description,
      system,
      campaignType,
      episodes,
    } = this.props

    return (
      <Card key={id}>
        <Header src={imageSrc} rel="noopener" />

        <ContentWithEpisode>
          <CampaignType type={campaignType}>
            {campaignTypeToString(campaignType)}
          </CampaignType>

          <CampaignContent>
            <SystemDisplay system={system} />

            <Title className="block" to={link}>
              {title}
            </Title>

            <TrimmedRichTextCardDescription description={description} />
            <LinkButton
              href={campaignTypeToUrl(id, campaignType)}
              className="mt-4 mb-8"
            >
              Läs mer
            </LinkButton>
          </CampaignContent>
          {episodes && episodes.length > 0 ? (
            <Episode
              episode={
                episodes.find(e => e.number === 1)
                  ? episodes.find(e => e.number === 1)
                  : episodes.find(e => e.number === 0)
              }
            />
          ) : (
            ''
          )}
        </ContentWithEpisode>
      </Card>
    )
  }
}

CardBox.CT_CAMPAIGN = 'ContentfulCampaign'
CardBox.CT_ONESHOT = 'ContentfulOneshot'
CardBox.CT_ARCH = 'ContenfulArch'

const campaignTypeToString = x => {
  switch (x) {
    case CardBox.CT_ARCH:
      return 'Kampanj'
    case CardBox.CT_CAMPAIGN:
      return 'Kampanj'
    case CardBox.CT_ONESHOT:
      return 'One-shot'
    default:
      return 'N/A'
  }
}

const campaignTypeToUrl = (id, x) => {
  if (id !== null) {
    switch (x) {
      case CardBox.CT_ARCH:
        return '/archs/' + id
      case CardBox.CT_ONESHOT:
        return '/oneshots/' + id
      case CardBox.CT_CAMPAIGN:
        return '/campaigns/' + id
    }
  }
}

export default CardBox
