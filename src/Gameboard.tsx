import { Tile } from "./tile";
import useGameLogic from "./hooks/useGameLogic";

export const Gameboard = () => {
    
    const {board, currentPlayer, gameOver, toggleColor, placeToken, checkForWin} = useGameLogic()

    const onTileClick = (rowIndex: number, columnIndex: number): void => {
        //Check if tile is empty
        if(board[rowIndex][columnIndex] === ""){
            if(!gameOver){
                let actualRowIndex = placeToken(columnIndex, currentPlayer)
                checkForWin(actualRowIndex, columnIndex)
                //Check again if game is over so the color doesn't switch
                if(!gameOver)
                    toggleColor();
            }
            else{
                alert(`${currentPlayer} Wins!!`)
            }
        }
        console.log(`Clicked! Row: ${rowIndex}, Column: ${columnIndex}`)
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
            
            </div>
            {/* <h1>Current Player: {currentPlayer}</h1> */}
        </>
    )
}