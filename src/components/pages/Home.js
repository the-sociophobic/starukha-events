import React, { Component } from 'react'

import RandomEvents from 'components/RandomEvents'


class Home extends Component {
  render = () => (
    <div className="container">
      <RandomEvents />
    </div>
  )
}

export default Home