import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import names from './names'
import DP from './DP'


const SingleEgg = props =>
  <span style={props.style}>
    {props.text}
  </span>

export default class EasterEgg extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentShown: 0
    }
  }

  generateEggs = isR4VE => {
    const W = window.innerWidth, H = window.innerHeight
    const array = isR4VE ? names : DP

    this.eggs = Array.from(
      {length: 1000},
      (egg, index) => ({
        text: array[Math.round(Math.random() * (array.length - 1))],
        style: {
          color: "#" + Math.floor(Math.random() * 16777215).toString(16),
          fontSize: Math.round(7 + 200 * Math.random()) + "px",
          position: "fixed",
          left: Math.round(Math.random() * W - 100) + "px",
          top: Math.round(Math.random() * H - 35) + "px",
          zIndex: 1000 + index,
        }
      })
    )
  }

  start = props => {
    if (props === "ДП")
      this.generateEggs(false)
    else
      this.generateEggs(true)

    console.log("Let it be R4VE")

    this.intervalHandler = setInterval(() => {
      if (this.state.currentShown >= this.eggs)
        clearInterval(this.intervalHandler)
  
      this.setState({currentShown: this.state.currentShown + 1})
    }, 35)  
  }

  componentWillUnmount = () =>
    this.intervalHandler &&
      clearInterval(this.intervalHandler)

  render = () =>
    <div
      // style={{display: "none"}}
    >
      {this.eggs && this.eggs.slice(0, this.state.currentShown)
        .map(egg => 
          ReactDOM.createPortal(<SingleEgg {...egg} />, document.body)
      )}
    </div>
}
