import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'ZERO':
      return 0
    default: // if none of the above matches, code comes here
      return state
  }
}

const store = createStore(counterReducer)
store.subscribe(() => console.log(store.getState()))
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'INCREMENT'})
store.dispatch({type: 'ZERO'})
store.dispatch({type: 'DECREMENT'})

const App = () => (
  <p>{store.getState()}</p>
)

export default App;
