import React, { Component } from 'react'

import { StoreContext } from '../utils/store'
import YandexMap from './YandexMap'


class RandomEvents extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current5: []
    }
  }

  componentDidMount = () => this.getRandom()

  getRandom = async () => {
    const data = await this.context.store.get()
    const numberOfCases = 5,
          simpleNumber = 17,
          start = Math.round(Math.random() * (data.length - 1))
    let array = []

    for (let i = 0; i < numberOfCases; i++)
      array.push(data[(start + (i * simpleNumber)) % data.length])
    
    this.setState({current5: array})
  }

  render = () => (
    <div className="random-events" id="random-events">
      <div className="random-events__map-container">
        <YandexMap
          points={this.state.current5}
        />
      </div>
      <div className="random-events__button-row">
        <button
          className="random-events__button-row__item"
          onClick={() => this.getRandom()}
        >
          Случайные случаи
        </button>
      </div>
    </div>
  )
}

RandomEvents.contextType = StoreContext

export default RandomEvents
