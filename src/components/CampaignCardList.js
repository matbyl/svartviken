import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import tw from 'tailwind.macro'
import { Episode } from './Episode'

const CardList = styled.div`
  ${tw`flex flex-row flex-wrap justify-center`}
`

const Card = styled.div`
  ${tw`static m-5  text-left`}

  width: 800px;
  border-radius: 10px;
`

const Header = styled.div`
  border-radius: 10px;
  background: url(${props => props.src});
  height: 200px;
  overflow: hidden;

  box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
    1px 3px 8px rgba(39, 44, 49, 0.03);

  z-index: 0;
`

const Title = styled(Link)`
  font-family: 'Colus', Arial, Helvetica, sans-serif;
  font-size: 28px;

  :hover {
    text-decoration: underline;
  }
`

const CampaignContent = styled.div`
  ${tw`relative p-10 -mt-8 border-b`}

  height: 200px;
  z-index: 1;
`

const Footer = styled.div`
  ${tw`float-right font-bold text-orange-600`}
`

const CampaignType = styled.div`
  ${tw`bg-blue-600 font-bold text-white rounded-full py-1 px-2 float-right`}

  background: ${props => {
    switch (props.type) {
      case 'campaign':
        return 'rgb(255,0,0)'
      case 'one-shot':
        return 'rgb(0, 255, 0)'
      default:
        return '#000'
    }
  }};
`

const Divider = styled.div`
  ${tw`w-full border border-gray-500`}
`

const FooterLink = styled(Link)`
  ${tw`absolute bottom-0 right-0 h-8 w-40`}
`

class CampaignCardList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CardList>
        {this.props.campaigns.map(
          ({ title, id, description, episodes, image, oneShot }) => (
            <Card>
              <Header src={'https:' + image.fluid.src} />

              {episodes.length > 0 ? (
                <div className="shadow-xl w-11/12 bg-white m-auto rounded">
                  <CampaignContent>
                    {oneShot ? (
                      <CampaignType type="one-shot">One Shot</CampaignType>
                    ) : (
                        <CampaignType type="campaign">Kampanj</CampaignType>
                      )}

                    <Title to={'/campaigns/' + id}>{title}</Title>

                    <div className="w-11/12">{description.description}</div>
                  </CampaignContent>
                  <Episode episode={episodes.find(e => e.number === 1)} />
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

export default CampaignCardList
