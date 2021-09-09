import React, { useCallback, useState, useRef, useEffect } from 'react'

import { useEventListener } from '../hooks/use-event-listener'
import { normalize } from '../utils/math'
import tw, { styled } from 'twin.macro'
import { useAudioPlayer, useAudioPosition } from 'react-use-audio-player'

import { clamp } from 'lodash'

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

const hours = time => Math.floor(time / 3600)
const minutes = time => Math.floor(time / 60) % 60
const seconds = time => Math.floor(time % 60)

export const formatTime = totalSeconds => {
  const h = hours(totalSeconds)
  const m = minutes(totalSeconds)
  const s = seconds(totalSeconds)

  const padLeft = (string, pad, length) =>
    (new Array(length + 1).join(pad) + string).slice(-length)

  return (
    (h ? padLeft(h, '0', 2) + ':' : '') +
    padLeft(m, '0', 2) +
    ':' +
    padLeft(s, '0', 2)
  )
}

const AudioSeekbar = () => {
  const progressRef = useRef(null)
  const [dirtyPosition, setDirtyPosition] = useState(null)

  const isDirtyPositionSet = dirtyPosition !== null

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

  const progressInPercentage = isDirtyPositionSet
    ? dirtyPosition * 100
    : percentComplete

  const currentPosition = isDirtyPositionSet
    ? dirtyPosition * duration
    : position

  return (
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
  )
}

export default AudioSeekbar
