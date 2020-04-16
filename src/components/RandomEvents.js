import React, { Component } from 'react'
import ReactDOMServer from 'react-dom/server'

import { StoreContext } from '../utils/store'
import YandexMap from './YandexMap'


const eventDesc = [
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fafb73731-f543-4026-8b52-82f294e73329%2F__2020-04-11__17.50.59.png?table=block&id=98f48a11-026b-465e-b73a-056954d75b67&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F5b2f0d7f-f704-45e9-b954-243a484b70e7%2F__2020-04-11__13.55.49.png?table=block&id=600981f6-e9d8-4612-8fa9-22712b93b025&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa787eebd-638e-4fcb-9e7c-c9c6428ef7e4%2F__2020-04-11__13.57.18.png?table=block&id=0d105c99-bd31-4c18-ad38-98037abf1ecd&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F6a963bb6-c82f-4550-bc7a-3a959b25f448%2F__2020-04-11__14.00.00.png?table=block&id=f66299d6-3f56-48db-9b33-a83d14e9ba24&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Ff95f5e43-c418-449b-8d37-c262788012b3%2F__2020-04-11__13.59.20.png?table=block&id=45182c43-1d44-4658-8f43-9c0a5f3331d0&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F782edd44-1910-4b0e-9343-575483b0c400%2F__2020-04-11__17.37.17.png?table=block&id=756f21f2-b964-4ea2-9239-10e861d03043&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F9db0a55f-9f46-4e65-a554-f66cfe0e19db%2F__2020-04-11__17.38.28.png?table=block&id=72b5d5dc-d6ea-48a1-bc94-8922343d331d&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F51535aeb-705f-4923-a323-efa24872ed60%2F__2020-04-11__17.44.18.png?table=block&id=30a20de5-f247-4c8d-84db-1064f058edb9&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2c876590-8689-46a7-9514-2d97dadd7fe6%2F__2020-04-11__17.45.32.png?table=block&id=8a3ed930-41c3-4609-a135-58c0884751c9&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa5dfd81a-f5ee-41ce-a73f-0012922c4066%2F__2020-04-11__14.02.29.png?table=block&id=1c30c854-34e6-465b-862a-2ab2c2714cd4&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F352a9398-1bee-4e75-9e72-39a02dd46aa1%2F__2020-04-11__17.48.14.png?table=block&id=7ae9c886-002e-4354-ad6f-66d4df14db7a&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F77aadbae-245e-4b74-8cda-6b39acfd28ea%2F__2020-04-11__17.46.35.png?table=block&id=b2a1f15f-73b0-4ae9-ae8d-2f14c834e094&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8cc031ef-4f40-4368-b504-ff29313ce723%2F__2020-04-11__17.55.14.png?table=block&id=9fa977e1-be92-4d36-8599-e0a2bcf2ffd6&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F936d3910-ee5e-47e0-a216-7c7ee1e0bacf%2F__2020-04-11__17.51.09.png?table=block&id=032f089b-e302-42ed-80ce-7d06d8cf6b7e&width=2880&cache=v2",
  "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F800001fb-2079-4eba-b7e6-3e669e609a96%2F__2020-04-11__14.02.46.png?table=block&id=12294b77-d92b-408f-9928-369b667e16cd&width=2880&cache=v2",
]

class RandomEvents extends Component {
  constructor(props) {
    super(props)

    this.state = {
      current5: []
    }
  }

  componentDidMount() {
    this.getRandom()
    window.addEventListener("click", e => {
      if (e.target.id === "desc" || e.target.id === "desc__button")
        this.hideDesc()
    })
  }

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

  showDesc = () => document.body.insertAdjacentHTML( 'beforeend', ReactDOMServer.renderToString(this.renderDesc()))
  hideDesc = () => {
    const elem = document.getElementById("desc")
    document.body.removeChild(elem)
  }

  renderDesc = () => (
    <div
      id="desc"
      className="desc"
    >
      <div className="desc__text-area">
        <div
          className="desc__text-area__button"
          id="desc__button"
        />
        <div className="desc__text-area__text-container">
          {/* <h1>Что такое события?</h1> */}
          {/* Это проишествия и случаи, заметки и дневники, это приключения и скука, этот досуг и роскошь, жизнь и существование случайных наблюдаетелей, внезапно ощутивших себя здесь и сейчас. Вот прямо тут. Раз и произошло! */}
          <h1>Семантика слова «Случаи»</h1>
          <img src={eventDesc[Math.round(Math.random() * (eventDesc.length - 1))]} />
        </div>
      </div>
    </div>
  )

  render = () => (
    <div className="random-events" id="random-events">
      <div className="random-events__map-container">
        <YandexMap
          points={this.state.current5}
        />
      </div>
      {/* {this.state.current5.map(item =>
        <div
          key={item.id}
          className="random-events__item"
        >
          <h2>{item.heading}</h2>
          <p>{item.body}</p>
          <img
            src={item.img}
            className="random-events__item__img"
          />
        </div>
      )} */}
      <div className="random-events__button-row">
        <button
          className="random-events__button-row__item"
          onClick={() => this.showDesc()}
        >
          Что такое случаи?
        </button>
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
