import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const resetReview = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div style={{textAlign: 'center', fontFamily: 'monospace', fontWeight: 'bold', fontStyle: 'oblique', border: 'solid 3px darkolivegreen', paddingTop: '20px'}}>
      <button onClick={good} style={{backgroundColor: 'green', marginRight: '5px', fontSize: '20px', border: 'solid 2px black', borderRadius: '30%'}}>good</button> 
      <button onClick={ok} style={{backgroundColor: 'darkorange', marginRight: '5px', fontSize: '20px', border: 'solid 2px black', borderRadius: '30%'}}>ok</button> 
      <button onClick={bad} style={{backgroundColor: 'red', marginRight: '5px', fontSize: '20px', border: 'solid 2px black', borderRadius: '30%'}}>bad</button>
      <button onClick={resetReview} style={{backgroundColor: 'whitesmoke', fontSize: '20px', border: 'solid 2px black', borderRadius: '30%'}}>reset stats</button>
      <h3 style={{color: 'green'}}>good: {store.getState().good}</h3>
      <h3 style={{color: 'darkorange'}}>ok: {store.getState().ok}</h3>
      <h3 style={{color: 'red'}}>bad: {store.getState().bad}</h3>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
