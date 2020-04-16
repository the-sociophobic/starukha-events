import React, { Component } from 'react'

import { initialState, StoreContext } from './utils/store'
import RandomEvents from './components/RandomEvents'
// import Home from 'components/pages/Home'

// import 'styles/index.sass'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = initialState({
      state: this.state,
      setState: this.setState,
    })
  }

  render = () => (
    <StoreContext.Provider value={this.state}>
      <div className="App">
        <RandomEvents />
      </div>
    </StoreContext.Provider>
  )
}

export default App
