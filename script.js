setBoard();

// ------------> DRAG AND DROP <--------------

let col; let row; let obj_id; let legal_moves;

const element = document.querySelectorAll('img');
const target = document.querySelectorAll('.grid');

element.forEach((i) => {
  i.addEventListener('dragstart', dragstart);
});

function dragstart(i) {
  obj_id = Number(i.target.id);
  legal_moves = LegalMoves(obj_id);
  targetedPiece = i.target;
}

target.forEach((e) => {
  e.addEventListener('dragover', (e) => e.preventDefault());
  e.addEventListener('drop', dragDrop);
});

function dragDrop(e) {
  e.preventDefault();
  let isTargetOccupied = false;
  // console.log(e.target);
  if (e.target.tagName === 'DIV') {
    col = Number(e.target.getAttribute('col'));
    row = Number(e.target.getAttribute('row'));
  } else if (e.target.tagName === 'IMG') {
    col = Number(e.target.parentNode.getAttribute('col'));
    row = Number(e.target.parentNode.getAttribute('row'));
    isTargetOccupied = true;
  }

  makeMove(e, isTargetOccupied);
}

// ------------------> DOM Move piece <---------------------

function makeMove(e, isTargetOccupied) {
  // const legal_moves = LegalMoves(obj_id)
  if (isMoveinLegalMoves(legal_moves, col, row)) { // Decided in legalMoves.js
    if (isTargetOccupied) {
      delete Pieces[e.target.id];
      e.target.parentNode.appendChild(targetedPiece);
      e.target.parentNode.removeChild(e.target.parentNode.firstElementChild);
    } else {
      e.target.appendChild(targetedPiece);
    }
    update(col, row, obj_id);
    legalMove = false;
  }

  AImakeMove();
}

// -----------------------------------------------

function update(col, row, obj_id) {
  Pieces[obj_id].row = row;
  Pieces[obj_id].col = col;
  Pieces[obj_id].moved = true;
}

// --------------> COMPUTER MAKES MOVE <----------------

function createBlack(name, value, col, row) {
  this.name = name;
  this.value = value;
  this.row = row;
  this.col = col;
  this.alive = true;
  this.moved = false;
}

// Error: multiple turns by same player
function getRandomPieceMakeRandomMove() {
  const blackPieces = {};

  for (var i in Pieces) {
    if (Pieces[i].colour === 'black') {
      blackPieces[i] = new createBlack(Pieces[i].name, Pieces[i].value, Pieces[i].col, Pieces[i].row);
    }
  }

  const lengthPieces = Object.keys(blackPieces).length;
  const randomPiece = Math.floor(Math.random() * lengthPieces);

  const obj_id = Object.keys(blackPieces)[randomPiece];
  console.log(Pieces[i].colour);
  moves = LegalMoves(obj_id);
  if (moves.length !== 0) {
    randomMove = moves[Math.floor(Math.random() * moves.length)];
    return { obj_id, randomMove };
  }
  getRandomPieceMakeRandomMove();
}

function AImakeMove() {
  let move = getRandomPieceMakeRandomMove();
  let x = 600;
  if (!move) {
    AImakeMove();
  } else {
    const currentPiece = document.getElementById(move.obj_id);
    obj_id = move.obj_id;
    console.log(Pieces[obj_id]);
    move = move.randomMove;
    const target = document.querySelector(`[col='${move[0]}'][row='${move[1]}']`);

    try {
      if (target.hasChildNodes()) {
        delete Pieces[target.firstElementChild.id];
        target.removeChild(target.firstElementChild);
        target.appendChild(currentPiece);
      } else {
        target.appendChild(currentPiece);
      }
      update(move[0], move[1], obj_id);
    } catch (e) {
      console.log(`For debugging... ${e}`);
      x = 100000;
    }

    // setTimeout(AImakeMove, x);
  }
}

// AImakeMove();
