import React, { Component } from 'react'

import EasterEgg from './EasterEgg'

const defaultIcon = "https://kiss-graph.com/libs/starukha/icon.png"
const ZoomByDelta = [
  {
    deltaLessThan: .5,
    zoom: 11,
  },
  {
    deltaLessThan: 0.035,
    zoom: 12,
  },
  {
    deltaLessThan: 0.025,
    zoom: 13,
  },
  {
    deltaLessThan: 0.004,
    zoom: 14,
  },
  {
    deltaLessThan: 0.0005,
    zoom: 15,
  },
  {
    deltaLessThan: 0.00025,
    zoom: 16,
  },
]

const sizeConverter = (size, W = 902, H = 1200) =>
  ({
    iconImageSize: [Math.round(W / 10 * size), Math.round(H / 10 * size)],
    iconImageOffset: [-Math.round(W / 20 * size), -Math.round(H * .95 / 10 * size)]
  })



export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      replacePoints: this.replacePoints,
    }

    this.mapRef = new React.createRef()
    this.easterEggRef = new React.createRef()
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.ready)
      return state

    state.replacePoints(props)
    return state
  }

  setCurrent = (point, placemark) => {
    // console.log(this.map.geoObjects)
    // this.map.geoObjects.each(point => point.properties.set('iconImageSize', [62, 62]))
    // this.map.geoObjects.each(point => console.log(point))
    // placemark.properties.set('iconImageSize', [42, 42])
    this.props.setCurrent(point)
  }

  replacePoints = async props => {
    this.map.geoObjects.removeAll()

    let minX = -1, maxX = -1, minY = -1, maxY = -1

    for (let index in props.points) {
      const point = props.points[index]

      const result = await window.ymaps.geocode("Россия, Санкт-Петербург, " + point.address)
      const pos = result.geoObjects.get(0).geometry._coordinates

      if (minX === -1 || minX > pos[0])
        minX = pos[0]
      if (maxX === -1 || maxX < pos[0])
        maxX = pos[0]
      if (minY === -1 || minY > pos[1])
        minY = pos[1]
      if (maxY === -1 || maxY < pos[1])
        maxY = pos[1]

      const pointPlacemark = new window.ymaps.Placemark(
        pos,
        {
          balloonContent: `
            <h3>${point.heading}</h3>
          `,
          // iconCaption: point.heading,
          // iconLayout: 'default#image',
          // iconImageHref: point.icon || defaultIcon,
          // iconImageSize: [42, 42],
          // iconImageOffset: [-21, -21]
        },{
          iconLayout: 'default#image',
          iconImageHref: point.icon || defaultIcon,
          ...sizeConverter(.5)
      })
      // pointPlacemark.events.add('click', () => this.setCurrent(point, pointPlacemark))
      // pointPlacemark.events.add('balloonclose', () => this.setCurrent())

      this.map.geoObjects.add(pointPlacemark)
    }


    if (minX !== -1 || maxX !== -1 || minY !== -1 || maxY !== -1) {
      this.map.setCenter([(minX + maxX) / 2, (minY + maxY) / 2])
      const deltaX = maxX - minX
      const deltaY = maxY - minY
      const aspect = this.mapRef.current.clientWidth / this.mapRef.current.clientHeight
      const maxDelta = deltaX / deltaY > aspect ? deltaY : deltaX
      // console.log(maxDelta)
      
      let index = 0
      while (ZoomByDelta[index].deltaLessThan > maxDelta)
        index++
      // console.log(index)
      this.map.setZoom(ZoomByDelta[index - 1].zoom)
    }
  }


  componentDidMount = () => {
    window.ymaps.ready(() => {
      this.map = new window.ymaps.Map("map", {
        center: [59.946897, 30.332514],
        zoom: 11
      })
      this.map.behaviors.disable('drag')
      this.map.behaviors.disable('scrollZoom')

      this.setState({ready: true})

      this.searchControl = this.map.controls.get('searchControl')
      this.searchControl.events.add('submit', () => {
        if (this.searchControl.getRequestString().toLowerCase() === "r4ve")
          this.easterEggRef.current && this.easterEggRef.current.start()

        if (this.searchControl.getRequestString() === "ДП")
          this.easterEggRef.current && this.easterEggRef.current.start("ДП")
      }, this)
    })
  }

  render = () =>
    <>
      <div
        id="map"
        ref={this.mapRef}
      />
      <EasterEgg ref={this.easterEggRef} />
    </>
}
