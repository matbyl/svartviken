import React from 'react'
import ContextConsumer from '../components/Context'

class AudioPlayerButton extends React.Component {
  render() {
    return (
      <ContextConsumer>
        {({ data, set }) => (
          <div
            onClick={() => {
              set({
                episode: this.props.episode,
              })
            }}
          >
            {data.episode !== this.props.episode
              ? `Play Audio`
              : `Playing Audio`}
          </div>
        )}
      </ContextConsumer>
    )
  }
}

export default AudioPlayerButton
