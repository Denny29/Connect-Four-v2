import React, {useState} from "react";
import { Tile } from "./tile";

export const Gameboard = () => {
    
    //Board contains the colors of the tiles
    let totalRows = 6
    let totalColumns =7
    const [board, setBoard] = useState<string[][]>(
        Array.from({ length: totalRows }, () => Array(totalColumns).fill(""))
    )
    //Current player/color
    const [currentPlayer, setCurrentPlayer] = useState("red")

    const [gameOver, setGameOver] = useState(false)

    //Helper method to change items in the board array
    const updateBoard = (rowIndex: number, columnIndex: number, color: string) => {
        const newBoard = [...board]
        newBoard[rowIndex][columnIndex] = color
        setBoard(newBoard)
    }

    //Helper method to update the toggle colors
    const toggleColor = (): void => {
        if(currentPlayer === "red"){
            setCurrentPlayer("yellow")
        }
        else{
            setCurrentPlayer("red")
        }
    }
    
    /**
     * 
     * @param columnIndex 
     * @param currentPlayer 
     * @returns 
     */
    const placeToken = (columnIndex: number, currentPlayer: string): number => {
        let lowestRowIndex: number
        for(lowestRowIndex = totalRows - 1; lowestRowIndex >= 0; lowestRowIndex--){
            if(board[lowestRowIndex][columnIndex] === ""){
                updateBoard(lowestRowIndex, columnIndex, currentPlayer)
                console.log(`Placed token: Row: ${lowestRowIndex}, Column: ${columnIndex}`)
                return lowestRowIndex
            }
        }
        return lowestRowIndex
    }

    /**
     * Helper method to check if a tile matches the current player
     * @param rowIndex 
     * @param columnIndex 
     * @returns true or false depending on if the tile matches the current player
     */
    const tileMatch = (rowIndex: number, columnIndex: number): boolean => {
        return board[rowIndex][columnIndex] === currentPlayer
    }



    /**
     * Upon clicking a tile this method will look
     * three spaces around said tile and check if
     * there is a match.
     * Lets have it return true if so
     */
    const checkForWin = (rowIndex: number, columnIndex: number): boolean => {
        
        //totalMatchedTiles is always at least one, cause the tile clicked is the current player's color
        let totalMatchedTiles = 0;
        
        //horizontal checks:
        //Check left of clicked tile
        let tilesChecked = 0;
        while(columnIndex >= 0 && tilesChecked < 4){
            if(tileMatch(rowIndex, columnIndex)){
                totalMatchedTiles++
            }
            else {
                //No match so break the loop
                break
            }
            tilesChecked++;
            columnIndex--;
        }

        //Check right of clicked tile
        console.log(`${currentPlayer} has ${totalMatchedTiles} matches`)

        if(totalMatchedTiles == 4){
            console.log(`${currentPlayer} wins!`)
            return true
        }
        return false
    }

    const onTileClick = (rowIndex: number, columnIndex: number): void => {
        //Check if tile is empty
        if(board[rowIndex][columnIndex] === ""){
            if(!gameOver){
                let actualRowIndex = placeToken(columnIndex, currentPlayer)
                checkForWin(actualRowIndex, columnIndex)
                // toggleColor();
            }
        }
        // console.log(`Clicked! Row: ${rowIndex}, Column: ${columnIndex}`)
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