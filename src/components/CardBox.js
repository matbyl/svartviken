import React from 'react'
import { Link } from 'gatsby'
import tw, { styled } from 'twin.macro'
import { Episode } from './Episode'
import SystemDisplay from './SystemDisplay'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import richText from './RichText'

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
  ${tw`relative p-6 md:p-10 md:-mt-8 border-b`}

  z-index: 1;
`
const CampaignType = styled.div`
  ${tw`bg-green-600 font-bold text-white rounded-full py-1 px-2 float-right`}
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
      episodes
    } = this.props

    return (
      <Card key={id}>
        <Header src={imageSrc} rel="noopener" />

        <ContentWithEpisode>
          <CampaignContent>
            <CampaignType type={campaignType}>
              {campaignType === this.CT_CAMPAIGN ? 'Kampanj' : 'One-shot'}
            </CampaignType>

            <SystemDisplay system={system} />

            <Title to={link}>{title}</Title>

            {description ? (
              <div className="w-11/12">
                {richText(
                  JSON.parse(description.raw),
                  new Map(description.references)
                )}
              </div>
            ) : null}
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

CardBox.CT_CAMPAIGN = "campaign"
CardBox.CT_ONESHOT = "one-shot"

export default CardBox
