import React from 'react'
import { Howl } from 'howler'
import styled from 'styled-components'

import playIconWhite from './../assets/White_Play_Icon.svg'
import pauseIconWhite from './../assets/White_Pause_Icon.svg'
import replay30IconWhite from './../assets/White_Reverse_30s_Icon.svg'
import forward30IconWhite from './../assets/White_Forward_30s_Icon.svg'
import playIconBlack from './../assets/circled-play-50-black.png'
import pauseIconBlack from './../assets/pause-button-50-black.png'
import replay30IconBlack from './../assets/replay-30-50-black.png'
import forward30IconBlack from './../assets/forward-30-50-black.png'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  display: grid;
  z-index: 1000;
  grid-template-columns: 250px 35px 35px 35px 10px 1fr;
  grid-template-areas: 'title backward play forward . seekBar';

  width: 100%;
  background: rgba(0, 0, 0, 0.9);
  height: 80px;
`

const Title = styled.h4`
  color: white;
  margin: auto 15px;
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
  margin: 15px auto;

  img {
    margin: auto;
    height: 24px;
    width: 24px;
  }

  :hover {
    opacity: 1;
       text-decoration: none;
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
    left: progress + '%',
  },
}))`
  z-index: 42;
  border-radius: 100%;
  background: #F0F0F0;
  height: 20px;
  width: 20px;
  transform: translateY(-6.5px) translateX(-10px);
  position: absolute;
  overflow: visible;
  -webkit-transition: opacity 0.2s, border 0.2s; /* Safari */
  transition: opacity 0.2s, border 0.2s;
  border: 2px solid black;

  &:hover {
    background: #FEFEFE;
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

const ControllButton = ({ icon, action, size }) => (
  <MediaButton onClick={action} size={size}>
    <img src={icon} />
  </MediaButton>
)

const PlayPauseButton = ({ color, playing, playAction, pauseAction }) =>
  playing ? (
    <ControllButton
      icon={color === 'white' ? pauseIconWhite : pauseIconBlack}
      action={pauseAction}
      size="45"
    />
  ) : (
      <ControllButton
        icon={color === 'white' ? playIconWhite : playIconBlack}
        action={playAction}
        size="45"
      />
    )

const minutes = time => Math.floor(time / 60)
const seconds = (time, minutes) => Math.floor(time - minutes * 60)

const str_pad_left = (string, pad, length) =>
  (new Array(length + 1).join(pad) + string).slice(-length)

const formatTime = time => {
  const m = minutes(time)
  const s = seconds(time, m)

  return str_pad_left(m, '0', 2) + ':' + str_pad_left(s, '0', 2)
}

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props)

    this.loadAudio(props.episode.audio.file.url)

    this.state = {
      playing: false,
      time: '00:00',
      progress: 0,
      duration: formatTime(this.audio.duration()),
      seeking: false,
      seekBarMouseDown: false,
    }

    this.openAudioPlayer = this.openAudioPlayer.bind(this)
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.forward = this.forward.bind(this)
    this.backward = this.backward.bind(this)
    this.step = this.step.bind(this)
    this.seek = this.seek.bind(this)
    this.seekOnMouseDown = this.seekOnMouseDown.bind(this)
    this.getSeekValueFromMouseEvent = this.getSeekValueFromMouseEvent.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.episode.audio.file.url !== nextProps.episode.audio.file.url
    ) {
      this.pause()
      this.loadAudio(nextProps.episode.audio.file.url)
    }
  }

  componentWillMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false)
    document.addEventListener('mouseup', this.handleMouseUp, false)
  }

  componentWillUnmount() {
    document.addEventListener('mousemove', this.handleMouseMove, false)
    document.addEventListener('mouseup', this.handleMouseUp, false)
  }

  loadAudio(src) {
    this.audio = new Howl({
      src: ['https:' + src],
      audioPlayerOpen: false,
      html5: true,
      onload: () => {
        this.setState({ duration: formatTime(this.audio.duration()) })
        this.play();
      },
    })
  }
  play() {
    this.audio.play()
    window.requestAnimationFrame(this.step)
    this.setState((state, props) => ({
      playing: true,
      duration: formatTime(this.audio.duration()),
    }))
  }

  pause() {
    this.setState({ playing: false })
    this.audio.pause()
  }

  forward() {
    const seek = this.audio.seek() || 0
    const value =
      seek + 30 < this.audio.duration() ? seek + 30 : this.audio.duration()

    this.seek(value)
  }

  backward() {
    const seek = this.audio.seek() || 0
    const value = seek - 30 > 0 ? seek - 30 : 0

    this.seek(value)
  }

  seek(value) {
    this.audio.seek(value)
    window.requestAnimationFrame(this.step)
  }

  step() {
    const seek = this.audio.seek() || 0

    if (!isNaN(seek)) {
      const time = formatTime(seek)
      const progress = (seek / this.audio.duration()) * 100

      this.setState({
        time,
        progress,
      })
    }

    if (!this.state.seekBarMouseDown && this.state.playing) {
      window.requestAnimationFrame(this.step)
    }
  }

  getSeekValueFromMouseEvent(screenX) {
    const boundingClientRect = this.state.progressRect.getBoundingClientRect()
    const currentPos = screenX - boundingClientRect.x
    const maxPos = boundingClientRect.right - boundingClientRect.x;
    if (currentPos > 0 && currentPos < maxPos) {
      const percentage = currentPos / maxPos
      return this.audio.duration() * percentage
    } else if (currentPos < 0) {
      return 0;
    } else {
      return this.audio.duration();
    }
  }

  seekOnMouseDown(event) {
    event.persist()
    this.setState(
      {
        seekBarMouseDown: true,
        progressRect: event.currentTarget,
      });
  }

  handleMouseMove(event) {
    if (this.state.seekBarMouseDown) {
      const seek = this.getSeekValueFromMouseEvent(event.clientX);
      window.requestAnimationFrame(() => {
        const time = formatTime(seek)
        const progress = (seek / this.audio.duration()) * 100

        this.setState({
          time,
          progress,
        })
      });
    }
  }

  handleMouseUp(event) {
    if (this.state.seekBarMouseDown) {
      this.seek(this.getSeekValueFromMouseEvent(event.clientX));
      this.setState({ seekBarMouseDown: false })
    }

  }

  openAudioPlayer() {
    this.setState({ audioPlayerOpen: true })
  }

  render() {
    return (
      <Container className="svartviken-audio-player">
        <Title>{this.props.episode.title}</Title>
        <ControllButton
          style={{ gridArea: 'backward' }}
          icon={
            this.props.color === 'white' ? replay30IconWhite : replay30IconBlack
          }
          action={this.backward}
        />
        <PlayPauseButton
          style={{ gridArea: 'play' }}
          playing={this.state.playing}
          playAction={this.play}
          pauseAction={this.pause}
          color={this.props.color}
        />
        <ControllButton
          style={{ gridArea: 'forward' }}
          icon={
            this.props.color === 'white'
              ? forward30IconWhite
              : forward30IconBlack
          }
          action={this.forward}
        />
        <SeekBar style={{ gridArea: 'seekBar' }}>
          <Time
            className={this.props.color ? 'white' : 'black'}
            style={{ gridArea: 'start' }}
          >
            {this.state.time}{' '}
          </Time>

          <ProgressWrapper
            id="progress-bar"
            className={this.props.color ? 'white' : 'black'}
            style={{ gridArea: 'seek' }}
            onMouseMoveCapture={this.handleMouseMove}
            onMouseDownCapture={this.seekOnMouseDown}
            onMouseUp={this.handleMouseUp}
          >
            <Progress progress={this.state.progress}>&nbsp;</Progress>

            <ProgressPointer progress={this.state.progress}>
              &nbsp;
            </ProgressPointer>
          </ProgressWrapper>
          <Time
            className={this.props.color ? 'white' : 'black'}
            style={{ gridArea: 'end', textAlign: 'right', marginRight: '10px' }}
          >
            {this.state.duration}
          </Time>
        </SeekBar>
      </Container >
    )
  }
}

export default AudioPlayer
