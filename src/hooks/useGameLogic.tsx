import { useState } from "react";

const useGameLogic = () => {
    //Board contains the colors of the tiles
    let totalRows = 6
    let totalColumns =7

    const [board, setBoard] = useState<string[][]>(
        Array.from({ length: totalRows }, () => Array(totalColumns).fill(""))
    )
    const [currentPlayerColor, setCurrentPlayerColor] = useState("red")
    const [gameOver, setGameOver] = useState(false)

    //Helper method to change items in the board array
    const updateBoard = (rowIndex: number, columnIndex: number, color: string) => {
        const newBoard = [...board]
        newBoard[rowIndex][columnIndex] = color
        setBoard(newBoard)
    }

    //Helper method to update the toggle colors
    const toggleColor = (): void => {
        setCurrentPlayerColor(currentPlayerColor === "red"? "yellow": "red")
    }
    
    /**
     * Searches for the lowest possible token placement, if column is full it 
     * does nothing
     * @param columnIndex 
     * @param currentPlayer 
     * @returns the lowestRowIndex AKA the row index where the token was placed
     */
    const placeToken = (columnIndex: number, currentPlayer: string): number => {
        for(let lowestRowIndex = totalRows - 1; lowestRowIndex >= 0; lowestRowIndex--){
            if(board[lowestRowIndex][columnIndex] === ""){
                updateBoard(lowestRowIndex, columnIndex, currentPlayer)
                console.log(`Placed token: Row: ${lowestRowIndex}, Column: ${columnIndex}`)
                return lowestRowIndex
            }
        }
        //Rreturning whatever cause the method shouldnt ever get down here
        return -1
    }

    /**
     * Helper method to check if a tile matches the current player
     * @param rowIndex 
     * @param columnIndex 
     * @returns true or false depending on if the tile matches the current player
     */
    const tileMatch = (rowIndex: number, columnIndex: number): boolean => {
        return board[rowIndex][columnIndex] === currentPlayerColor
    }

    const horizontalCheck = (): number => {
        return 2
    }

    

    /**
     * Upon clicking a tile this method will look
     * three spaces around said tile and check if
     * there is a match.
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
        console.log(`${currentPlayerColor} has ${totalMatchedTiles} matches`)

        if(totalMatchedTiles == 4){
            console.log(`${currentPlayerColor} wins!`)
            return true
        }
        return false
    }

    return {board, currentPlayer: currentPlayerColor, gameOver, toggleColor, placeToken, checkForWin}
}

export default useGameLogic