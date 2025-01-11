import React, {useState} from "react";
import { Tile } from "./tile";

export const Gameboard = () => {
    
    //Board contains the colors of the tiles
    const [board, setBoard] = useState<string[][]>(
        Array.from({ length: 6 }, () => Array(7).fill(""))
    )
    //Current player/color
    const [currentPlayer, setCurrentPlayer] = useState("")

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

    const onTileClick = (rowIndex: number, columnIndex: number): void => {
        //Check if tile is empty
        if(board[rowIndex][columnIndex] === ""){
            updateBoard(rowIndex, columnIndex, currentPlayer)
            toggleColor();
        }
    }


    console.log(board)



    return (
        <div id="gameboard">
            {
                board.map((rows, rowIndex) => {
                    return <div className="rows">
                        {rows.map((color, columnIndex) => {
                            return <Tile key={`${rowIndex}-${columnIndex}`} bgColor={color} clickProp={onTileClick(rowIndex, columnIndex)}/>
                        })}
                    </div>
                })
            }
        </div>
    )
}