import React from 'react'
import { Link } from 'gatsby'
import tw, { styled } from 'twin.macro'
import { Episode } from './Episode'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

const CardList = styled.div`
  ${tw`flex flex-row flex-wrap md:my-20 w-full lg:p-10 md:pr-2`}
`

const Card = styled.div`
  ${tw`lg:w-1/2 w-full md:my-10 lg:my-auto text-left flex-col lg:p-10 md:rounded`}
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

const Footer = styled.div`
  ${tw`float-right font-bold text-orange-600`}
`

const CampaignType = styled.div`
  ${tw`bg-blue-600 font-bold text-white rounded-full py-1 px-2 float-right`}
`

const Divider = styled.div`
  ${tw`w-full border border-gray-500`}
`

const FooterLink = styled(Link)`
  ${tw`absolute bottom-0 right-0 h-8 w-40`}
`

class OneshotCardList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CardList>
        {this.props.oneshots.map(
          ({ title, id, description, episodes, image }) => (
            <Card key={id}>
              <Header src={'https:' + image.fluid.src} />

              {episodes.length > 0 ? (
                <div className="md:shadow-xl md:w-11/12  w-full bg-white m-auto rounded">
                  <CampaignContent>
                    <CampaignType type="one-shot">Oneshot</CampaignType>

                    <Title to={'/oneshots/' + id}>{title}</Title>

                    {description ? (
                      <div className="w-11/12">
                        {documentToReactComponents(description.json)}
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