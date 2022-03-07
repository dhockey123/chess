setBoard();

// ----------------------> DRAG AND DROP <--------------------------

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

// ----------------------> DOM Move piece <---------------------------

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

// -------------------------------------------------------------------

function update(col, row, obj_id) {
  Pieces[obj_id].row = row;
  Pieces[obj_id].col = col;
  Pieces[obj_id].moved = true;
}

// ------------------> COMPUTER GENERATED MOVES <---------------------

function createBlack(name, value, col, row) {
  this.name = name;
  this.value = value;
  this.row = row;
  this.col = col;
  this.alive = true;
  this.moved = false;
}

function createBlackPieces() {
  const blackPieces = {};
  for (const i in Pieces) {
    if (Pieces[i].colour === 'black') {
      blackPieces[i] = new createBlack(Pieces[i].name, Pieces[i].value, Pieces[i].col, Pieces[i].row);
    }
  }
  return blackPieces;
}

function findBestMove(pieces) {
  let bestmove = 0;
  let highestValue = 0;
  let obj_id = 0;

  for (const i in pieces) {
    const moves = LegalMoves(i);
    if (moves.length !== 0) {
      for (const m in moves) {
        value = getValueofMove(i, moves[m]);
        if (value > highestValue) {
          bestmove = moves[m];
          highestValue = value;
          obj_id = i;
        }
      }
    }
  }
  return [obj_id, bestmove];
}

function getComputerMove() {
  const pieces = createBlackPieces();
  id_move = findBestMove(pieces);

  let obj_id = id_move[0];
  let bestmove = id_move[1];

  if (bestmove === 0) {
    const id_move = randomMove(pieces);
    obj_id = id_move[0];
    bestmove = id_move[1];
    return { obj_id, bestmove };
  }

  return { obj_id, bestmove };
}

function randomMove(blackPieces) {
  const lengthPieces = Object.keys(blackPieces).length;
  const randomPiece = Math.floor(Math.random() * lengthPieces);
  const obj_id = Object.keys(blackPieces)[randomPiece];
  const moves = LegalMoves(obj_id);

  if (moves.length !== 0) {
    const random = Math.floor(Math.random() * moves.length);
    console.log(`random: ${random}length: ${moves.length}`);
    console.log(moves[random]);
    console.log(blackPieces[obj_id].name);
    return [obj_id, moves[random]];
  }
  return randomMove(blackPieces);
}

function AImakeMove() {
  let move = getComputerMove();
  obj_id = move.obj_id;

  const currentPiece = document.getElementById(move.obj_id);
  move = move.bestmove;
  const target = document.querySelector(`[col='${move[0]}'][row='${move[1]}']`);

  if (target.hasChildNodes()) {
    delete Pieces[target.firstElementChild.id];
    target.removeChild(target.firstElementChild);
    target.appendChild(currentPiece);
  } else target.appendChild(currentPiece);

  update(move[0], move[1], obj_id);
}

function getValueofMove(obj_id, move) {
  for (const i in Pieces) {
    if (Pieces[i].col === move[0] && Pieces[i].row === move[1] && Pieces[obj_id].colour !== Pieces[i].colour) {
      return Pieces[i].value;
    }
  }
}
