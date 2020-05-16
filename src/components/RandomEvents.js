import React, { Component } from 'react'

import { StoreContext } from '../utils/store'
import YandexMap from './YandexMap'


const numberOfCases = 3


class RandomEvents extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentCases: []
    }
  }

  componentDidMount = () => this.getRandom()

  getRandom = async () => {
    const data = await this.context.store.get(),
          simpleNumber = 17,
          start = Math.round(Math.random() * (data.length - 1))
    let array = []

    for (let i = 0; i < numberOfCases; i++)
      array.push(data[(start + (i * simpleNumber)) % data.length])
    
    this.setState({
      currentCases: array,
      currentPoint: undefined
    })
  }

  render = () => {
    const point = this.state.currentPoint

    return (
      <div className="random-events" id="random-events">
        <div className="random-events__button-row">
          <button
            className="random-events__button-row__item"
            onClick={() => this.getRandom()}
          >
            случайные случаи
          </button>
        </div>
        <div className="random-events__map-container">
          <YandexMap
            points={this.state.currentCases}
            setCurrent={value => {
              this.setState({
                currentPoint: value,
                justAppeared: true,
              })
              setTimeout(() => this.setState({justAppeared: false}), 555)
            }}
          />
        </div>
        {point &&
          <div
            className={"random-events__current-point " + 
              (this.state.justAppeared && "random-events__current-point--appeared")}
          >
            <h2 className="random-events__current-point__h2">{point.heading}</h2>
            <div className="random-events__current-point__address">
              {point.addressNice || point.address}
            </div>
            <div className="random-events__current-point__body">
              {point.body}
            </div>
            {point.img !== "" &&
              <img
                src={point.img}
                className="random-events__current-point__img"
              />}
          </div>
        }
      </div>
    )
  }
}

RandomEvents.contextType = StoreContext

export default RandomEvents
