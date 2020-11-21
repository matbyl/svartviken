import React from 'react'
import { Link } from 'gatsby'
import FacebookIcon from './../assets/logo-facebook.svg'
import InstagramIcon from './../assets/logo-instagram.svg'
import TwitterIcon from './../assets/logo-twitter.svg'
import tw, {styled} from 'twin.macro'
import playIconWhite from './../assets/White_Play_Icon.svg'

import ContextConsumer, { ContextProviderComponent } from './Context'
import AudioPlayer from './AudioPlayer'

const Footer = styled.section`
  min-height: 280px;
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

  opacity: 0.82;
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`

let lastScrollY = 0
let ticking = false
const socialMediaIcon = (icon, url) => <a href={url} target="_blank"><SocialIcon src={icon} /></a>


class Template extends React.Component {
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  nav = React.createRef()

  handleScroll = () => {
    lastScrollY = window.scrollY

    if (!ticking) {
      window.requestAnimationFrame(() => {
        const shadowClassName = ' shadow-xl'
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
          <NavBarItem to={'/collaborations'}>Våra samarbeten</NavBarItem> |{' '}
          <NavBarItem to={'/material'}>Material</NavBarItem> |{' '}
          { socialMediaIcon(FacebookIcon, "https://www.facebook.com/SvartvikenRP") }
          { socialMediaIcon(InstagramIcon, "https://www.instagram.com/svartviken_rollspelspodd/") }
          { socialMediaIcon(TwitterIcon, "https://twitter.com/svartvikenrp") }
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
          { socialMediaIcon(FacebookIcon, "https://www.facebook.com/SvartvikenRP") }
          { socialMediaIcon(InstagramIcon, "https://www.instagram.com/svartviken_rollspelspodd/") }
          { socialMediaIcon(TwitterIcon, "https://twitter.com/svartvikenrp") }
        </FooterSocialMedia>
        <p className="text-white mt-5">Crafted with 🎲</p>
        <p className="text-white">
          Copyright © 2019 Svartviken, All Rights Reserved.
        </p>
      </Footer>
    )

    return (
      <ContextProviderComponent>
        <div className="flex flex-col h-screen">
          {header}
          {audioPlayer}
          <div className="flex flex-grow">{children}</div>
          {footer}
        </div>
      </ContextProviderComponent>
    )
  }
}

export default Template
