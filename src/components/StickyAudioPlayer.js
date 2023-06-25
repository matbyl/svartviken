import React, { useCallback } from 'react'
import tw, { styled } from 'twin.macro'
import playIconWhite from './../assets/icons/white-play.svg'
import pauseIconWhite from './../assets/icons/white-pause.svg'
import replay30IconWhite from './../assets/icons/white-backward.svg'
import forward30IconWhite from './../assets/icons/white-forward.svg'
import CloseIcon from './../assets/icons/white-close.svg'
import { useStorageRoot } from '../hooks/use-storage-root'
import makeStorageUrl from '../utils/makeStorageUrl'
import { useAudioPlayer, useAudioPosition } from 'react-use-audio-player'
import AudioSeekbar from './AudioSeekbar'
import { clamp } from 'lodash'

const Container = styled.div`
  grid-template-columns: 250px 35px 35px 35px 10px 1fr 10px 35px;
  grid-template-areas: 'title backward play forward . seekBar . close';

  background: rgba(0, 0, 0, 1);
  ${tw`fixed bottom-0 h-16 bg-black z-50 w-full hidden md:grid md:h-24 md:px-4`}
`

const Title = styled.h4`
  color: white;
  margin: auto 0px;
`

const MediaButton = styled.button`
  cursor: pointer;
  background: transparent;
  text-decoration: none;
  outline: none;
  border: none;
  opacity: 0.82;
  padding: 0;
  transition: transform 0.25s cubic-bezier(0.5, 0, 0.1, 1);
  -webkit-transition: transform 0.25s cubic-bezier(0.5, 0, 0.1, 1);
  img {
    margin: auto;
    height: 32px;
    width: 32px;
  }

  :hover {
    opacity: 1;
    text-decoration: none;
    transform: scale(1.1);
  }

  :focus {
    outline: none;
  }
`

const ControllButton = ({ icon, action, size, ariaLabel }) => (
  <MediaButton onClick={action} size={size} aria-label={ariaLabel}>
    <img src={icon} alt="control-button-image" />
  </MediaButton>
)

const PlayPauseButton = ({ playing, togglePlayPause }) =>
  playing ? (
    <ControllButton
      ariaLabel="media-player-pause-button"
      icon={pauseIconWhite}
      action={togglePlayPause}
      size="45"
    />
  ) : (
    <ControllButton
      ariaLabel="media-player-play-button"
      icon={playIconWhite}
      action={togglePlayPause}
      size="45"
    />
  )

const StickyAudioPlayer = ({ title, supTitle, filename, close }) => {
  const { storageRoot } = useStorageRoot()

  const { togglePlayPause, playing } = useAudioPlayer({
    src: makeStorageUrl(storageRoot, filename),
    autoplay: true,
  })

  const { duration, seek, position } = useAudioPosition({
    highRefreshRate: true,
  })

  const goToPosition = useCallback(
    percentage => {
      seek(clamp(duration * percentage, 0, duration))
    },
    [duration, seek]
  )

  const forward = sec => {
    const value = position + sec < duration ? position + sec : duration
    goToPosition(value / duration)
  }

  const backward = sec => {
    const value = position - sec > 0 ? position - sec : 0
    goToPosition(value / duration)
  }

  return (
    <Container>
      {supTitle ? (
        <Title>
          <small>{supTitle}</small>
          <div>{title}</div>
        </Title>
      ) : (
        <Title>{title}</Title>
      )}

      <ControllButton
        style={{ gridArea: 'backward' }}
        icon={replay30IconWhite}
        action={() => backward(30)}
      />
      <PlayPauseButton
        style={{ gridArea: 'play' }}
        className="w-32"
        playing={playing}
        togglePlayPause={togglePlayPause}
      />
      <ControllButton
        style={{ gridArea: 'forward' }}
        icon={forward30IconWhite}
        action={() => forward(30)}
      />
      <AudioSeekbar />
      <MediaButton onClick={close} style={{ gridArea: 'close' }}>
        <img src={CloseIcon} />
      </MediaButton>
    </Container>
  )
}

export default StickyAudioPlayer
