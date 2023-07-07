import {Component} from 'react'
import ReactPlayer from 'react-player'

import {TableCell} from './components/styledComponents'

import './App.css'

const statusFirms = {
  initial: 'INITIAL',
  tableView: 'TABLE',
  winnerView: 'WINNER',
  noWinnerView: 'TIE',
}

const playersList = [
  {
    id: 1,
    playerName: 'Narendra Modi',
    imageUrl:
      'https://res.cloudinary.com/di8upujpz/image/upload/v1680255515/download_1_u9dgpw.jpg',
  },
  {
    id: 2,
    playerName: 'Vladimir Putin',
    imageUrl:
      'https://res.cloudinary.com/di8upujpz/image/upload/v1680255536/download_mqxa9o.jpg',
  },
  {
    id: 3,
    playerName: 'Jin Ping Mawa',
    imageUrl:
      'https://res.cloudinary.com/di8upujpz/image/upload/v1680255805/download_6_ye4mvc.jpg',
  },
  {
    id: 4,
    playerName: 'Kim Bro',
    imageUrl:
      'https://res.cloudinary.com/di8upujpz/image/upload/v1680256475/download_7_vrrkxx.jpg',
  },
]

function winnerImage(winner, playersDetails) {
  const player1 = playersDetails[0]
  const player2 = playersDetails[1]
  switch (winner) {
    case '*':
      return player1

    case 'o':
      return player2

    default:
      return null
  }
}

const player1 = Math.ceil(Math.random() * playersList.length) - 1
let player2

if (player1 === 0) {
  player2 = player1 + 1
} else if (player1 === playersList.length) {
  player2 = player1 - 1
} else {
  player2 = player1 - 1
}

console.log(player1, player2)

class App extends Component {
  state = {
    value: '*',
    scores: ['', '', '', '', '', '', '', '', ''],
    playersDetails: [playersList[player1], playersList[player2]],
    winner: '',
    isGameOver: false,
    gameStatus: statusFirms.initial,
  }

  componentDidMount() {
    document.title = 'Tic Tac Tornament'
  }

  checkWinner = squares => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],

      [0, 4, 8],
      [2, 4, 6],
    ]

    combos.map((combo, index) => {
      if (
        squares[combos[index][0]] === '' ||
        squares[combos[index][1]] === '' ||
        squares[combos[index][2]] === ''
      ) {
        // nothing doing
      } else if (
        squares[combos[index][0]] === squares[combos[index][1]] &&
        squares[combos[index][0]] === squares[combos[index][2]] &&
        squares[combos[index][2]] === squares[combos[index][1]]
      ) {
        this.setState({
          winner: squares[combos[index][2]],
          gameStatus: statusFirms.winnerView,
        })
      }
      return combo
    })
  }

  noWinnerView = () => (
    <div className="tie-container">
      <h1 className="tie-view-text">Match Is Tie Play Again</h1>
      <button
        onClick={() =>
          this.setState({
            gameStatus: statusFirms.tableView,
            scores: ['', '', '', '', '', '', '', '', ''],
          })
        }
        className="play-button"
      >
        Play Again
      </button>
    </div>
  )

  setValue = async num => {
    const {scores, value} = this.state
    const newScores = [...scores]

    if (scores[num] !== '') {
      alert('already clicked')
      return
    }
    if (value === '*') {
      newScores[num] = '*'

      this.setState({value: 'o'})
    } else {
      newScores[num] = 'o'

      this.setState({value: '*'})
    }

    this.setState({scores: newScores})

    const isTotallyFilled = newScores.some(item => item === '')

    if (isTotallyFilled === false) {
      this.setState({gameStatus: statusFirms.noWinnerView})
    }

    this.checkWinner(newScores)
  }

  getColor = score => {
    let style = ''
    if (score === '*') {
      style += 'red'
    }
    if (score === 'o') {
      style += 'green'
    }
    return style
  }

  tableView = () => {
    const {scores, winner, playersDetails} = this.state

    const player1Details = playersDetails[0]
    const player2Details = playersDetails[1]

    return (
      <div className="table-view-container">
        <div className="top-image-container">
          <p className="players-option">*</p>
          <img src={player1Details.imageUrl} className="player1-image" />
          <p className="player-name-text">{player1Details.playerName}</p>
        </div>
        <center>
          <table border="1" style={{borderCollapse: 'collapse'}}>
            <tr>
              <TableCell
                bgColor={() => this.getColor(scores[0])}
                onClick={() => this.setValue(0)}
              >
                {scores[0]}
              </TableCell>
              <TableCell
                bgColor={() => this.getColor(scores[1])}
                onClick={() => this.setValue(1)}
              >
                {scores[1]}
              </TableCell>
              <TableCell
                bgColor={() => this.getColor(scores[2])}
                onClick={() => this.setValue(2)}
              >
                {scores[2]}
              </TableCell>
            </tr>
            <tr>
              <TableCell
                bgColor={() => this.getColor(scores[3])}
                onClick={() => this.setValue(3)}
              >
                {scores[3]}
              </TableCell>
              <TableCell
                bgColor={() => this.getColor(scores[4])}
                onClick={() => this.setValue(4)}
              >
                {scores[4]}
              </TableCell>
              <TableCell
                bgColor={() => this.getColor(scores[5])}
                onClick={() => this.setValue(5)}
              >
                {scores[5]}
              </TableCell>
            </tr>
            <tr>
              <TableCell
                bgColor={() => this.getColor(scores[6])}
                onClick={() => this.setValue(6)}
              >
                {scores[6]}
              </TableCell>
              <TableCell
                bgColor={() => this.getColor(scores[7])}
                onClick={() => this.setValue(7)}
              >
                {scores[7]}
              </TableCell>
              <TableCell
                bgColor={() => this.getColor(scores[8])}
                onClick={() => this.setValue(8)}
              >
                {scores[8]}
              </TableCell>
            </tr>
          </table>
        </center>
        <div className="images-container">
          <div className="player-image-container">
            <p className="players-option">*</p>
            <img
              src={player1Details.imageUrl}
              className="player1-small-image"
            />
            <p className="player-name-text">{player1Details.playerName}</p>
          </div>
          <div className="player-image-container">
            <p className="players-option">o</p>
            <img
              src={player2Details.imageUrl}
              className="player1-small-image"
            />
            <p className="player-name-text">{player2Details.playerName}</p>
          </div>
        </div>
        <div className="top-image-container">
          <p className="players-option">o</p>
          <img src={player2Details.imageUrl} className="player1-image" />
          <p className="player-name-text">{player2Details.playerName}</p>
        </div>
      </div>
    )
  }

  renderWinnerView = () => {
    const {winner, playersDetails} = this.state
    console.log(winner)
    return (
      <div className="winner-container">
        <img
          src={winnerImage(winner, playersDetails).imageUrl}
          className="winner-image"
        />
        <p className="winner-text">And The Winner Is</p>
        <br />
        <span className="winner-name-text">
          {winnerImage(winner, playersDetails).playerName}
        </span>

        <button
          type="button"
          className="restart-button"
          onClick={() =>
            this.setState({
              scores: ['', '', '', '', '', '', '', '', ''],
              gameStatus: statusFirms.tableView,
            })
          }
        >
          Restart
        </button>
      </div>
    )
  }

  renderVideoPlayer = () => {
    const {isGameOver} = this.state
    return (
      <div className="player-container">
        <ReactPlayer
          controls
          url="https://www.youtube.com/watch?v=5SdW0_wTX5c"
          height="80"
          width="60"
        />

        <span className="instruction-text">
          Before playing the game watch the video
        </span>
        <button
          type="button"
          onClick={() => this.setState({gameStatus: statusFirms.tableView})}
          className="play-button"
        >
          Play the game
        </button>
      </div>
    )
  }

  renderTicTacView = () => {
    const {gameStatus} = this.state

    switch (gameStatus) {
      case statusFirms.initial:
        return this.renderVideoPlayer()
      case statusFirms.tableView:
        return this.tableView()
      case statusFirms.winnerView:
        return this.renderWinnerView()
      case statusFirms.noWinnerView:
        return this.noWinnerView()
      default:
        return null
    }
  }

  render() {
    const {scores, winner, playersDetails, isGameOver} = this.state

    console.log(playersDetails)

    return (
      <div className="bg-container">
        <h1 className="tournament-title">Tic Tac Toe Tournament</h1>
        {this.renderTicTacView()}
      </div>
    )
  }
}

export default App
