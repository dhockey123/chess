function LegalMoves(obj_id) {
  let moves = [];
  // console.log(obj_id)
  const piece = Pieces[obj_id];
  if (piece.name === 'pawn') {
    moves.concat(checkPawn(obj_id, moves));
  }
  if (piece.name === 'bishop') {
    moves.concat(checkDiagonals(obj_id, moves, maxSteps = 7));
  }
  if (piece.name === 'knight') {
    moves = checkJumps(obj_id, moves);
  }
  if (piece.name === 'rook') {
    moves = checkHorizontalsVerticals(obj_id, moves, maxSteps = 7);
  }
  if (piece.name === 'queen') {
    moves = checkHorizontalsVerticals(obj_id, moves, maxSteps = 7);
  	moves.concat(checkDiagonals(obj_id, moves, maxSteps = 7));
  }
  if (piece.name === 'king') {
    moves = checkHorizontalsVerticals(obj_id, moves, maxSteps = 1);
  	moves.concat(checkDiagonals(obj_id, moves, maxSteps = 1));
  }
  // console.log(moves)
  // for(var m in moves){
  // 	getValueofMove(obj_id, moves[m])
  // }
  return moves;
}

function checkPawn(obj_id, moves) {
  // Basic forward movement
  const { col } = Pieces[obj_id];
  const { row } = Pieces[obj_id];

  // Allows forward attacks and ensures pawn cannot jump pieces or attack along same column
  if (Pieces[obj_id].colour === 'white' && Pieces[obj_id].row !== 1) {
    if (Pieces[obj_id].moved === false && isPathBlocked(obj_id, col, row - 2) !== 'enemy' && !(isPathBlocked(obj_id, col, row - 2))
		  	&& isPathBlocked(obj_id, col, row - 1) !== 'enemy' && !(isPathBlocked(obj_id, col, row - 1))) {
      moves.push([Pieces[obj_id].col, Pieces[obj_id].row - 2]);
      moves.push([Pieces[obj_id].col, Pieces[obj_id].row - 1]);
    } else if (Pieces[obj_id].moved === true && isPathBlocked(obj_id, col, row - 1) !== 'enemy' && !(isPathBlocked(obj_id, col, row - 1))) {
      moves.push([Pieces[obj_id].col, Pieces[obj_id].row - 1]);
    }
  } else if (Pieces[obj_id].colour === 'black' && Pieces[obj_id].row !== 8) {
    if (Pieces[obj_id].moved === false && isPathBlocked(obj_id, col, row + 2) !== 'enemy' && !(isPathBlocked(obj_id, col, row + 2))
		  	&& isPathBlocked(obj_id, col, row + 1) !== 'enemy' && !(isPathBlocked(obj_id, col, row + 1))) {
      moves.push([Pieces[obj_id].col, Pieces[obj_id].row + 2]);
      moves.push([Pieces[obj_id].col, Pieces[obj_id].row + 1]);
    } else if (Pieces[obj_id].moved === true && isPathBlocked(obj_id, col, row + 1) !== 'enemy' && !(isPathBlocked(obj_id, col, row + 1))) {
      moves.push([Pieces[obj_id].col, Pieces[obj_id].row + 1]);
    }
  }
  // Ensure pawn cannot attack pieces in same column
  for (var i in Pieces) {
    for (const j in moves) {
      if (Pieces[i].col === moves[j][0] && Pieces[i].row === moves[j][1] && Pieces[i] !== Pieces[obj_id]) {
        moves.splice(j, 1);
      }
    }
  }

  // Diagonal attacks
  if (Pieces[obj_id].colour === 'white') {
    for (var i in Pieces) {
      if (Pieces[i].colour === 'black') {
        if (Pieces[obj_id].col + 1 === Pieces[i].col && Pieces[obj_id].row - 1 === Pieces[i].row) {
          moves.push([Pieces[obj_id].col + 1, Pieces[obj_id].row - 1]);
        }
        if (Pieces[obj_id].col - 1 === Pieces[i].col && Pieces[obj_id].row - 1 === Pieces[i].row) {
          moves.push([Pieces[obj_id].col - 1, Pieces[obj_id].row - 1]);
        }
      }
    }
  }
  if (Pieces[obj_id].colour === 'black') {
    for (var i in Pieces) {
      if (Pieces[i].colour === 'white') {
        if (Pieces[obj_id].col + 1 === Pieces[i].col && Pieces[obj_id].row + 1 === Pieces[i].row) {
          moves.push([Pieces[obj_id].col + 1, Pieces[obj_id].row + 1]);
        }
        if (Pieces[obj_id].col - 1 === Pieces[i].col && Pieces[obj_id].row + 1 === Pieces[i].row) {
          moves.push([Pieces[obj_id].col - 1, Pieces[obj_id].row + 1]);
        }
      }
    }
  }
  return moves[0];
}




// More compact way of doing this?
function checkJumps(obj_id, moves) {
  const { col } = Pieces[obj_id];
  const { row } = Pieces[obj_id];

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

function checkHorizontalsVerticals(obj_id, moves, maxSteps) {
  const { col } = Pieces[obj_id];
  const { row } = Pieces[obj_id];

  let A_blocked = false; // up
  let B_blocked = false; // down
  let C_blocked = false; // left
  let D_blocked = false; // right

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

function checkDiagonals(obj_id, moves, maxSteps) {
  const { col } = Pieces[obj_id];
  const { row } = Pieces[obj_id];

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


function isMoveinLegalMoves(legal_moves, col, row) {
  for (const i in legal_moves) {
    if (legal_moves[i][0] === col && legal_moves[i][1] === row) {
      return true;
    }
  }
}