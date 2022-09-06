const Grid = (() => {
    const game = document.querySelector('.game');
    let tiles = [];

    const makeGrid = () => {
        for(let i = 0; i < 9; i++) {
            let tile = document.createElement('p');
            tile.id = i;
            tiles.push(tile);
            game.appendChild(tile);
            
        }
    }

    const getTiles = () => {return tiles}
    
    return {makeGrid, getTiles}
})();

const Player = (simbol, score) => {
    const getSimbol = () => simbol
    const getScore = () => score

    const addScore = () => score++
    const resetScore = () => score = 0

    return {getScore, getSimbol, addScore}
}

const playerX = Player('X', 0);
const playerO = Player('O', 0);

const Game = (() => {
    Grid.makeGrid()

    let textDisplay = document.querySelector('#displayGame');
    textDisplay.innerHTML = 'Player X beginning';
    let tiles = document.querySelectorAll('.game p');
    let count = 0;

    addMark = (e) => {
        if (e.target.classList.contains('marked') == false) {
            if (count % 2 == 0) {
                textDisplay.innerHTML = 'Player O turn'
                e.target.innerHTML = playerX.getSimbol();
            } else {
                textDisplay.innerHTML = 'Player X turn'
                e.target.innerHTML = playerO.getSimbol();
            }
            e.target.classList.add('marked');
            count++;
        }
        checkRows()
        checkColumns()
        checkPrincipalDiagonal()
        checkSecundaryDiagonal()
    }

    (marker = () => {
        for (let i = 0; i < 9; i++) {
            tiles[i].addEventListener('click', addMark)
        }
    })()
    
    clearEventListener = () => {
        for (let i = 0; i < tiles.length; i++) {
            tiles[i].removeEventListener('click', addMark)
        }
    }
    
    rows = () => {
        let result = [[], [], []]
        let count = 0
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const element = tiles[j + i * 3];
                if (!element) continue
                result[i].push(element)
            }
        }
        return result
    }

    columns = () => {
        let result = [[], [], []]
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                row = rows()[j];
                result[i].push(row[i])               
            }
        }
        return result
    }

    principalDiagonal = () => {
        let result = []
        let matriz = rows()
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i == j) {
                    result.push(matriz[i][j])
                }
            }
        }
        return result
    }

    secundaryDiagonal = () => {
        let result = []
        let matriz = rows()
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (i + j == 2) {
                    result.push(matriz[i][j])
                }
            }
        }
        return result
    }

    checkRows = () => {
        let tile = rows();
        for (let i = 0; i < 3; i++) {
            let row = '';
            for (let j = 0; j < 3; j++) {
                row += tile[i][j].innerHTML;
            }
            if (row === 'XXX') {
                textDisplay.innerHTML = 'Player X win'
                playerX.addScore()
                clearEventListener();
                break
            } else if (row === 'OOO') {
                textDisplay.innerHTML = 'Player O win'
                playerO.addScore()
                clearEventListener();
                break
            }
        }
    }

    checkColumns = () => {
        let tile = columns();
        for (let i = 0; i < 3; i++) {
            let row = '';
            for (let j = 0; j < 3; j++) {
                row += tile[i][j].innerHTML;
            }
            if (row === 'XXX') {
                textDisplay.innerHTML = 'Player X win';
                clearEventListener();
                break
            } else if (row === 'OOO') {
                textDisplay.innerHTML = 'Player O win';
                clearEventListener();
                break
            }
        }
    }

    checkPrincipalDiagonal = () => {
        let tile = principalDiagonal();
        let row = '';
        for (let i = 0; i < 3; i++) {
            row += tile[i].innerHTML;
            if (row === 'XXX') {
                textDisplay.innerHTML = 'Player X win';
                clearEventListener();
                break
            } else if (row === 'OOO') {
                textDisplay.innerHTML = 'Player O win';
                clearEventListener();
                break
            }
        } 
    }

    checkSecundaryDiagonal = () => {
        let tile = secundaryDiagonal();
        let row = '';
        for (let i = 0; i < 3; i++) {
            row += tile[i].innerHTML;
            if (row === 'XXX') {
                textDisplay.innerHTML = 'Player X win';
                clearEventListener();
                break
            } else if (row === 'OOO') {
                textDisplay.innerHTML = 'Player O win';
                clearEventListener();
                break
            }
        } 
    }
    return {marker}
})()

restartGridBtn = (() => {
    let btn = document.querySelector('#restartGridBtn')
    let tiles = document.querySelectorAll('.game p')
    let textDisplay = document.querySelector('#displayGame');
    
    clearGrid = () => {
        for (let i = 0; i < 9; i++) {
            let tile = tiles[i];
            tile.innerHTML = ''
            tile.classList.remove('marked')
        }
        Game.marker()
        textDisplay.innerHTML = 'Player X beginning';
    }
    btn.onclick = clearGrid
})()