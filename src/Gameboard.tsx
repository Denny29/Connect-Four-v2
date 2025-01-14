import { Tile } from "./tile";
import useGameLogic from "./hooks/useGameLogic";
import GameStatus from "./GameStatus";

export const Gameboard = () => {
    let totalRows = 6
    let totalColumns =7

    const {board, setBoard, currentPlayer, gameOver, setGameOver, toggleColor, placeToken, checkForWin} = useGameLogic()

    const onTileClick = (rowIndex: number, columnIndex: number): void => {
        //Check if tile is empty
        if(board[rowIndex][columnIndex] === ""){
            if(!gameOver){
                let actualRowIndex = placeToken(columnIndex, currentPlayer)
                if (!checkForWin(actualRowIndex, columnIndex))
                    toggleColor();
            }
        }
        console.log(`Clicked! Row: ${rowIndex}, Column: ${columnIndex}`)
    }

    const restartGame = (): void => {
        setGameOver(false)
        setBoard(Array.from({ length: totalRows }, () => Array(totalColumns).fill("")))
    }

    return (
        <>
            <div id="gameboard">
            {
                board.map((rows, rowIndex) => {
                    return <div key={`row-${rowIndex}`} className="rows">
                        {rows.map((color, columnIndex) => {
                            return <Tile 
                            key={`${rowIndex}-${columnIndex}`} 
                            bgColor={color}
                            loc={`${rowIndex}-${columnIndex}`} 
                            clickProp={() => onTileClick(rowIndex, columnIndex)}/>
                        })}
                    </div>
                })
            }
            <br></br>
            <GameStatus currentPlayer={currentPlayer} gameOver={gameOver} restartGame={restartGame}/>
            </div>
        </>
    )
}