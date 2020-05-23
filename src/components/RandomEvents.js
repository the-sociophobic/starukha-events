import React, { Component } from 'react'

import { StoreContext } from '../utils/store'
import getRandomArrayElements from '../utils/getRandomArrayElements'
import YandexMap from './YandexMap'


const numberOfCases = 3


class RandomEvents extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentCases: []
    }
  }

  componentDidMount = () => {
    document.addEventListener("keydown", this.escPress.bind(this), false)
    this.getRandom()
  }

  componentWillUnmount = () => 
    document.removeEventListener("keydown", this.escPress.bind(this), false)

  escPress = e =>
    e.keyCode === 27 &&
      this.setState({currentPoint: undefined})

  getRandom = async () => {
    const data = await this.context.store.get()
    
    this.setState({
      currentCases: getRandomArrayElements(data, numberOfCases),
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
          {point &&
            <div
              className={"random-events__current-point " + 
                (this.state.justAppeared && "random-events__current-point--appeared")}
            >
              <div
                className="random-events__current-point__cross"
                onClick={() => this.setState({currentPoint: undefined})}
              />
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
      </div>
    )
  }
}

RandomEvents.contextType = StoreContext

export default RandomEvents
