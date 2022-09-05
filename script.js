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



const Player = (simbol) => {
    return {simbol}
}

const Game = (() => {
    Grid.makeGrid()
    

    const playerX = Player('X');
    const playerO = Player('O');
    
    let textDisplay = document.querySelector('#displayGame');
    textDisplay.innerHTML = 'Player X beginning';
    let tiles = document.querySelectorAll('.game p');
    
    let count = 0;
    addMark = (e) => {
        if (e.target.classList.contains('marked') == false) {
            if (count % 2 == 0) {
                textDisplay.innerHTML = 'Player O turn'
                e.target.innerHTML = playerX.simbol;
            } else {
                textDisplay.innerHTML = 'Player X turn'
                e.target.innerHTML = playerO.simbol;
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
    })
    
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
                clearEventListener();
                break
            } else if (row === 'OOO') {
                textDisplay.innerHTML = 'Player O win'
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

Game.marker();


