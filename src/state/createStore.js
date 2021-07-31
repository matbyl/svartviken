import { createStore as reduxCreateStore } from 'redux'

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.PLAY:
      return Object.assign({}, state, { playingAudio: true })
    case ACTIONS.PAUSE:
      return Object.assign({}, state, { playingAudio: false })
    default:
      return state
  }
}

const initialState = { playingAudio: false }

const createStore = () =>
  reduxCreateStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
export default createStore

export const ACTIONS = {
  PLAY: 'PLAY',
  PAUSE: 'PAUSE',
}
