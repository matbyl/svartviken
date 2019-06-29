import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import AudioPlayerButton from './AudioPlayerButton'
import tw from 'tailwind.macro'

const CardList = styled.div`
  ${tw`bg-color-black flex flex-row flex-wrap`}
`

const Card = styled.div`
  width: 800px;
  margin: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
    1px 3px 8px rgba(39, 44, 49, 0.03);

  &:hover {
    transform: scale(1.01);
  }
`

const Header = styled.div`
  border-radius: 10px 10px 0 0;
  background: black;
  margin-bottom: 15px;
  height: 200px;
  overflow: hidden;
  background: linear-gradient(
    119.36deg,
    #0a0a0a 0%,
    #1d1d1d 99.99%,
    #1d1d1d 100%
  );
  img {
    width: 100%;
  }
`

const Title = styled.h2``

const Content = styled.div`
  ${tw`p-5`}
`

const Footer = styled.div`
  float: right;
  margin: 15px;
`

const FooterLink = styled(Link)`
  text-decoration: none;
`

class CampaignCardList extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <CardList>
        {this.props.campaigns.map(({ title, description, episodes, image }) => (
          <Card>
            <Header>
              <img src={'https:' + image.fluid.src} />
            </Header>

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
              </Content>
            ) : (
              ''
            )}
            <Footer>
              <FooterLink>Gå till kampanj -></FooterLink>
            </Footer>
          </Card>
        ))}
      </CardList>
    )
  }
}

export default CampaignCardList
