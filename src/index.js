import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import WhatIsButton from './components/WhatIsButton'

import './styles/index.sass'

//to use async / await
const regeneratorRuntime = require("regenerator-runtime")


const injectedElems = [
  {
    id: "map-react",
    component: <App />
  },
  {
    id: "what-is-events",
    component: <WhatIsButton />
  },
]

const getNode = async (nodeId, triesNumber = 20) =>
  new Promise((res, rej) => {
    let tryCounter = 0
    let elementLoadedChecker = setInterval(() => {
      const elem = document.getElementById(nodeId)
    
      if (tryCounter >= triesNumber) {
        clearInterval(elementLoadedChecker)
        rej(`#${nodeId} wasn't found after ${triesNumber} tries`)
      }

      if (!elem) {
        tryCounter++
        // console.log(`no #${nodeId} element in the DOM`)
        return
      } else {
        clearInterval(elementLoadedChecker)
        console.log(`#${nodeId} element found`)
        res(elem)
      }
    }, 200)  
  })

const tryInjectReact = async (component, divId) => {
  const elem = await getNode(divId).catch(error => console.log(error))

  if (elem) {
    ReactDOM.render(component, elem)
    console.log(`React injected into #${divId}`)
  }
}

injectedElems.forEach(elem =>
  tryInjectReact(elem.component, elem.id))

//remove react-components by React, before readymag do it himself on orientationchange
window.addEventListener("orientationchange", async () => {
  const threeSceneElem = document.getElementById("map-react")

  threeSceneElem && ReactDOM.unmountComponentAtNode(threeSceneElem)
}, true)

//inject react-components after orientationchange
window.addEventListener("orientationchange", async () => {
  const flag = await getNode("random-events", 3).catch(error => console.log(error))

  if (!flag)
    injectedElems.forEach(elem =>
      tryInjectReact(elem.component, elem.id))
})