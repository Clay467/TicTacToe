const gameBoard = (() => {

    const container = document.querySelector('.container');
    let boardDivs = [];


        //loops up to 9, creates grid divs

    for (let i=0;i<9;i++) {
        const div = document.createElement('div');
        container.appendChild(div);
        boardDivs.push(div);
    }

    const boardContent = () => {
        board = [];
        for (let i=0;i<boardDivs.length;i++){
            board.push(boardDivs[i].textContent);
        }
        return board;
    };

    const clearBoard = () => {
        boardDivs.forEach(div => {
            div.textContent = '';
        });
    }

    return {boardDivs, boardContent, clearBoard};

})();


const gameFlow = (() => {
    const evaluate = (board) => {

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
    
            if (!board.includes('')) {
                return 0;
            } else {
            return undefined;
            }
    };

    const checkWin = () => {
        setTimeout(function() {
            let board = gameBoard.boardContent();
            let gameState = evaluate(board);
        
            if (gameState == 10) alert('X wins!'); 
            if (gameState == -10) alert('O wins!');
            if (gameState == 0) alert('It\'s a tie!'); 
        
            if (gameState != undefined) {
                gameBoard.clearBoard();
            }
        }, 10);
    }

    return {evaluate, checkWin};
})();

const AI = (() => {

    const minimax = (board, depth, isMax) => {
    
        let score = gameFlow.evaluate(board);
    
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
            return best + depth;
        }
    };

    const findBestMove = (board) => {
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
    };

    return {findBestMove};
})();

const player = (symbol) => {
    this.symbol = symbol;
    const move = (div) => {
        div.textContent = symbol;
    }
    return {move, symbol};
};

const playGame = (() => {

    const playerX = player('X');
    const playerO = player('O');

    const makeMoves = (div) => {
        if (!div.textContent) {
            playerX.move(div);
            gameFlow.checkWin();

            let board = gameBoard.boardContent();
            let boardDivs = gameBoard.boardDivs;

            if (gameFlow.evaluate(board) == undefined) {
                setTimeout(function () {
                    playerO.move(boardDivs[AI.findBestMove(board)]);
                    gameFlow.checkWin();
                },50);
            }
        }
    }

    gameBoard.boardDivs.forEach(div => {
        div.addEventListener('click', makeMoves.bind(this, div));
    });
    return {playerX, playerO};
})();