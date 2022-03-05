setBoard();

// ------------> DRAG AND DROP <--------------

let col; let row; let
  obj_id;

let legalMove = false;
const attackWithPawn = false;

const element = document.querySelectorAll('img');
const target = document.querySelectorAll('.grid');

element.forEach((i) => {
  i.addEventListener('dragstart', dragstart);
});

function dragstart(i) {
  obj_id = Number(i.target.id);
  targetedPiece = i.target;
}

target.forEach((e) => {
  e.addEventListener('dragover', (e) => e.preventDefault());
  e.addEventListener('drop', dragDrop);
});

function dragDrop(e) {
  e.preventDefault();
  let isTargetOccupied = false;

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
  if (isLegalMove(obj_id, col, row)) { // Decided in legalMoves.js
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
}

// --------------> Rules for moving pieces <----------------

function update(col, row, obj_id) {
  Pieces[obj_id].row = row;
  Pieces[obj_id].col = col;
  Pieces[obj_id].moved = true;
}
