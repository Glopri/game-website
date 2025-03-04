let BOARD_SIZE = 15;
let board; //kenttä talennetaan tähän
const cellSize = calculateCellSize();


document.getElementById("new-game-btn").addEventListener('click', startGame);

//JÄÄTIIN TÄHÄN ELI RESPOSIIN
function calculateCellSize(){
// Otetaan talteen pienempi luku ikkunan leveydestä ja korkeudesta
  const screenSize = Math.min(window.innerWidth, window.innerHeight);

  // Tehdään pelilaudasta hieman tätä pienempi, jotta jää pienet reunat
  const gameBoardSize = 0.95 * screenSize;

  // Laudan koko jaetaan ruutujen määrällä, jolloin saadaan yhden ruudun koko
  return gameBoardSize / BOARD_SIZE;
}

function startGame(){
    document.getElementById("intro-screen").style.display = 'none';
    document.getElementById("game-screen").style.display = 'block';

    board = generateRandomBoard();
    drawBoard(board);
}

function getCell(board, x, y) {
    return board[y][x];
}

function generateRandomBoard(){

    const newBoard = Array.from({ length: BOARD_SIZE}, () =>
        Array.apply(BOARD_SIZE).fill(' '));

    console.log(newBoard);

// set walls in edges
for (let y = 0; y < BOARD_SIZE; y++) {

    for (let x = 0; x < BOARD_SIZE; x++) {
     if (y === 0 || y === BOARD_SIZE - 1 || x === 0 || x === BOARD_SIZE - 1) {
     newBoard[y][x] = 'W'; //W is wall
     }
    }

   }

   generateObstacles(newBoard);
    
   return newBoard;

}

function drawBoard(board) {
    const gameBoard = document.getElementById('game-board');

    //Asetataan grid sarakkeet ja rivit dynaamisesti BOARD_SIZEN mukaan
    gameBoard.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, 1fr)`;

//luodaan jokainen ruutu
for (let y = 0; y< BOARD_SIZE; y++){
    for (let x= 0; x < BOARD_SIZE; x++){
        const cell = document.createElement('div');
        cell.classList.add('cell'); 
        cell.style.width = cellSize + "px";
        cell.style.height = cellSize + "px";

        if (getCell(board, x, y) === 'W') {
            cell.classList.add('wall')
        }

        gameBoard.appendChild(cell);
        
    }
}

}

function generateObstacles(board){
    const obstacles = [
        [[0,0], [0,1], [1,0], [1,1]], // square
        [[0,0], [1,0], [2,0], [3,0]], //I Block
        [[0,0], [1,0], [2,0], [1,1]], //T block
    ];

    const positions = [
      {startX: 5, startY: 7},
      {startX: 10, startY: 10},
      {startX: 2, startY: 2}
    ];

    positions.forEach( pos => {
       
        const randomObstacle = obstacles[Math.floor(Math.random() * obstacles.length)];

        for(coordinatePair of randomObstacle){
            [x,y] = coordinatePair;
            board[pos.startY + y][pos.startX + x] = "W";
        }
    });

}


