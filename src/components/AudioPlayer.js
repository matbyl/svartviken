import React, { useCallback, useState, useRef, useEffect } from 'react'
import { Howl } from 'howler'
import tw, { styled } from 'twin.macro'
import { clamp } from 'lodash'
import PropTypes from 'prop-types'
import playIconWhite from './../assets/icons/white-play.svg'
import pauseIconWhite from './../assets/icons/white-pause.svg'
import replay30IconWhite from './../assets/icons/white-backward.svg'
import forward30IconWhite from './../assets/icons/white-forward.svg'
import CloseIcon from './../assets/icons/white-close.svg'
import { useStorageRoot } from '../hooks/use-storage-root'
import makeStorageUrl from '../utils/makeStorageUrl'
import { ACTIONS } from '../state/createStore'
import { connect } from 'react-redux'
import { useEventListener } from '../hooks/use-event-listener'
import { normalize } from '../utils/math'
import { useAudioPlayer, useAudioPosition } from 'react-use-audio-player'

const Container = styled.div`
  grid-template-columns: 250px 35px 35px 35px 10px 1fr 35px;
  grid-template-areas: 'title backward play forward . seekBar close';

  background: rgba(0, 0, 0, 1);
  ${tw`h-full w-full hidden md:grid md:h-16 md:px-4`}
`

const Title = styled.h4`
  color: white;
  margin: auto 0px;
`

const SeekBar = styled.div`
  display: grid;
  grid-template-columns: 70px auto 70px;
  grid-template-areas: 'start seek end';

  margin: auto;
  float: left;
  width: 100%;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.88);
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                                supported by Chrome and Opera */
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

const Time = styled.div`
  font-size: 14px;
  z-index: 2;
  margin: auto 5px;

  &.white {
    color: white;
  }

  &.black {
    color: black;
  }
`

const ProgressPointer = styled.div.attrs(({ progress }) => ({
  style: {
    left: 'calc(' + progress + '% - 5px)',
  },
}))`
  z-index: 42;
  border-radius: 100%;
  background: #f0f0f0;
  height: 20px;
  width: 20px;
  top: -6.5px;
  position: absolute;
  overflow: visible;
  -webkit-transition: opacity 0.2s, transform 0.25s cubic-bezier(0.5, 0, 0.1, 1); /* Safari */
  transition: opacity 0.2s, transform 0.25s cubic-bezier(0.5, 0, 0.1, 1);
  border: 2px solid black;

  &:hover {
    background: #fefefe;
    transform: scale(1.2);
  }
`

const ProgressWrapper = styled.div`
  z-index: 0;
  float: left;
  position: relative;
  cursor: pointer;

  border-radius: 5px;
  width: 100%;
  margin: 15px auto;
  height: 7px;

  &.white {
    background: rgba(255, 255, 255, 0.2);
  }

  &.black {
    background: rgba(0, 0, 0, 0.2);
  }
`

const Progress = styled.div.attrs(({ progress }) => ({
  style: {
    width: progress + '%',
  },
}))`
  border-radius: 5px;
  position: absolute;

  background: grey;
  z-index: 1;
  height: 7px;
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

const hours = time => Math.floor(time / 3600)
const minutes = time => Math.floor(time / 60) % 60
const seconds = time => Math.floor(time % 60)

const formatTime = time => {
  const h = hours(time)
  const m = minutes(time)
  const s = seconds(time)

  const padLeft = (string, pad, length) =>
    (new Array(length + 1).join(pad) + string).slice(-length)

  return (
    (h ? padLeft(h, '0', 2) + ':' : '') +
    padLeft(m, '0', 2) +
    ':' +
    padLeft(s, '0', 2)
  )
}

const AudioPlayer = ({ title, supTitle, filename, close }) => {
  const progressRef = useRef(null)
  const [dirtyPosition, setDirtyPosition] = useState(null)

  const isDirtyPositionSet = dirtyPosition !== null

  const { storageRoot } = useStorageRoot()

  const { togglePlayPause, playing } = useAudioPlayer({
    src: makeStorageUrl(storageRoot, filename),
    autoplay: true,
    onend: () => console.log('sound has ended!'),
  })

  const { percentComplete, duration, seek, position } = useAudioPosition({
    highRefreshRate: true,
  })

  const goToPosition = useCallback(
    percentage => {
      seek(clamp(duration * percentage, 0, duration))
    },
    [duration, seek]
  )

  const getNormalizedPosition = ({ current }, { pageX }) => {
    if (current) {
      const boundingClientRect = current.getBoundingClientRect()
      const maxPos = boundingClientRect.right - boundingClientRect.x
      return clamp(normalize(0, maxPos, pageX - boundingClientRect.x), 0, 1)
    }
  }

  const mouseMoveHandler = useCallback(
    event =>
      isDirtyPositionSet
        ? setDirtyPosition(getNormalizedPosition(progressRef, event))
        : null,
    [isDirtyPositionSet, setDirtyPosition]
  )

  const mouseDownHandler = useCallback(
    event => setDirtyPosition(getNormalizedPosition(progressRef, event)),
    [setDirtyPosition]
  )

  const mouseUpHandler = useCallback(() => {
    if (isDirtyPositionSet) {
      goToPosition(dirtyPosition)
      setDirtyPosition(null)
    }
  }, [isDirtyPositionSet, goToPosition, dirtyPosition, setDirtyPosition])

  useEventListener('mousemove', mouseMoveHandler)
  useEventListener('mouseup', mouseUpHandler)

  const forward = sec => {
    const value = position + sec < duration ? position + sec : duration
    goToPosition(value / duration)
  }

  const backward = sec => {
    const value = position - sec > 0 ? position - sec : 0
    goToPosition(value / duration)
  }

  const progressInPercentage = isDirtyPositionSet
    ? dirtyPosition * 100
    : percentComplete

  const currentPosition = isDirtyPositionSet
    ? dirtyPosition * duration
    : position

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
      <SeekBar style={{ gridArea: 'seekBar' }}>
        <Time className="white" style={{ gridArea: 'start' }}>
          {formatTime(currentPosition)}
        </Time>

        <ProgressWrapper
          id="progress-bar"
          className="white"
          style={{ gridArea: 'seek' }}
          ref={progressRef}
          onMouseDownCapture={mouseDownHandler}
        >
          <Progress progress={progressInPercentage}>&nbsp;</Progress>

          <ProgressPointer progress={progressInPercentage}>
            &nbsp;
          </ProgressPointer>
        </ProgressWrapper>
        <Time
          className="white"
          style={{
            gridArea: 'end',
            textAlign: 'right',
            marginRight: '10px',
          }}
        >
          {formatTime(duration)}
        </Time>
      </SeekBar>
      <MediaButton onClick={close} style={{ gridArea: 'close' }}>
        <img src={CloseIcon} />
      </MediaButton>
    </Container>
  )
}

export default AudioPlayer
