const grid = document.querySelectorAll('.grid');

const pieces = [];

function logPiece(piece, col, row) {
  this.piece = piece;
  this.col = col;
  this.row = row;
  pieces.push({ piece, col, row });
}

function setBoard() {
  grid.forEach((cell) => {
    const col = cell.getAttribute('col');
    const row = cell.getAttribute('row');

    if ((col % 2 === '0') && (row % 2 === '1')) {
      cell.style.background = '#769656';
    } else if ((col % 2 === '1') && (row % 2 === '0')) {
      cell.style.background = '#769656';
    } else cell.style.background = '#eeeed2';
    if ((col === '7')) {
      const pawnW = document.createElement('img');
      pawnW.src = './icons/pawnW.svg';
      logPiece('w_pawn', col, row);
      cell.appendChild(pawnW);
    }
    if ((col === '2')) {
      const pawnW = document.createElement('img');
      pawnW.src = './icons/pawnB.svg';
      logPiece('b_pawn', col, row);
      cell.appendChild(pawnW);
    }

    if (col === '1' && (row === '1' || row === '8')) {
      const rookB = document.createElement('img');
      rookB.src = './icons/rookB.svg';
      logPiece('b_rook', col, row);
      cell.appendChild(rookB);
    }
    if (col === '8' && (row === '1' || row === '8')) {
      const rookW = document.createElement('img');
      rookW.src = './icons/rookW.svg';
      logPiece('w_rook', col, row);
      cell.appendChild(rookW);
    }

    if (col === '1' && (row === '2' || row === '7')) {
      const knightB = document.createElement('img');
      knightB.src = './icons/knightB.svg';
      logPiece('b_knight', col, row);
      cell.appendChild(knightB);
    }
    if (col === '8' && (row === '2' || row === '7')) {
      const knightW = document.createElement('img');
      knightW.src = './icons/knightW.svg';
      logPiece('w_knight', col, row);
      cell.appendChild(knightW);
    }

    if (col === '1' && (row === '3' || row === '6')) {
      const bishopB = document.createElement('img');
      bishopB.src = './icons/bishopB.svg';
      logPiece('b_bishop', col, row);
      cell.appendChild(bishopB);
    }
    if (col === '8' && (row === '3' || row === '6')) {
      const bishopW = document.createElement('img');
      bishopW.src = './icons/bishopW.svg';
      logPiece('w_bishop', col, row);
      cell.appendChild(bishopW);
    }

    if (col === '1' && (row === '4')) {
      const queenB = document.createElement('img');
      queenB.src = './icons/queenB.svg';
      logPiece('b_queen', col, row);
      cell.appendChild(queenB);
    }
    if (col === '8' && (row === '4')) {
      const queenW = document.createElement('img');
      queenW.src = './icons/queenW.svg';
      logPiece('w_queen', col, row);
      cell.appendChild(queenW);
    }

    if (col === '1' && (row === '5')) {
      const kingB = document.createElement('img');
      kingB.src = './icons/kingB.svg';
      logPiece('b_king', col, row);
      cell.appendChild(kingB);
    }
    if (col === '8' && (row === '5')) {
      const kingW = document.createElement('img');
      kingW.src = './icons/kingW.svg';
      logPiece('w_king', col, row);
      cell.appendChild(kingW);
    }
  });
}

setBoard();

grid.forEach((cell) => {
  const col = cell.getAttribute('col');
  const row = cell.getAttribute('row');

  cell.addEventListener('click', click);
});
let move = false;

let piece;
let position;
let c;
let r;

function click(e) {
  if (e.target.nodeName === 'IMG' && move == false) {
    piece = e.target;
    position = e.target.parentNode;

    p = c = position.getAttribute('col');
    r = position.getAttribute('row');

    position.style.filter = 'invert(30%)';
    move = true;
  } else if (e.target.nodeName === 'DIV' && move == true) {
    position.removeChild(piece);
    position.style.filter = 'invert(0%)';
    e.target.appendChild(piece);
    move = false;
  }
}

function release(e) {
  console.log(e);
}

// function updatePiece(piece, col, row){
//     pieces
// }

for (const i in pieces) {
  if (pieces[i].col == 2 && pieces[i].row == 2) {
    console.log(pieces[i]);
    console.log(pieces[i].piece);
    console.log(pieces.splice(i, 1));
  }
}
