import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import AudioPlayerButton from './AudioPlayerButton'
import tw from 'tailwind.macro'

const CardList = styled.div`
  ${tw`flex flex-row flex-wrap justify-center`}
`

const Card = styled.div`
  ${tw`static m-5 relative`}

  width: 800px;
  border-radius: 10px;
  &:hover {
    transform: scale(1.01);
  }
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

const Title = styled.h2``

const Content = styled.div`
  ${tw`p-10 m-auto -mt-8 w-11/12 bg-white rounded`}

  box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
    1px 3px 8px rgba(39, 44, 49, 0.03);
  z-index: ;
`

const Footer = styled.div`
  ${tw`float-right font-bold text-orange-600`}
`

const FooterLink = styled(Link)`
  ${tw``}
`

class CampaignCardList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CardList>
        {this.props.campaigns.map(
          ({ title, id, description, episodes, image }) => (
            <Card>
              <Header src={'https:' + image.fluid.src} />

              {episodes.length > 0 ? (
                <Content>
                  <Title>{title}</Title>
                  {description.description}
                  <h3>{episodes[0].title}</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: episodes[0].description.description,
                    }}
                  />
                  <AudioPlayerButton episode={episodes[0]} />

                  <Footer>
                    <FooterLink to={'campaigns/' + id}>
                      Gå till kampanj
                    </FooterLink>
                  </Footer>
                </Content>
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
