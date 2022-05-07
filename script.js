const Gameboard = (() => {
    const container = document.querySelector('.container');
    let gameBoard = [];

    for (let i=0;i<9;i++) {
        const div = document.createElement('div');
        div.addEventListener('click', makeMove.bind(this, div));
        container.appendChild(div);
        gameBoard.push(div);
    }
    return gameBoard;
})();

function makeMove(div) {
    if (!div.textContent){
        div.textContent = 'X';
        setTimeout(function() {
            checkWin(divBoardToContentArray());
        }, 10);
        setTimeout(function() {
            Gameboard[findBestMove(divBoardToContentArray(Gameboard))].textContent = 'O';
            setTimeout(function() {
                checkWin(divBoardToContentArray());
            }, 10);
        }, 50);
    }
};

function divBoardToContentArray(){
    board = [];
    for (let i=0;i<Gameboard.length;i++){
    board.push(Gameboard[i].textContent);
    }
    return board;
}

function checkWin(board) {
    gameState = evaluate(board);

    if (gameState == 10) alert('X wins!'); 
    if (gameState == -10) alert('O wins!');
    if (gameState == 0) alert('It\'s a tie!'); 

    if (gameState != undefined) {
        clearBoard();
    }
};

function clearBoard(){
    for (let i=0;i<Gameboard.length;i++){
        Gameboard[i].textContent = '';
    }
};

function evaluate(board) {

    if (!board.includes('')) return 0;

    if (
        //rows
        (board[0] === 'X' &&
        board[1] === 'X' &&
        board[2] === 'X') ||

        (board[3] === 'X' &&
        board[4] === 'X' &&
        board[5] === 'X') ||

        (board[6] === 'X' &&
        board[7] === 'X' &&
        board[8] === 'X') ||

        //columns
        (board[0] === 'X' &&
        board[3] === 'X' &&
        board[6] === 'X') ||

        (board[1] === 'X' &&
        board[4] === 'X' &&
        board[7] === 'X') ||

        (board[2] === 'X' &&
        board[5] === 'X' &&
        board[8] === 'X') ||

        //diagonals
        (board[0] === 'X' &&
        board[4] === 'X' &&
        board[8] === 'X') ||

        (board[2] === 'X' &&
        board[4] === 'X' &&
        board[6] === 'X')) {
        return 10;
    } else if (
        //rows
        (board[0] === 'O' &&
        board[1] === 'O' &&
        board[2] === 'O') ||

        (board[3] === 'O' &&
        board[4] === 'O' &&
        board[5] === 'O') ||

        (board[6] === 'O' &&
        board[7] === 'O' &&
        board[8] === 'O') ||

        //columns
        (board[0] === 'O' &&
        board[3] === 'O' &&
        board[6] === 'O') ||

        (board[1] === 'O' &&
        board[4] === 'O' &&
        board[7] === 'O') ||

        (board[2] === 'O' &&
        board[5] === 'O' &&
        board[8] === 'O') ||

        //diagonals
        (board[0] === 'O' &&
        board[4] === 'O' &&
        board[8] === 'O') ||

        (board[2] === 'O' &&
        board[4] === 'O' &&
        board[6] === 'O')) {
        return -10;
        }
        return undefined;
};


// start of minimax implementation

function minimax(board, depth, isMax) {
    
    let score = evaluate(board);

    if (score != undefined) return score;

    if (isMax) {

        let best = -1000;

        for (let i=0;i<9;i++) {
            if (board[i]=='') {
                board[i]= 'X';

                best = Math.max(best, minimax(board,depth+1, !isMax));

                board[i] = '';
            }
        }
        return best - depth;
    } else {
        let best = 1000;

        for (let i=0;i<9;i++) {
            if (board[i]=='') {
                board[i] = 'O';

                best = Math.min(best, minimax(board,depth +1, !isMax));

                board[i]='';
            }
        }
        return best - depth;
    }
}

function findBestMove(board) {
    let bestVal = 1000;
    bestMove = -1;

    for (let i=0;i<9;i++) {
        if (board[i]=='') {
            board[i] = 'O';

            let moveVal = minimax(board, 0, true);

            board[i] = '';

            if (moveVal < bestVal) {
                bestMove = i;
                bestVal = moveVal;
            }
        }
    }
    return bestMove;
}

































