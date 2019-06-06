
  import React from 'react'
  import ReactDOM from 'react-dom'
  import { Provider } from 'react-redux'
  import { createStore ,combineReducers} from 'redux'
  import reducer from './store/reduces'
  import App from './container'
  
  import '@styles/reset.css'

  const store = createStore(combineReducers({
    reducer
  }))

  document.addEventListener('DOMContentLoaded', function () {
    window.SGLib.FastClick(document.body)
  }, false)
  
  ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'))

  if (module.hot) {
    module.hot.accept()
  }