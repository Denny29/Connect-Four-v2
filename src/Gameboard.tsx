import React, {useState} from "react";
import { Tile } from "./tile";

export const Gameboard = () => {
    
    //Board contains the colors of the tiles
    let totalRows = 7
    let totalColumns = 6
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
    
    //Places the piece as low as possible
    const placeToken = (rowIndex: number, currentPlayer: string): number => {
        let lowestColumnIndex: number
        for(lowestColumnIndex = 5; lowestColumnIndex >= 0; lowestColumnIndex--){
            if(board[rowIndex][lowestColumnIndex] === ""){
                updateBoard(rowIndex, lowestColumnIndex, currentPlayer)
                console.log(`Placed token: Row: ${rowIndex}, Column: ${lowestColumnIndex}`)
                return lowestColumnIndex
            }
        }
        return lowestColumnIndex
    }

    const checkForMatch = (rowIndex: number, columnIndex: number): boolean => {
        if(board[rowIndex][columnIndex] === currentPlayer){
            return true
        }
        return false
    }



    /**
     * Upon clicking a tile this method will look
     * three spaces around said tile and check if
     * there is a match.
     * Lets have it return true if so
     */
    const checkForWin = (rowIndex: number, columnIndex: number): boolean => {
    
        let numOfMatches = 0;

        //horizontal checks:
        //Check left of clicked tile
        let columsChecked = 0;
        while(columnIndex - columsChecked > 0){
            if(checkForWin(rowIndex, columnIndex)){
                numOfMatches++
            }
            columsChecked++;
            if(columsChecked === 3)
                break
        }
        //Check right of clicked tile

        console.log(numOfMatches)
        return false
    }

    const onTileClick = (rowIndex: number, columnIndex: number): void => {
        //Check if tile is empty
        if(board[rowIndex][columnIndex] === ""){
            if(!gameOver){
                let actualColumnIndex = placeToken(rowIndex, currentPlayer)
                // checkForWin(rowIndex, actualColumnIndex)
                toggleColor();
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