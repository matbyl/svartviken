import React from 'react'
import { Link } from 'gatsby'
import FacebookIcon from './../assets/logo-facebook.svg'
import InstagramIcon from './../assets/logo-instagram.svg'
import TwitterIcon from './../assets/logo-twitter.svg'
import CloseIcon from './../assets/icons/close-white.svg'
import MenuIcon from './../assets/icons/menu-white.svg'
import RssIcon from './../assets/icons/rss-feed.svg'
import tw, { styled } from 'twin.macro'
import playIconWhite from './../assets/White_Play_Icon.svg'

import ContextConsumer, { ContextProviderComponent } from './Context'
import AudioPlayer from './AudioPlayer'

const Footer = styled.div`
  flex-shrink: 0;
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

const FooterTitle = styled.h1`
  font-size: 1em;
  margin: 15px auto;
  color: whitesmoke;
`

const FooterSocialMedia = styled.div`
  img {
    margin: auto 15px;
  }
`

const NavBar = styled.nav`
  ${tw`text-lg`};

  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  position: fixed;
  color: white;
  background: rgba(0, 0, 0, 0);
  z-index: 49;

  flex: 100%;
`

const NavBarRow = styled.div`
  margin: 10px 15px;
`

const NavBarItem = styled(Link)`
  display: inline-block;
  text-shadow: none;
  color: white;
  text-decoration: none;
  margin: auto 15px;

  :hover {
    text-decoration: underline;
  }
`

const ExternalNavBarItem = styled.a`
  display: inline-block;
  text-shadow: none;
  color: white;
  text-decoration: none;
  margin: auto 15px;

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
  width: 20px;
  margin: auto 5px;
`

let lastScrollY = 0
let ticking = false
const socialMediaIcon = (icon, url, alt) => (
  <a className="px-1" href={url} target="_blank">
    <SocialIcon src={icon} alt={alt} width="20" height="20"/>
  </a>
)

const menuItem = (url, name, onClick, inNewTab = false) => (
  <li className="py-2 pl-5">
    <Link
      to={url}
      onClick={onClick}
      className="hover:text-white"
      target={inNewTab ? '_blank' : ''}
    >
      {name}
    </Link>
  </li>
)

const externalMenuItem = (url, name) => (
  
  <li className="py-2 pl-5">
  <a
    href={url}
    className="hover:text-white"
    target='_blank'
    rel="noopener"
  >
    {name}
  </a>
</li>
)

class Template extends React.Component {
  constructor(props) {
    super(props)
    this.state = { menuOpen: false }
    this.toggleMenu = this.toggleMenu.bind(this)
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  toggleMenu() {
    console.log('TOGGLED MENU')
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  nav = React.createRef()

  handleScroll = () => {
    lastScrollY = window.scrollY

    if (!ticking && this.nav && this.nav.current) {
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
        <div
          className={
            this.state.menuOpen
              ? 'md:hidden flex flex-row transition duration-500 bg-gray-900'
              : 'md:hidden flex flex-row transition duration-500 bg-transparent h-16'
          }
        >
          <ul
            className={
              this.state.menuOpen
                ? 'flex-1 transition duration-500 transform opacity-1 text-xl pt-6 pb-4'
                : 'flex-1 transition duration-500 transform opacity-0 -translate-y-32 text-xl pt-6 pb-4'
            }
          >
            {menuItem('/', 'Hem', this.toggleMenu)}
            {menuItem('/about', 'Om oss', this.toggleMenu)}
            {menuItem('/collaborations', 'Våra samarbeten', this.toggleMenu)}
            {menuItem('/material', 'Material', this.toggleMenu)}
            {externalMenuItem(
              'https://shop.spreadshirt.se/svartvikenrp/all',
              'Poddshop',
              this.toggleMenu
            )}
            <li className="pl-5">
              {socialMediaIcon(
                FacebookIcon,
                'https://www.facebook.com/SvartvikenRP',
                'facebook'
              )}
              {socialMediaIcon(
                InstagramIcon,
                'https://www.instagram.com/svartviken_rollspelspodd/',
                'instagram'
              )}
              {socialMediaIcon(TwitterIcon, 'https://twitter.com/svartvikenrp', 'twitter')}
              {socialMediaIcon(RssIcon, '/rss.xml', 'rss')}
            </li>
          </ul>

          {this.state.menuOpen ? (
            <img
              src={CloseIcon}
              className="align-self-end cursor-pointer m-4 w-8 h-8"
              onClick={this.toggleMenu}
              alt="close-icon"
            />
          ) : (
            <img
              src={MenuIcon}
              className="align-self-end cursor-pointer m-4 w-8 h-8"
              onClick={this.toggleMenu}
              alt="menu-icon"
            />
          )}
        </div>

        <NavBarRow className="hidden md:flex">
          <NavBarItem to={'/'}>Hem</NavBarItem> |{' '}
          <NavBarItem to={'/about'}>Om oss</NavBarItem> |{' '}
          <NavBarItem to={'/collaborations'}>Våra samarbeten</NavBarItem> |{' '}
          <NavBarItem to={'/material'}>Material</NavBarItem> |{' '}
          <ExternalNavBarItem
            href='https://shop.spreadshirt.se/svartvikenrp/all'
            target="_blank"
          >
            Poddshop
          </ExternalNavBarItem>{' '}
          |{' '}
          {socialMediaIcon(
            FacebookIcon,
            'https://www.facebook.com/SvartvikenRP',
            'facebook'
          )}
          {socialMediaIcon(
            InstagramIcon,
            'https://www.instagram.com/svartviken_rollspelspodd/',
            'instagram'
          )}
          {socialMediaIcon(TwitterIcon, 'https://twitter.com/svartvikenrp', 'twitter')}
          {socialMediaIcon(RssIcon, '/rss.xml', 'rss')}
        </NavBarRow>
      </NavBar>
    )

    const audioPlayer = (
      <ContextConsumer>
        {({ data, set }) =>
          data.episode ? (
            <AudioPlayer
              title={
                data.episode.title
                  ? data.episode.title
                  : 'Kampanj - Avsnitt ' + data.episode.number
              }
              url={data.episode.filename}
              color="white"
              style={{ position: 'fixed', bottom: 0, zIndex: 9001 }}
              close={() => {
                set({
                  episode: null,
                })
              }}
            />
          ) : null
        }
      </ContextConsumer>
    )

    const footer = (
      <Footer>
        <FooterTitle>Följ oss</FooterTitle>
        <FooterSocialMedia>
          {socialMediaIcon(
            FacebookIcon,
            'https://www.facebook.com/SvartvikenRP'
          )}
          {socialMediaIcon(
            InstagramIcon,
            'https://www.instagram.com/svartviken_rollspelspodd/'
          )}
          {socialMediaIcon(TwitterIcon, 'https://twitter.com/svartvikenrp')}
          {socialMediaIcon(RssIcon, '/rss.xml')}
        </FooterSocialMedia>
        <p className="text-white mt-5">Crafted with 🎲</p>
        <p className="text-white">
          Copyright © 2019 Svartviken, All Rights Reserved.
        </p>
      </Footer>
    )

    return (
      <ContextProviderComponent>
        <div className="flex flex-col min-h-full">
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
