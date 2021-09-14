import React from 'react'
import { Link } from 'gatsby'
import tw, { styled } from 'twin.macro'
import { Episode } from './Episode'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import richText from './RichText'

const CardList = styled.div`
  ${tw`flex flex-row flex-wrap w-full lg:p-10 md:pr-2`}
`

const Card = styled.div`
  ${tw`w-full lg:w-1/2 text-left flex-col lg:p-10 md:rounded`}
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
  ${tw`bg-blue-600 font-bold text-white rounded-full py-1 px-2 float-right`}
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
            <Card key={id}>
              <Header src={'https:' + image.fluid.src} rel="noopener" />

              {episodes && episodes.length > 0 ? (
                <div className="md:shadow-xl md:w-11/12  w-full bg-white m-auto rounded">
                  <CampaignContent>
                    <CampaignType type="one-shot">Oneshot</CampaignType>

                    <div>{system.systemName}</div>
                    <Title to={'/oneshots/' + id}>{title}</Title>

                    {description ? (
                      <div className="w-11/12">
                        {richText(
                          JSON.parse(description.raw),
                          new Map(description.references)
                        )}
                      </div>
                    ) : null}
                  </CampaignContent>
                  <Episode
                    episode={episodes.find(
                      e => e.number === 1 || e.number === 0
                    )}
                  />
                </div>
              ) : (
                ''
              )}
            </Card>
          )
        )}
      </CardList>
    )
  }
}

export default OneshotCardList
