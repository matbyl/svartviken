import React from 'react'
import tw, { styled } from 'twin.macro'
import CardBox from './CardBox'

const CardList = styled.div`
  ${tw`flex flex-row flex-wrap w-full lg:px-10 md:pr-2`}
`
class ArchCardList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CardList>
        {this.props.archs.map(
          ({ titel, id, description, episodes, gameSystem, coverImage }) => (
            <CardBox
              campaignType={CardBox.CT_ARCH}
              id={id}
              title={titel}
              description={description}
              link={'/archs/' + id}
              episodes={episodes}
              imageSrc={'https:' + coverImage.fluid.src}
              system={gameSystem}
            />
          )
        )}
      </CardList>
    )
  }
}

export default ArchCardList
