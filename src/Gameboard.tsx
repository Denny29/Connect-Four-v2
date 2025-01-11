import React, {useState} from "react";
import { Tile } from "./tile";

export const Gameboard = () => {
    
    //Board contains the colors of the tiles
    let rows = 7
    let columns = 6
    const [board, setBoard] = useState<string[][]>(
        Array.from({ length: rows }, () => Array(columns).fill(""))
    )
    //Current player/color
    const [currentPlayer, setCurrentPlayer] = useState("red")

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
    const placeToken = (rowIndex: number, currentPlayer: string): void => {
        for(let lowestColumn = 5; lowestColumn >= 0; lowestColumn--){
            if(board[rowIndex][lowestColumn] === ""){
                updateBoard(rowIndex, lowestColumn, currentPlayer)
                break
            }
        }
    }


    // const checkForWin = () => {

    // }

    const onTileClick = (rowIndex: number, columnIndex: number): void => {
        //Check if tile is empty
        if(board[rowIndex][columnIndex] === ""){
            placeToken(rowIndex, currentPlayer)
            toggleColor();
        }
        console.log("Clicked! Row: " + rowIndex, columnIndex)
    }


    console.log(board)

    return (
        <>
            <div id="gameboard">
            {
                board.map((rows, rowIndex) => {
                    return <div className="rows">
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