import { ReactElement } from "react"

type GameStatusProps = {
    currentPlayer: string
    gameOver: boolean
    moveCounter: number
    restartGame: () => void
}

const GameStatus = ({currentPlayer, gameOver, moveCounter, restartGame}: GameStatusProps) => {
    let output: ReactElement 
    if(gameOver)
        output = <h2 onClick={restartGame}><span className={`${currentPlayer}-status`}>{currentPlayer}</span> Wins! Click here to restart</h2>
    else if (moveCounter == 42){
        output = <h2 onClick={restartGame}>Draw! Click here to restart</h2>
    }
    else
        output = <h1>Current Player: <span className={`${currentPlayer}-status`}>{currentPlayer}</span></h1>

    return output
}

export default GameStatus