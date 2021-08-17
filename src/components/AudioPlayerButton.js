import React from 'react'
import { styled } from 'twin.macro'
import WhiteIcon from './../assets/icons/white-play.svg'
import BlackIcon from './../assets/icons/black-play.svg'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'
import { ACTIONS } from '../state/createStore'

const EnabledMediaButton = styled.button`
  text-decoration: none;
  outline: none;
  border: none;
  opacity: 0.72;
  padding: 0;
  margin: 15px auto;
  transition: transform 0.25s cubic-bezier(0.5, 0, 0.1, 1);
  -webkit-transition: transform 0.25s cubic-bezier(0.5, 0, 0.1, 1);

  img {
    margin: auto;
    height: 64px;
    width: 64px;
    outline: none;
  }

  :focus {
    outline: none;
  }

  :hover {
    transform: scale(1.05);
    opacity: 1;
       text-decoration: none;
  }
`
const DisabledMediaButton = styled.button`
  cursor: default;
  text-decoration: none;
  user-select: none;
  outline: none;
  border: none;
  opacity: 0.42;
  padding: 0;
  margin: 15px auto;

  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 4s linear infinite;

  img {
    margin: auto;
    height: 64px;
    width: 64px;
    outline: none;
  }

  :focus {
    outline: none;
  }
`

const AudioPlayerButton = ({ light, selectedEpisode, setEpisode, episode, playingAudio }) =>
  selectedEpisode === episode && playingAudio ? (
    <DisabledMediaButton aria-label="disabled-play-episode-button">
      <img src={light ? WhiteIcon : BlackIcon} alt="play-icon" />
    </DisabledMediaButton>
  ) : (
    <EnabledMediaButton
      aria-label="enabled-play-episode-button"
      onClick={setEpisode(episode)}
    >
      <img src={light ? WhiteIcon : BlackIcon} alt="play-icon" />
    </EnabledMediaButton>
  )

const mapStateToProps = ({ playingAudio, selectedEpisode }) => {
  return { playingAudio, selectedEpisode }
}

const mapDispatchToProps = dispatch => {
  return {
    play: () => dispatch({ type: ACTIONS.PLAY }),
    pause: () => dispatch({ type: ACTIONS.PAUSE }),
    setEpisode: payload => () => dispatch({type: ACTIONS.SET_EPISODE, payload})
  }
}

const ConnectedAudioPlayButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioPlayerButton)

AudioPlayerButton.propTypes = {
  playingAudio: PropTypes.bool.isRequired,
  play: PropTypes.func.isRequired,
}

export default ConnectedAudioPlayButton
