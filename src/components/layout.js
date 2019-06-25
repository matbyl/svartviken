import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import FacebookIcon from './../assets/logo-facebook.svg'
import InstagramIcon from './../assets/logo-instagram.svg'
import TwitterIcon from './../assets/logo-twitter.svg'
import tw from 'tailwind.macro'

import ContextConsumer, { ContextProviderComponent } from './Context'
import AudioPlayer from './AudioPlayer'

const Body = styled.div``

const Footer = styled.section`
  min-height: 180px;
  text-align: center;
  font-size: 24px;
  padding: 15px;
  background: linear-gradient(
    119.36deg,
    #0a0a0a 0%,
    #1d1d1d 99.99%,
    #1d1d1d 100%
  );
`

const FooterTitle = styled.h4`
  margin: 15px auto;
  color: whitesmoke;
`

const FooterSocialMedia = styled.div`
  img {
    margin: auto 15px;
  }
`

const NavBar = styled.div`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  position: fixed;
  color: white;
  background: rgba(0, 0, 0, 0);
  z-index: 1000;

  flex: 100%;
  font-size: 20px;

  img {
    width: 20px;
    margin: auto 5px;
  }
`

const NavBarRow = styled.div`
  margin: 10px 15px;
  display: block;
`

const NavBarItem = styled(Link)`
  display: inline-block;
  text-shadow: none;
  color: white;
  text-decoration: none;

  :hover {
    text-decoration: underline;
  }
`

const SocialIcon = styled.img`
  ${tw`inline-block`};
`

let lastScrollY = 0
let ticking = false

class Template extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    console.log('hereeee')
    window.removeEventListener('scroll', this.handleScroll)
  }

  nav = React.createRef()

  handleScroll = () => {
    lastScrollY = window.scrollY

    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (lastScrollY > 100) {
          this.nav.current.style.background = 'rgba(0, 0, 0, 0.72)'
        } else {
          this.nav.current.style.background = 'rgba(0, 0, 0, 0)'
        }
        ticking = false
      })

      ticking = true
    }
  }

  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    const header = (
      <NavBar ref={this.nav}>
        <NavBarRow>
          <NavBarItem to={'/'}>Hem</NavBarItem> |{' '}
          <NavBarItem to={'/about'}>Om oss</NavBarItem> |{' '}
          <NavBarItem to={'/campaigns'}>Kampanjer</NavBarItem> |{' '}
          <NavBarItem to={'/one-shots'}>One shots</NavBarItem> |{' '}
          <NavBarItem to={'/material'}>Material</NavBarItem>
        </NavBarRow>
        <NavBarRow>
          <SocialIcon src={FacebookIcon} />
          <SocialIcon src={InstagramIcon} />
          <SocialIcon src={TwitterIcon} />
        </NavBarRow>
      </NavBar>
    )

    const audioPlayer = (
      <ContextConsumer>
        {({ data }) =>
          data.episode ? (
            <AudioPlayer
              episode={data.episode}
              color="white"
              style={{ position: 'fixed', bottom: 0, zIndex: 9001 }}
            />
          ) : null
        }
      </ContextConsumer>
    )

    const footer = (
      <Footer>
        <FooterTitle>Följ oss</FooterTitle>
        <FooterSocialMedia>
          <SocialIcon src={FacebookIcon} />
          <SocialIcon src={InstagramIcon} />
          <SocialIcon src={TwitterIcon} />
        </FooterSocialMedia>
      </Footer>
    )

    return (
      <ContextProviderComponent>
        {header}
        {audioPlayer}
        {children}
        {footer}
      </ContextProviderComponent>
    )
  }
}

export default Template
