import React, {useState} from "react";
import { Tile } from "./tile";


export const Gameboard = () => {
    const [board, setBoard] = useState<string[][]>(
        Array.from({ length: 6 }, () => Array(7).fill(''))
    )
    console.log(board)
    return (
        <div className="gameboard">
            {board.map((row) => {
                return <div className="row">
                    {row.map((tile) => {
                        return <Tile />
                    })}
                </div>
            } )}
        </div>
    )
}