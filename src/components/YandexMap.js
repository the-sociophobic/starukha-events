import React, { Component } from 'react'


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


export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ready: false,
      replacePoints: this.replacePoints,
    }

    this.mapRef = new React.createRef()
  }

  static getDerivedStateFromProps(props, state) {
    if (!state.ready)
      return

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
          // balloonContent: `
          //   <div class="yandex-baloon">
          //     <h2 style="margin-bottom: 10px">${point.heading}</h2>
          //     <small><i>${point.addressNice || point.address}</i></small><br><br>
          //     ${point.body}<br><br>
          //     ${point.img !== "" ? `<img style='width: 70%' src=${point.img}></img>` : ""}
          //   </div>
          //   `,
          // iconCaption: point.heading,
          // iconLayout: 'default#image',
          // iconImageHref: point.icon || defaultIcon,
          // iconImageSize: [42, 42],
          // iconImageOffset: [-21, -21]
        },{
          iconLayout: 'default#image',
          iconImageHref: point.icon || defaultIcon,
          iconImageSize: [32, 32],
          iconImageOffset: [-16, -16],
          hasBalloon: false,
      })
      pointPlacemark.events.add('click', () => this.setCurrent(point, pointPlacemark))
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
      this.map = new ymaps.Map("map", {
        center: [59.946897, 30.332514],
        zoom: 11
      })
      this.map.behaviors.disable('drag')

      this.setState({ready: true})
    })
  }

  render = () =>
    <div
      id="map"
      ref={this.mapRef}
    />
}
