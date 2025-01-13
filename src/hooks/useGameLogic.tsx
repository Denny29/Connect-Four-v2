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
        let lowestRowIndex: number
        for(lowestRowIndex = totalRows - 1; lowestRowIndex >= 0; lowestRowIndex--){
            if(board[lowestRowIndex][columnIndex] === ""){
                updateBoard(lowestRowIndex, columnIndex, currentPlayer)
                console.log(`Placed token: Row: ${lowestRowIndex}, Column: ${columnIndex}`)
                return lowestRowIndex
            }
        }
        //Rreturning whatever cause the method shouldnt ever get down here
        return lowestRowIndex
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

    /**
     * These methods are going to be a little redundant, but I'm going to waste
     * too much time otherwise
     * @param rowIndex 
     * @param columnIndex 
     * @param direction 
     * @returns The amount of matched tiles in that direction
     */
    const horizontalCheck = (rowIndex: number, columnIndex: number, direction: string): number => {
        let tilesChecked = 0
        let matchedTiles = 0;

        while((columnIndex >= 0 && columnIndex < totalColumns) && tilesChecked < 4){
            if(tileMatch(rowIndex, columnIndex)){
                matchedTiles++
            }
            else {
                //No match so break the loop
                break
            }
            tilesChecked++;

            if(direction === "left") 
                columnIndex--;
            else
                columnIndex++;
        }
        return matchedTiles
    }

    const verticalCheck = (rowIndex: number, columnIndex: number): number => {
        let tilesChecked = 0
        let matchedTiles = 0;
        while((rowIndex >= 0 && rowIndex < totalRows) && tilesChecked < 4){
            if(tileMatch(rowIndex, columnIndex)){
                matchedTiles++
                console.log(`Inside vertical check tilesChecked:${tilesChecked}`)
            }
            else {
                //No match so break the loop
                break
            }
            tilesChecked++;

            rowIndex++;
        }
        return matchedTiles
    }

    //Helper method to check if a plyer got 4 tiles
    const didPlayerWin = (totalMatchedTiles: number) => {
        if(totalMatchedTiles == 4){
            console.log(`${currentPlayerColor} wins!`)
            return true
        }
    }

    /**
     * Upon clicking a tile this method will look
     * three spaces around said tile and check if
     * there is a match.
     */
    const checkForWin = (rowIndex: number, columnIndex: number): boolean => {
        /**
         * totalMatchedTiles needs to start at -1 as totalMatchedTiles
         * includes the clicked tile. This is an issue because I'm going to run
         * the check methods twice for each direction, which would messs up the conditions
         */
        let totalMatchedTiles = -1;
        
        //horizontal checks:
        totalMatchedTiles += horizontalCheck(rowIndex, columnIndex, "left")
        totalMatchedTiles += horizontalCheck(rowIndex, columnIndex, "right")

        console.log(`${currentPlayerColor} has ${totalMatchedTiles} horizontal matches`)
        didPlayerWin(totalMatchedTiles)

        //Reset totalMatchedTiles to 0 
        totalMatchedTiles = 0;

        //vertical check, no need to check up.
        totalMatchedTiles += verticalCheck(rowIndex, columnIndex)

        console.log(`${currentPlayerColor} has ${totalMatchedTiles} vertical matches`)
        didPlayerWin(totalMatchedTiles)

        return false
    }

    return {board, currentPlayer: currentPlayerColor, gameOver, toggleColor, placeToken, checkForWin}
}

export default useGameLogic