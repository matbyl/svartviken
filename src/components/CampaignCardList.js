import React from 'react'
import tw, { styled } from 'twin.macro'
import CardBox from './CardBox'

const CardList = styled.div`
  ${tw`flex flex-row flex-wrap w-full lg:px-10 md:pr-2`}
`
class CampaignCardList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CardList>
        {this.props.campaigns.map(
          ({ title, id, description, episodes, image, system1 }) => (
            <CardBox campaignType={CardBox.CT_CAMPAIGN}
              id={id}
              title={title}
              description={description}
              link={'/campaigns/' + id}
              episodes={episodes}
              imageSrc={'https:' + image.fluid.src}
              system={system1 !== null && system1.length > 0 ? system1[0] : null}
            />
          )
        )}
      </CardList>
    )
  }
}

export default CampaignCardList
