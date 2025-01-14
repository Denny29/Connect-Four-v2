import { ReactElement } from "react"

type GameStatusProps = {
    currentPlayer: string
    gameOver: boolean
    restartGame: () => void
}

const GameStatus = ({currentPlayer, gameOver, restartGame}: GameStatusProps) => {
    let output: ReactElement 
    if(gameOver)
        output = <h2 onClick={restartGame}><span className={`${currentPlayer}-status`}>{currentPlayer}</span> Wins! Click here to restart</h2>
    else
        output = <h1>Current Player: <span className={`${currentPlayer}-status`}>{currentPlayer}</span></h1>

    return output
}

export default GameStatus