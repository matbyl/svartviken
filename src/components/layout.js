import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'gatsby'
import FacebookIcon from './../assets/icons/facebook.svg'
import InstagramIcon from './../assets/icons/instagram.svg'
import TwitterIcon from './../assets/icons/twitter.svg'
import CloseIcon from './../assets/icons/white-close.svg'
import MenuIcon from './../assets/icons/white-menu.svg'
import RssIcon from './../assets/icons/rss-feed.svg'
import YoutubeIcon from './../assets/icons/yt_logo_mono_dark.svg'
import tw, { styled } from 'twin.macro'

import { connect } from 'react-redux'
import StickyAudioPlayer from './StickyAudioPlayer'
import { socialMediaIcon } from './SocialIcon'
import DiscordLink from './DiscordLink'
import { AudioPlayerProvider } from 'react-use-audio-player'
import { ACTIONS } from '../state/createStore'
import useWindowDimensions from '../hooks/use-window-dimensions'
import FullscreenAudioPlayer from './FullscreenAudioPlayer'

const Footer = styled.div`
  flex-shrink: 0;
  text-align: center;
  font-size: 24px;
  padding: 15px;
  background: #0c0c0c;
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
  background: rgba(0, 0, 0, 0.72);
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
let lastScrollY = 0
let ticking = false

const menuItem = (url, name, onClick, inNewTab = false) => (
  <li className="py-2 pl-5">
    <Link
      to={url}
      onClick={onClick}
      className="text-white"
      target={inNewTab ? '_blank' : ''}
    >
      {name}
    </Link>
  </li>
)

const externalMenuItem = (url, name) => (
  <li className="py-2 pl-5">
    <a href={url} className="text-white" target="_blank" rel="noopener">
      {name}
    </a>
  </li>
)

const Template = ({ children, selectedEpisode, closeEpisode }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { width } = useWindowDimensions()

  const navBar = (
    <NavBar>
      <div
        className={
          menuOpen
            ? 'md:hidden flex flex-row transition duration-500 bg-gray-900'
            : 'md:hidden flex flex-row transition duration-500 bg-transparent h-16'
        }
      >
        <ul
          className={
            menuOpen
              ? 'flex-1 transition duration-500 transform opacity-1 text-xl pt-6 pb-4'
              : 'flex-1 transition duration-500 transform opacity-0 -translate-y-32 text-xl pt-6 pb-4'
          }
        >
          {menuItem('/', 'Hem', () => setMenuOpen(false))}
          {menuItem('/about', 'Om oss', () => setMenuOpen(false))}
          {menuItem('/collaborations', 'Våra samarbeten', () =>
            setMenuOpen(false)
          )}
          {menuItem('/material', 'Material', () => setMenuOpen(false))}
          {menuItem('/scenarios', 'Äventyr', () => setMenuOpen(false))}
          {externalMenuItem(
            'https://www.patreon.com/svartvikenrp',
            'Patreon',
            () => setMenuOpen(false)
          )}
          {externalMenuItem(
            'https://shop.spreadshirt.se/svartvikenrp/all',
            'Poddshop',
            () => setMenuOpen(false)
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
            {socialMediaIcon(
              TwitterIcon,
              'https://twitter.com/svartvikenrp',
              'twitter'
            )}
            {socialMediaIcon(
              YoutubeIcon,
              'https://twitter.com/svartvikenrp',
              'youtube'
            )}
            <DiscordLink />
            {socialMediaIcon(RssIcon, '/feed.xml', 'rss')}
          </li>
        </ul>

        {menuOpen ? (
          <img
            src={CloseIcon}
            className="align-self-end cursor-pointer m-4 w-8 h-8"
            onClick={() => setMenuOpen(false)}
            alt="close-icon"
          />
        ) : (
          <img
            src={MenuIcon}
            className="align-self-end cursor-pointer m-4 w-8 h-8"
            onClick={() => setMenuOpen(true)}
            alt="menu-icon"
          />
        )}
      </div>

      <NavBarRow className="hidden md:flex">
        <NavBarItem to={'/'}>Hem</NavBarItem> |{' '}
        <NavBarItem to={'/about'}>Om oss</NavBarItem> |{' '}
        <NavBarItem to={'/collaborations'}>Våra samarbeten</NavBarItem> |{' '}
        <NavBarItem to={'/material'}>Material</NavBarItem> |{' '}
        <NavBarItem to={'/scenarios'}>Äventyr</NavBarItem> |{' '}
        <ExternalNavBarItem
          href="https://www.patreon.com/svartvikenrp"
          target="_blank"
        >
          Patreon
        </ExternalNavBarItem>{' '}
        |{' '}
        <ExternalNavBarItem
          href="https://shop.spreadshirt.se/svartvikenrp/all"
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
        {socialMediaIcon(
          TwitterIcon,
          'https://twitter.com/svartvikenrp',
          'twitter'
        )}
        {socialMediaIcon(
          YoutubeIcon,
          'https://www.youtube.com/channel/UCXQlUFfLa8N28WPbe_8GWWg',
          'youtube'
        )}
        <DiscordLink />
        {socialMediaIcon(RssIcon, '/feed.xml', 'rss')}
      </NavBarRow>
    </NavBar>
  )

  const audioPlayer = episode => {
    const supTitle = episode.campaign
      ? episode.campaign[0].title
      : episode.oneshot ? episode.oneshot[0].title : 'Avsnitt ' + episode.number
    return (
      <AudioPlayerProvider>
        {width > 980 ? (
          <StickyAudioPlayer
            supTitle={supTitle}
            title={episode.title}
            filename={episode.filename}
            style={{ position: 'fixed', bottom: 0, zIndex: 9001 }}
            close={closeEpisode}
          />
        ) : (
          <FullscreenAudioPlayer
            supTitle={supTitle}
            title={episode.title}
            filename={episode.filename}
            style={{ position: 'fixed', bottom: 0, zIndex: 9001 }}
            close={closeEpisode}
          />
        )}
      </AudioPlayerProvider>
    )
  }

  const footer = (
    <Footer>
      <FooterTitle>Följ oss</FooterTitle>
      <FooterSocialMedia>
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
        {socialMediaIcon(
          TwitterIcon,
          'https://twitter.com/svartvikenrp',
          'twitter'
        )}
        {socialMediaIcon(
          YoutubeIcon,
          'https://www.youtube.com/channel/UCXQlUFfLa8N28WPbe_8GWWg',
          'youtube'
        )}
        <DiscordLink />
        {socialMediaIcon(RssIcon, '/feed.xml', 'rss')}
      </FooterSocialMedia>
      <p className="text-white mt-5">Crafted with 🎲</p>
    </Footer>
  )

  return (
    <div className="flex flex-col min-h-full">
      {navBar}
      {selectedEpisode ? audioPlayer(selectedEpisode) : null}
      <div className="flex flex-grow">{children}</div>
      {footer}
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    closeEpisode: () => dispatch({ type: ACTIONS.SET_EPISODE, payload: null }),
  }
}

const ConnectedTemplate = connect(
  ({ selectedEpisode }) => ({ selectedEpisode }),
  mapDispatchToProps
)(Template)

export default ConnectedTemplate
