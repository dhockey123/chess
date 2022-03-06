setBoard();

// ------------> DRAG AND DROP <--------------

let col; let row; let obj_id;



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
	console.log(e.target)
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

// -----------------------------------------------


function update(col, row, obj_id) {
  Pieces[obj_id].row = row;
  Pieces[obj_id].col = col;
  Pieces[obj_id].moved = true;
}


// --------------> COMPUTER MAKES MOVE <----------------


var isWhite = true;


// Error: multiple turns by same player
function getRandomPieceMakeRandomMove(){
	var lengthPieces  = Object.keys(Pieces).length;
	var randomPiece = Math.floor(Math.random()*lengthPieces);
	
	let obj_id = Object.keys(Pieces)[randomPiece]

	if(Pieces[obj_id].colour === "white" && isWhite === false){
		getRandomPieceMakeRandomMove()
	}
	else if (Pieces[obj_id].colour === "black" && isWhite === true){
		getRandomPieceMakeRandomMove()
	}
	else if(Pieces[obj_id].colour === "white" && isWhite === true){
		
		moves = AILegalMoves(obj_id)
		if(moves.length === 0){
			getRandomPieceMakeRandomMove()
		}
		else{
			isWhite = false;
			// console.log(Pieces[obj_id].colour)
			randomMove = moves[Math.floor(Math.random()*moves.length)]
			return {obj_id, randomMove}
		}
	}
	else if(Pieces[obj_id].colour === "black" && isWhite === false){
		
		moves = AILegalMoves(obj_id)
		if(moves.length === 0){
			getRandomPieceMakeRandomMove()
		}
		else{
			isWhite = true;
			// console.log(Pieces[obj_id].colour)
			randomMove = moves[Math.floor(Math.random()*moves.length)]
			return {obj_id, randomMove}
		}
	}
}


function AILegalMoves(obj_id) {
  const moves = [];
  const piece = Pieces[obj_id];
	// console.log(piece.name)
	
  if (piece.name === 'pawn') {
		moves.concat(checkPawn(obj_id, moves))
  }
  if (piece.name === 'bishop') {
    moves.concat(checkDiagonals(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves, maxSteps = 7))
  }
  if (piece.name === 'knight') {
		moves.concat(checkJumps(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves))
  }
  if (piece.name === 'rook') {
    moves.concat(checkHorizontalsVerticals(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves, maxSteps = 7))
  }
  if (piece.name === 'queen') {
    moves.concat(checkDiagonals(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves, maxSteps = 7))
		moves.concat(checkHorizontalsVerticals(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves, maxSteps = 7))
  }
  if (piece.name === 'king') {
    moves.concat(checkDiagonals(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves, maxSteps = 1))
		moves.concat(checkHorizontalsVerticals(obj_id, Pieces[obj_id].col, Pieces[obj_id].row, moves, maxSteps = 1))
  }

	return moves
}

function AImakeMove(){
	var move = getRandomPieceMakeRandomMove();
	var x = 600;
	if(!move){
		AImakeMove();
	}
	else{
		var currentPiece = document.getElementById(move.obj_id)
		obj_id = move.obj_id

		move = move.randomMove
		var target = document.querySelector(`[col='${move[0]}'][row='${move[1]}']`)

		try{
			if(target.hasChildNodes()){

				delete Pieces[target.firstElementChild.id]
				target.removeChild(target.firstElementChild)
				target.appendChild(currentPiece)

			}
			else{
				target.appendChild(currentPiece)
			}
			update(move[0], move[1], obj_id)
		}
		catch(e){
			console.log("For debugging... " + e)
			x = 100000;
		}
		
		setTimeout(AImakeMove, x)
	}


}

AImakeMove()