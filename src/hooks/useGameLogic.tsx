import { useState } from "react";

const useGameLogic = () => {
    //Board contains the colors of the tiles
    let totalRows = 6
    let totalColumns =7

    const [board, setBoard] = useState<string[][]>(
        Array.from({ length: totalRows }, () => Array(totalColumns).fill(""))
    )
    const [currentPlayerColor, setCurrentPlayerColor] = useState("Red")
    const [gameOver, setGameOver] = useState(false)

    //Helper method to change items in the board array
    const updateBoard = (rowIndex: number, columnIndex: number, color: string) => {
        const newBoard = [...board]
        newBoard[rowIndex][columnIndex] = color
        setBoard(newBoard)
    }

    //Helper method to update the toggle colors
    const toggleColor = (): void => {
        setCurrentPlayerColor(currentPlayerColor === "Red"? "Yellow": "Red")
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

    const omniCheck = (rowIndex: number, columnIndex: number, direction: string) => {
        let tilesChecked = 0
        let matchedTiles = 0;

        while((rowIndex >= 0 && rowIndex < totalRows) && (columnIndex >= 0 && columnIndex < totalColumns) && tilesChecked < 4){
            if(tileMatch(rowIndex, columnIndex)){
                matchedTiles++
            }
            else {
                //No match so break the loop
                break
            }
            tilesChecked++;

            //Horizontal check logic
            if(direction === "left") 
                columnIndex--;
            else if(direction ==="right")
                columnIndex++;
            //Veritcal check logic
            else if(direction === "down")
                rowIndex++;
            //Digonal check logic
            else if(direction === "top-right"){
                rowIndex--;
                columnIndex++;
            }
            else if(direction === "top-left"){
                rowIndex--;
                columnIndex--;
            }
            else if(direction === "bottom-right"){
                rowIndex++;
                columnIndex++;
            }
            else if(direction === "bottom-left"){
                rowIndex++;
                columnIndex--;
            }
        }
        return matchedTiles

    }

    //Helper method to check if a plyer got 4 tiles
    const didPlayerWin = (totalMatchedTiles: number): boolean => {
        if(totalMatchedTiles == 4){      
            setGameOver(true)
            return true
        }
        return false
    }

    /**
     * Upon clicking a tile this method will look
     * three spaces around said tile and check if
     * there is a match.
     */
    const checkForWin = (rowIndex: number, columnIndex: number):boolean => {
        /**
         * totalMatchedTiles needs to start at -1 as totalMatchedTiles
         * includes the clicked tile. This is an issue because I'm going to run
         * the check methods twice for each direction, which would messs up the conditions
         */
        let totalMatchedTiles = -1;
        
        //horizontal checks:
        totalMatchedTiles += omniCheck(rowIndex, columnIndex, "left")
        totalMatchedTiles += omniCheck(rowIndex, columnIndex, "right")

        // console.log(`${currentPlayerColor} has ${totalMatchedTiles} horizontal matches`)
        if (didPlayerWin(totalMatchedTiles))
            return true

        //Reset totalMatchedTiles to 0 
        totalMatchedTiles = 0;

        //vertical check, no need to check up.
        totalMatchedTiles += omniCheck(rowIndex, columnIndex, "down")
        // console.log(`${currentPlayerColor} has ${totalMatchedTiles} vertical matches`)
        if (didPlayerWin(totalMatchedTiles))
            return true

        //Reset totalMatchedTiles to -1 
        totalMatchedTiles = -1;

        //top-right to bottom-left diagonal checks
        totalMatchedTiles += omniCheck(rowIndex, columnIndex, "top-right")
        totalMatchedTiles += omniCheck(rowIndex, columnIndex, "bottom-left")
        // console.log(`${currentPlayerColor} has ${totalMatchedTiles} top-right to bottom-left diagonal matches`)
        if (didPlayerWin(totalMatchedTiles))
            return true

        //Reset totalMatchedTiles to -1 
        totalMatchedTiles = -1;

        //top-left to bottom-right diagonal checks
        totalMatchedTiles += omniCheck(rowIndex, columnIndex, "top-left")
        totalMatchedTiles += omniCheck(rowIndex, columnIndex, "bottom-right")
        // console.log(`${currentPlayerColor} has ${totalMatchedTiles} top-right to bottom-left diagonal matches`)
        if (didPlayerWin(totalMatchedTiles))
            return true
        return false
    }

    return {board, setBoard, currentPlayer: currentPlayerColor, gameOver, setGameOver, toggleColor, placeToken, checkForWin}
}

export default useGameLogic