import React from 'react'
import { Howl } from 'howler'
import tw, { styled } from 'twin.macro'

import PropTypes from 'prop-types'
import playIconWhite from './../assets/icons/white-play.svg'
import pauseIconWhite from './../assets/icons/white-pause.svg'
import replay30IconWhite from './../assets/icons/white-backward.svg'
import forward30IconWhite from './../assets/icons/white-forward.svg'
import CloseIcon from './../assets/icons/white-close.svg'

const Container = styled.div`
  grid-template-columns: 250px 35px 35px 35px 10px 1fr;
  grid-template-areas: 'title backward play forward . seekBar';

  background: rgba(0, 0, 0, 1);
  ${tw`h-full w-full hidden md:grid md:h-16`}
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
  transition: transform .25s cubic-bezier(.5,0,.1,1);
  -webkit-transition: transform .25s cubic-bezier(.5,0,.1,1);
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
  -webkit-transition: opacity 0.2s, transform .25s cubic-bezier(.5,0,.1,1); /* Safari */
  transition: opacity 0.2s, transform .25s cubic-bezier(.5,0,.1,1);
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

const PlayPauseButton = ({ playing, playAction, pauseAction }) =>
  playing ? (
    <ControllButton
      ariaLabel="media-player-pause-button"
      icon={pauseIconWhite}
      action={pauseAction}
      size="45"
    />
  ) : (
    <ControllButton
      ariaLabel="media-player-play-button"
      icon={playIconWhite}
      action={playAction}
      size="45"
    />
  )

const minutes = time => Math.floor(time / 60)
const seconds = (time, minutes) => Math.floor(time - minutes * 60)

const formatTime = time => {
  const m = minutes(time)
  const s = seconds(time, m)

  const padLeft = (string, pad, length) =>
    (new Array(length + 1).join(pad) + string).slice(-length)

  return padLeft(m, '0', 2) + ':' + padLeft(s, '0', 2)
}

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props)

    this.loadAudio(props.url)

    this.state = {
      playing: true,
      time: '00:00',
      progress: 0,
      duration: formatTime(this.audio.duration()),
      seeking: false,
      seekBarMouseDown: false,
      audioPlayerOpen: true,
    }

    this.toggleAudioPlayer = this.toggleAudioPlayer.bind(this)
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
    if (this.props.url !== nextProps.url) {
      this.pause()
      this.loadAudio(nextProps.url)
    }
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove, false)
    document.addEventListener('mouseup', this.handleMouseUp, false)
  }

  componentWillUnmount() {
    document.addEventListener('mousemove', this.handleMouseMove, false)
    document.addEventListener('mouseup', this.handleMouseUp, false)
  }

  loadAudio(url) {
    this.audio = new Howl({
      src: [url],
      audioPlayerOpen: false,
      html5: true,
      onload: () => {
        this.setState({ duration: formatTime(this.audio.duration()) })
        this.play()
      },
    })
  }

  play() {
    this.audio.play()
    window.requestAnimationFrame(this.step)
    this.setState({
      playing: true,
      duration: formatTime(this.audio.duration()),
    })
  }

  pause() {
    this.setState({ playing: false })
    this.audio.pause()
  }

  forward(sec) {
    const seek = this.audio.seek() || 0
    const value =
      seek + sec < this.audio.duration() ? seek + sec : this.audio.duration()

    this.seek(value)
  }

  backward(sec) {
    const seek = this.audio.seek() || 0
    const value = seek - sec > 0 ? seek - sec : 0

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
    const maxPos = boundingClientRect.right - boundingClientRect.x
    if (currentPos > 0 && currentPos < maxPos) {
      const percentage = currentPos / maxPos
      return this.audio.duration() * percentage
    } else if (currentPos < 0) {
      return 0
    } else {
      return this.audio.duration()
    }
  }

  seekOnMouseDown(event) {
    event.persist()
    this.setState({
      seekBarMouseDown: true,
      progressRect: event.currentTarget,
    })
  }

  handleMouseMove(event) {
    if (this.state.seekBarMouseDown) {
      const seek = this.getSeekValueFromMouseEvent(event.clientX)
      window.requestAnimationFrame(() => {
        const time = formatTime(seek)
        const progress = (seek / this.audio.duration()) * 100

        this.setState({
          time,
          progress,
        })
      })
    }
  }

  handleMouseUp(event) {
    if (this.state.seekBarMouseDown) {
      this.seek(this.getSeekValueFromMouseEvent(event.clientX))
      this.setState({ seekBarMouseDown: false })
    }
  }

  toggleAudioPlayer() {
    this.setState({
      audioPlayerOpen: !this.state.audioPlayerOpen,
      playing: !this.state.audioPlayerOpen,
    })
  }

  render() {
    return this.state.audioPlayerOpen ? (
      <div className="fixed bottom-0 h-full md:h-16 bg-black w-full z-50">
        <div className="flex flex-col h-full w-3/4 m-auto  md:hidden justify-center">
          <img
            src={CloseIcon}
            className="align-self-end cursor-pointer m-4 w-8 h-8"
            onClick={() => {
              this.pause()
              this.props.close()
            }}
          />
          <div className="flex justify-center space-x-4">
            <ControllButton
              className="flex-initial"
              ariaLabel="media-player-backward-button"
              style={{ gridArea: 'backward' }}
              icon={replay30IconWhite}
              action={() => this.backward(30)}
            />
            <PlayPauseButton
              className="flex-initial w-32 mx-16"
              playing={this.state.playing}
              playAction={this.play}
              pauseAction={this.pause}
            />
            <ControllButton
              className="flex-initial"
              ariaLabel="media-player-forward-button"
              style={{ gridArea: 'forward' }}
              icon={forward30IconWhite}
              action={() => this.forward(30)}
            />
          </div>
          <div className="flex">
            <SeekBar style={{ gridArea: 'seekBar' }}>
              <Time
                className="white"
                style={{ gridArea: 'start' }}
              >
                {this.state.time}{' '}
              </Time>

              <ProgressWrapper
                id="progress-bar"
                className="white"
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
                className="white"
                style={{
                  gridArea: 'end',
                  textAlign: 'right',
                  marginRight: '10px',
                }}
              >
                {this.state.duration}
              </Time>
            </SeekBar>
          </div>
        </div>
        <Container className="invisible md:visible">
          <Title>{this.props.title}</Title>
          <ControllButton
            style={{ gridArea: 'backward' }}
            icon={replay30IconWhite}
            action={() => this.backward(30)}
          />
          <PlayPauseButton
            style={{ gridArea: 'play' }}
            className="w-32"
            playing={this.state.playing}
            playAction={this.play}
            pauseAction={this.pause}
          />
          <ControllButton
            style={{ gridArea: 'forward' }}
            icon={forward30IconWhite}
            action={() => this.forward(30)}
          />
          <SeekBar style={{ gridArea: 'seekBar' }}>
            <Time
              className="white"
              style={{ gridArea: 'start' }}
            >
              {this.state.time}{' '}
            </Time>

            <ProgressWrapper
              id="progress-bar"
              className="white"
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
              className="white"
              style={{
                gridArea: 'end',
                textAlign: 'right',
                marginRight: '10px',
              }}
            >
              {this.state.duration}
            </Time>
          </SeekBar>
        </Container>
      </div>
    ) : null
  }
}

AudioPlayer.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default AudioPlayer
