// import data from './data'

import axios from 'axios'


const sliceBetweenWords = (string, wordBeforeArray, wordAfterArray) => {
  let start = 0, end = -1
  
  wordBeforeArray.forEach(word => {
    const index = string.toLowerCase().indexOf(word.toLowerCase())
    if (index !== -1)
      start = index + word.length
  })
  wordAfterArray && wordAfterArray.forEach(word => {
    const index = string.toLowerCase().indexOf(word.toLowerCase())
    if (index !== -1)
      end = index
  })

  if (start === 0)
    return ""
  if (end === -1)
    return string.slice(start)
  return string.slice(start, end)
}

export default class store {
  constructor(props) {
    this.props = props
    this.data = new Promise(async (res, rej) => {
      const data = (await axios.get("https://trello.com/b/GuF3Iqf9.json")).data
      let idBoard = data.lists.filter(list => list.name === "Database")
      
      if (idBoard.length < 1)
        rej("no Database board")

      const mappedPoints = data.cards
        .filter(card => card.idBoard === idBoard[0].idBoard)
        .map(card => {
          const address = sliceBetweenWords(card.desc, ["<адрес>"], ["</адрес>"])
          const addressNice = sliceBetweenWords(card.desc, ["<красивый адрес>"], ["</красивый адрес>"])
          const body = sliceBetweenWords(card.desc, ["<случай>"], ["</случай>"])
          const img = sliceBetweenWords(card.desc, ["<image>"], ["</image>"])
          const damadged = address === "" || body === ""

          return {
            heading: card.name,
            address: address,
            addressNice: addressNice,
            body: body,
            img: img,
            damadged: damadged,
        }})
        .filter(point => !point.damadged)
      
      res(mappedPoints)
    })
  }

  get = () => this.data
}