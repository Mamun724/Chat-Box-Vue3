function boardIndex(boardSize, row, col) {
    return row * boardSize + col;
}

export function winningStrategy(board, boardSize) {
    //check diagonal
    let allSame = true;
    for (let c = 0; c < boardSize; c++) {
        const cell = board[boardIndex(boardSize, 0, 0)];
        if (cell === "" || cell !== board[boardIndex(boardSize, c, c)]) {
            allSame = false;
            break;
        }
    }

    if (allSame) {
        return board[boardIndex(boardSize, 0, 0)];
    }

    //check diagonal
    allSame = true;
    for (let c = 0; c < boardSize; c++) {
        const cell = board[boardIndex(boardSize, 0, boardSize - 1)];
        if (cell === "" || cell !== board[boardIndex(boardSize, c, boardSize - 1 - c)]) {
            allSame = false;
            break;
        }
    }

    if (allSame) {
        return board[boardIndex(boardSize, 0, boardSize - 1)];
    }

    //check rows
    for (let r = 0; r < boardSize; r++) {
        const cell = board[boardIndex(boardSize, r, 0)];
        allSame = true;
        for (let c = 1; c < boardSize; c++) {
            if (cell === "" || cell !== board[boardIndex(boardSize, r, c)]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            return cell;
        }
    }

    //check columns
    for (let c = 0; c < boardSize; c++) {
        const cell = board[boardIndex(boardSize, 0, c)];
        allSame = true;
        for (let r = 1; r < boardSize; r++) {
            if (cell === "" || cell !== board[boardIndex(boardSize, r, c)]) {
                allSame = false;
                break;
            }
        }

        if (allSame) {
            return cell;
        }
    }

    //check draw
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[boardIndex(boardSize, r, c)] === "") {
                return false;
            }
        }
    }

    return "D";
}
