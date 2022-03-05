function isLegalMove(obj_id, col, row) {
  const moves = [];
  const piece = Pieces[obj_id];
  if (piece.name === 'pawn') {
    return isLegalPawn(obj_id, col, row, moves);
  }
  if (piece.name === 'bishop') {
    return isLegalBishop(obj_id, col, row, moves);
  }
  if (piece.name === 'knight') {
    return isLegalKnight(obj_id, col, row, moves);
  }
  if (piece.name === 'rook') {
    return isLegalRook(obj_id, col, row, moves);
  }
  if (piece.name === 'queen') {
    return isLegalQueen(obj_id, col, row, moves);
  }
  if (piece.name === 'king') {
    return isLegalKing(obj_id, col, row, moves);
  }
}

// Determines if pawn can move diagonally and attack
function pawnAttack(obj_id, col, row) {
  const piece = Pieces[obj_id];

  for (const i in Pieces) {
    if (Pieces[i].colour !== piece.colour && Pieces[i].row === row && Pieces[i].col === col) {
      return true;
    }
  }
}

// Legal pawn moves
function isLegalPawn(obj_id, col, row) {
  const piece = Pieces[obj_id];
  const col0 = piece.col;
  const row0 = piece.row;

  if (piece.colour === 'white') {
    if (!pawnAttack(obj_id, col, row) && !(isPathBlocked(obj_id, col, row)) && (row0 - row) <= 2 && col === col0 && piece.moved === false) {
      return true;
    }
    if (!pawnAttack(obj_id, col, row) && !(isPathBlocked(obj_id, col, row)) && (row0 - row) === 1 && col === col0 && piece.moved === true) {
      return true;
    }
    if (pawnAttack(obj_id, col, row) && row0 - row === 1 && Math.abs(col0 - col) === 1) {
      return true;
    }
  }
  if (piece.colour === 'black') {
    if (!pawnAttack(obj_id, col, row) && !(isPathBlocked(obj_id, col, row)) && (row - row0) <= 2 && col == col0 && piece.moved === false) {
      return true;
    }
    if (!pawnAttack(obj_id, col, row) && !(isPathBlocked(obj_id, col, row)) && (row - row0) === 1 && col === col0 && piece.moved === true) {
      return true;
    }
    if (pawnAttack(obj_id, col, row) && row - row0 === 1 && Math.abs(col0 - col) === 1) {
      return true;
    }
  }
}

function isMoveinLegalMoves(legal_moves, col, row) {
  for (const i in legal_moves) {
    if (legal_moves[i][0] === col && legal_moves[i][1] === row) {
      return true;
    }
  }
}

function isLegalBishop(obj_id, col, row, moves) {
  const legal_moves = checkDiagonals(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves, maxSteps = 7);
  if (isMoveinLegalMoves(legal_moves, col, row)) return true;
}

function isLegalKnight(obj_id, col, row, moves) {
  const legal_moves = checkJumps(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves);
  if (isMoveinLegalMoves(legal_moves, col, row)) return true;
}

function isLegalRook(obj_id, col, row, moves) {
  const legal_moves = checkHorizontalsVerticals(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves, maxSteps = 7);
  if (isMoveinLegalMoves(legal_moves, col, row)) return true;
}

function isLegalQueen(obj_id, col, row, moves) {
  const legal_moves = checkHorizontalsVerticals(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves, maxSteps = 7);
  legal_moves.concat(checkDiagonals(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves, maxSteps = 7));
  if (isMoveinLegalMoves(legal_moves, col, row)) return true;
}

function isLegalKing(obj_id, col, row, moves) {
  const legal_moves = checkHorizontalsVerticals(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves, maxSteps = 1);
  legal_moves.concat(checkDiagonals(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves, maxSteps = 1));
  if (isMoveinLegalMoves(legal_moves, col, row)) return true;
}

// More compact way of doing this?
function checkJumps(obj_id, col, row, moves) {
  if (row - 1 >= 1 & col - 2 >= 1) {
    moves.push([col - 2, row - 1]);
  }
  if (row - 2 >= 1 & col - 1 >= 1) {
    moves.push([col - 1, row - 2]);
  }
  if (row + 1 <= 8 & col - 2 >= 1) {
    moves.push([col - 2, row + 1]);
  }
  if (row + 2 <= 8 & col - 1 >= 1) {
    moves.push([col - 1, row + 2]);
  }
  if (row + 1 <= 8 & col + 2 <= 8) {
    moves.push([col + 2, row + 1]);
  }
  if (row + 2 <= 8 & col + 1 <= 8) {
    moves.push([col + 1, row + 2]);
  }
  if (row - 1 >= 1 & col + 2 <= 8) {
    moves.push([col + 2, row - 1]);
  }
  if (row - 2 >= 1 & col + 1 <= 8) {
    moves.push([col + 1, row - 2]);
  }
  for (const i in Pieces) {
    for (const j in moves) {
      if (moves[j][0] === Pieces[i].col && moves[j][1] === Pieces[i].row && Pieces[i].colour === Pieces[obj_id].colour) {
        moves.splice(j, 1);
      }
    }
  }
  return moves;
}

function checkHorizontalsVerticals(obj_id, col, row, moves, maxSteps) {
  let A_blocked = false; // up
  let B_blocked = false; // down
  let C_blocked = false; // left
  let D_blocked = false; // right
  console.log(maxSteps);
  for (let i = 1; i <= maxSteps; i++) {
    if (!A_blocked) {
      if (row - i >= 1) {
        if (!(isPathBlocked(obj_id, col, row - i))) {
          moves.push([col, row - i]);
        } else if (isPathBlocked(obj_id, col, row - i) === 'enemy') {
          moves.push([col, row - i]);
          A_blocked = true;
        } else A_blocked = true;
      }
    }
    if (!B_blocked) {
      if (row + i <= 8) {
        if (!(isPathBlocked(obj_id, col, row + i))) {
          moves.push([col, row + i]);
        } else if (isPathBlocked(obj_id, col, row + i) === 'enemy') {
          moves.push([col, row + i]);
          B_blocked = true;
        } else B_blocked = true;
      }
    }
    if (!C_blocked) {
      if (col - i >= 1) {
        if (!(isPathBlocked(obj_id, col - i, row))) {
          moves.push([col - i, row]);
        } else if (isPathBlocked(obj_id, col - i, row) === 'enemy') {
          moves.push([col - i, row]);
          C_blocked = true;
        } else C_blocked = true;
      }
    }
    if (!D_blocked) {
      if (col + i <= 8) {
        if (!(isPathBlocked(obj_id, col + i, row))) {
          moves.push([col + i, row]);
        } else if (isPathBlocked(obj_id, col + i, row) === 'enemy') {
          moves.push([col + i, row]);
          D_blocked = true;
        } else D_blocked = true;
      }
    }
  }
  return moves;
}

function checkDiagonals(obj_id, col, row, moves, maxSteps) {
  // var moves = []
  let A_blocked = false; // top left diag
  let B_blocked = false; // bottom left diag
  let C_blocked = false; // top right diag
  let D_blocked = false; // bottom right diag

  for (let i = 1; i <= maxSteps; i++) {
    if (!A_blocked) {
      if (col - i >= 1 && row - i >= 1) {
        if (!(isPathBlocked(obj_id, col - i, row - i))) {
          moves.push([col - i, row - i]);
        } else if (isPathBlocked(obj_id, col - i, row - i) === 'enemy') {
          moves.push([col - i, row - i]);
          A_blocked = true;
        } else A_blocked = true;
      }
    }
    if (!B_blocked) {
      if (col - i >= 1 && row + i <= 8) {
        if (!(isPathBlocked(obj_id, col - i, row + i))) {
          moves.push([col - i, row + i]);
        } else if (isPathBlocked(obj_id, col - i, row + i) === 'enemy') {
          moves.push([col - i, row + i]);
          B_blocked = true;
        } else B_blocked = true;
      }
    }
	  if (!C_blocked) {
      if (col + i <= 8 && row - i >= 1) {
        if (!(isPathBlocked(obj_id, col + i, row - i))) {
          moves.push([col + i, row - i]);
        } else if (isPathBlocked(obj_id, col + i, row - i) === 'enemy') {
          moves.push([col + i, row - i]);
          C_blocked = true;
        } else C_blocked = true;
      }
    }
    if (!D_blocked) {
      if (col + i <= 8 && row + i <= 8) {
        if (!(isPathBlocked(obj_id, col + i, row + i))) {
          moves.push([col + i, row + i]);
        } else if (isPathBlocked(obj_id, col + i, row + i) === 'enemy') {
          moves.push([col + i, row + i]);
          D_blocked = true;
        } else D_blocked = true;
      }
    }
  }
  return moves;
}

function isPathBlocked(obj_id, col, row) {
  for (const i in Pieces) {
    if (col === Pieces[i].col && row === Pieces[i].row && Pieces[i].colour !== Pieces[obj_id].colour) {
      return 'enemy';
    }
    if (col === Pieces[i].col && row === Pieces[i].row) {
      return true;
    }
  }
}
