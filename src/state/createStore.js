import { createStore as reduxCreateStore } from 'redux'

const reducer = (state, action) => {
  const setState_ = setState(state)
  switch (action.type) {
    case ACTIONS.SET_EPISODE:
      return setState_({ playingAudio: true, selectedEpisode: action.payload })
    default:
      return state
  }
}

const setState = currentState => newState =>
  Object.assign({}, currentState, newState)

const initialState = { playingAudio: false, selectedEpisode: null }

const createStore = () => reduxCreateStore(reducer, initialState)
export default createStore

export const ACTIONS = {
  SET_EPISODE: 'SET_EPISODE',
}
