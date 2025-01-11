import React, {useState} from "react";
import { Tile } from "./tile";


export const Gameboard = () => {

    //Board contains the colors of the tiles
    //Leave it as empty for now
    const [board, setBoard] = useState<string[][]>(
        Array.from({ length: 6 }, () => Array(7).fill(""))
    )
    console.log(board)
    return (
        <div id="gameboard">
            {
                board.map((rows, rowIndex) => {
                    return <div className="rows">
                        {rows.map((color, columnIndex) => {
                            return <Tile key={`${rowIndex}-${columnIndex}`} bgColor={color}/>
                        })}
                    </div>
                })
            }
        </div>
    )
}