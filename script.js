let isPlayerX = true;

//need array to check for game end

const gameFlow = (div) => {
    if (isPlayerX && !div.textContent){
        div.textContent = 'X';
        isPlayerX = false;
    } else if (!isPlayerX && !div.textContent){
        div.textContent = 'O';
        isPlayerX = true; 
    }
};

const Gameboard = (() => {
    const container = document.querySelector('.container');

    for (let i=0;i<9;i++) {
        const div = document.createElement('div');
        div.addEventListener('click', gameFlow.bind(this, div));
        container.appendChild(div);
    }
})();
