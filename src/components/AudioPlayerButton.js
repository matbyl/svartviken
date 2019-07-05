import React from 'react'
import ContextConsumer from '../components/Context'
import styled from 'styled-components'
import WhiteIcon from './../assets/White_Play_Icon.svg'
import BlackIcon from './../assets/Black_Play_Icon.svg'

const EnabledMediaButton = styled.button`
     text-decoration: none;
  outline: none;
  border: none;
  opacity: 0.72;
  padding: 0;
  margin: 15px auto;

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
`

class AudioPlayerButton extends React.Component {
  render() {
    return (
      <ContextConsumer>
        {({ data, set }) => {
          return data.episode === this.props.episode ? (
            <DisabledMediaButton>
              <img src={this.props.light ? WhiteIcon : BlackIcon} />
            </DisabledMediaButton>
          ) : (
            <EnabledMediaButton
              onClick={() => {
                set({
                  episode: this.props.episode,
                })
              }}
            >
              <img src={this.props.light ? WhiteIcon : BlackIcon} />
            </EnabledMediaButton>
          )
        }}
      </ContextConsumer>
    )
  }
}

export default AudioPlayerButton
