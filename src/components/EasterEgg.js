import React, { Component } from 'react'
import ReactDOM from 'react-dom'


const names = [
  "ཧ་ཅང་ལོག་པཉི་ལྟ་བ་པོ་⠀→⠀1937 год",
  "ཧ་ཅང་ལོག་པཉི་ལྟ་བ་པོ་⠀→⠀Неву",
  "∀⠀ཧ་ཅང་ལོག་པཉི་ལྟ་བ་པོ་ཚོ་⠀→⠀令和",
  "∀⠀ཧ་ཅང་ལོག་པཉི་ལྟ་བ་པོ་ཚོ་⠀→⠀R⠀4⠀re⠀V⠀E⠀r",
  "∀⠀ཧ་ཅང་ལོག་པཉི་ལྟ་བ་པོ་ཚོ་⠀→⠀R⠀4⠀V⠀E",
  "∀⠀ཧ་ཅང་ལོག་པཉི་ལྟ་བ་པོ་ཚོ་⠀→⠀new Ковер в 3D",
  "∀⠀ཧ་ཅང་ལོག་པཉི་ལྟ་བ⠀→⠀new Ковер в 3D",
  "∀ नाइलीस्ट → new Ковер в 3D",
  "все Нигилисты попадают в 2019",
  "each⠀(Нигилисты⠀=>⠀{  R⠀4⠀V⠀E;  });",
  "each⠀(Нигилисты⠀=>⠀{  1⠀Е⠀G⠀0;  });",
  "each⠀(Нигилисты⠀=>⠀{  М⠀Е⠀Т⠀4⠀М⠀О⠀Д⠀Е⠀Р⠀Н;  });",
  "each (Нигилисты => { М Е Т 4 М О Д Е Р Н; });",
  "each (Нигилисты => { 20!8; });",
  "each Аметисты goto Содом;",
  "all Атеисты go to Содом",
  "all Атеисты go to SmartTV",
  "all Атеисты go to 20!8",
  "all Атеисты go to РАВНОПРАВИЕ",
  "all Атеисты go to РАЙ (гличи)",
  "all Атеисты go to Матильда (2017)",
  "wǝdɐƍʎʞ oʇ oƃ ıqɯɔиǝɯɐ llɐ",
  "oʇ oƃ ıqɯɔиǝɯɐ llɐ Подвешенное состояние",
  "Все Атеисты попадают в FE4R",
  "Все Атеисты попадают в VENU",
  "Все Атеисты попадают в R4VE",
  "Все Атеисты попадают в РАЙ",
]

const imgs = [
  "https://sun9-11.userapi.com/c858024/v858024693/e5555/9P6IqwFmXec.jpg", //Wall Logo
  "https://sun9-21.userapi.com/c851432/v851432308/a75d/ppf63WwN4eY.jpg", //3d Logo
  "https://sun9-29.userapi.com/c639322/v639322344/4e3e3/bK3C8o8SYk4.jpg", //Pixel Logo
  "https://sun9-53.userapi.com/c854524/v854524420/2156c5/qJFFibkPBQY.jpg", // Graph 2 yrs
  "https://sun9-2.userapi.com/c855220/v855220379/1bb564/UHTzG2dLx3s.jpg", //OZERKI
  "https://sun9-41.userapi.com/c856028/v856028379/16270e/qoetixUkat4.jpg", //UU2
  "https://sun9-34.userapi.com/c857520/v857520572/140ad4/xXrrNuE1Mmo.jpg", //graph
  "https://sun9-39.userapi.com/c847123/v847123469/19ddbd/fEJSTgKCiA0.jpg", //fedlud
  "https://sun9-24.userapi.com/c847123/v847123469/19dd92/DVEniNTr89A.jpg", //bek
  "https://sun9-7.userapi.com/c847123/v847123469/19de14/bt5dMHxz0yA.jpg", //I
  "https://sun9-3.userapi.com/c844320/v844320469/1ad7b1/fTQZtUxvQ_I.jpg", //cover 3
  "https://sun9-48.userapi.com/c857136/v857136370/120dab/nXbxgoyQGmw.jpg", //liter
  "https://sun9-69.userapi.com/c856028/v856028379/162731/h_llrMMbpbg.jpg", //stop bulling
]

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

    const W = window.innerWidth, H = window.innerHeight

    this.eggs = Array.from(
      {length: 1000},
      (egg, index) => ({
        text: names[Math.round(Math.random() * (names.length - 1))],
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

  start = () => {
    console.log("Let it be R4VE")

    const intervalHanndler = setInterval(() => {
      if (this.state.currentShown >= this.eggs)
        clearInterval(intervalHanndler)
  
      this.setState({currentShown: this.state.currentShown + 1})
    }, 35)  
  }

  render = () =>
    <div
      // style={{display: "none"}}
    >
      {this.eggs.slice(0, this.state.currentShown)
        .map(egg => 
          ReactDOM.createPortal(<SingleEgg {...egg} />, document.body)
      )}
    </div>
}
