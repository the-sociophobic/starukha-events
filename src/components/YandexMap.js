import React, { Component } from 'react'


const defaultIcon = "https://psv4.userapi.com/c856220/u11879299/docs/d9/50be7df98b9d/harms.png?extra=8TNBeNMoQmoeMqzNmwwfguXe6A6fDaoFTfyICeRtQDbvTqYJaQ7vx8piGUrmCXYhqDBfYP0oqjwAqXqM0moxTX4hAEfBKEomDu2i839FK_gWnOcTRBXX8r5HxUJyOUwv6R5zOJhapCwyNMYG8JsiKQ"
const ZoomByDelta = [
  {
    deltaLessThan: .5,
    zoom: 11,
  },
  {
    deltaLessThan: 0.04,
    zoom: 12,
  },
  {
    deltaLessThan: 0.025,
    zoom: 13,
  },
  {
    deltaLessThan: 0.005,
    zoom: 14,
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

      this.map.geoObjects
        .add(new window.ymaps.Placemark(
            pos,
            {
              balloonContent: `
                <div class="yandex-baloon">
                  <h2 style="margin-bottom: 10px">${point.heading}</h2>
                  <small><i>${point.addressNice || point.address}</i></small><br><br>
                  ${point.body}<br><br>
                  ${point.img !== "" ? `<img style='width: 70%' src=${point.img}></img>` : ""}
                </div>
                `,
              iconCaption: point.heading,
            },{
              iconLayout: 'default#image',
              iconImageHref: point.icon || defaultIcon,
              iconImageSize: [64, 64],
              iconImageOffset: [-30, -30]
        }))
    }

    if (minX !== -1 || maxX !== -1 || minY !== -1 || maxY !== -1) {
      this.map.setCenter([(minX + maxX) / 2, (minY + maxY) / 2])
      const deltaX = maxX - minX
      const deltaY = maxY - minY
      const aspect = this.mapRef.current.clientWidth / this.mapRef.current.clientHeight
      const maxDelta = deltaX / deltaY > aspect ? deltaY : deltaX
      
      let index = 0
      while (ZoomByDelta[index].deltaLessThan > maxDelta)
        index++
      this.map.setZoom(ZoomByDelta[index - 1].zoom)
    }
  }


  componentDidMount = () => {
    window.ymaps.ready(() => {
      this.map = new ymaps.Map("map", {
        center: [59.946897, 30.332514],
        zoom: 11
      })
      this.setState({ready: true})
    })
  }

  render = () =>
    <div
      id="map"
      ref={this.mapRef}
    />
}
