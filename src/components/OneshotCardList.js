import React from 'react'
import tw, { styled } from 'twin.macro'
import CardBox from './CardBox'

const CardList = styled.div`
  ${tw`flex flex-row flex-wrap w-full lg:p-10 md:pr-2`}
`

class OneshotCardList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CardList>
        {this.props.oneshots.map(
          ({ title, id, description, episodes, image, system }) => (
            <CardBox campaignType={CardBox.CT_ONESHOT}
            id={id}
            title={title}
            description={description}
            link={'/oneshots/' + id}
            episodes={episodes}
            imageSrc={'https:' + image.fluid.src}
            system={system}
            />
          )
        )}
      </CardList>
    )
  }
}

export default OneshotCardList
