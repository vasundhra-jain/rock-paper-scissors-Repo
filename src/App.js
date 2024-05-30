/* eslint-disable jsx-a11y/control-has-associated-label */
import Popup from 'reactjs-popup'

import 'reactjs-popup/dist/index.css'
import {RiCloseLine} from 'react-icons/ri'

import {Component} from 'react'
import './App.css'

const choicesList = [
  {
    id: 'ROCK',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'SCISSORS',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'PAPER',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const Item = props => {
  const {detail, showResult} = props
  const {imageUrl, id} = detail

  const onclickShowResult = () => {
    showResult(id)
  }

  const dataId = `${id.toLowerCase()}Button`
  console.log(dataId)

  return (
    <li>
      <button
        type="button"
        className="item-button"
        onClick={onclickShowResult}
        data-testid={dataId}
      >
        <img src={imageUrl} alt={id} className="item-img" />
      </button>
    </li>
  )
}

class App extends Component {
  state = {result: false, myChoice: '', opponentChoice: '', score: 0, para: ''}

  showResult = id => {
    const index = Math.floor(Math.random() * 3)
    const oppCh = choicesList[index].imageUrl
    const myItem = choicesList.filter(each => {
      if (each.id === id) {
        return each
      }
      return null
    })
    const myCh = myItem[0].imageUrl
    const oppId = choicesList[index].id

    if (id === oppId) {
      this.setState({para: 'IT IS DRAW'})
    } else if (
      (id === 'PAPER' && oppId === 'ROCK') ||
      (id === 'SCISSORS' && oppId === 'PAPER') ||
      (id === 'ROCK' && oppId === 'SCISSORS')
    ) {
      this.setState(prevState => ({
        para: 'YOU WON',
        score: prevState.score + 1,
      }))
    } else {
      this.setState(prevState => ({
        para: 'YOU LOSE',
        score: prevState.score - 1,
      }))
    }

    this.setState({
      result: true,
      myChoice: myCh,
      opponentChoice: oppCh,
    })
  }

  reset = () => {
    this.setState({result: false})
  }

  render() {
    const {result, myChoice, opponentChoice, score, para} = this.state
    return (
      <div className="main-container">
        <div className="header">
          <div>
            <h1 className="item">ROCK PAPER SCISSORS</h1>
          </div>
          <div className="score-container">
            <p className="score-para">Score</p>
            <p className="score">{score}</p>
          </div>
        </div>
        {result ? (
          <div className="result-container">
            <div className="result-item-container">
              <div className="result-container">
                <p className="result-content">YOU</p>
                <img src={myChoice} alt="your choice" className="item-img" />
              </div>
              <div className="result-container">
                <p className="result-content">OPPONENT</p>
                <img
                  src={opponentChoice}
                  alt="opponent choice"
                  className="item-img"
                />
              </div>
            </div>
            <p className="result-content-para">{para}</p>
            <button
              type="button"
              onClick={this.reset}
              className="play-again-btn"
            >
              PLAY AGAIN
            </button>
          </div>
        ) : (
          <ul className="item-button-container">
            {choicesList.map(each => (
              <Item detail={each} key={each.id} showResult={this.showResult} />
            ))}
          </ul>
        )}

        <Popup
          modal
          trigger={
            <button type="button" className="rules">
              RULES
            </button>
          }
        >
          {close => (
            <>
              <button
                type="button"
                className="trigger-button"
                onClick={() => close()}
              >
                <RiCloseLine />
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rules-image.png"
                alt="rules"
                className="rules-img"
              />
            </>
          )}
        </Popup>
      </div>
    )
  }
}

export default App
