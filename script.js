
setBoard();

// ------------> DRAG AND DROP <--------------

var col, row, obj_id;

var legalMove = false;
var attackWithPawn = false;

const element = document.querySelectorAll('img')
const target = document.querySelectorAll('.grid')

element.forEach(i => {
	i.addEventListener('dragstart', dragstart)
})

function dragstart(i){
	obj_id = Number(i.target.id)
	targetedPiece = i.target
}

target.forEach(e => {
	e.addEventListener('dragover', e => e.preventDefault())
	e.addEventListener('drop', dragDrop)
})

function dragDrop(e){
	e.preventDefault();
	let isTargetOccupied = false;
	
	if(e.target.tagName === 'DIV'){
		col = Number(e.target.getAttribute('col'))
		row = Number(e.target.getAttribute('row'))
	}
	else if(e.target.tagName === 'IMG'){
		col = Number(e.target.parentNode.getAttribute('col'))
		row = Number(e.target.parentNode.getAttribute('row'))
		isTargetOccupied = true;
	} 	

	makeMove(e, isTargetOccupied)
}

// ------------------> Move piece <---------------------

function makeMove(e, isTargetOccupied){
	if(isLegalMove(obj_id, col, row)){
		if(isTargetOccupied){
			delete Pieces[e.target.id]
			e.target.parentNode.appendChild(targetedPiece)
			e.target.parentNode.removeChild(e.target.parentNode.firstElementChild)
		}
		else{
			e.target.appendChild(targetedPiece);
		}
		update(col, row, obj_id)
		legalMove = false;
	}

}

// --------------> Rules for moving pieces <----------------

function isLegalMove(obj_id, col, row){
	var piece = Pieces[obj_id];
	if(piece.name === "pawn"){
		return isLegalPawn(obj_id, col, row)
	}
}

// Determines if pawn can move diagonally and attack
function pawnAttack(obj_id, col, row){
	var piece = Pieces[obj_id]

	for(var i in Pieces){
		if(Pieces[i].colour !== piece.colour && Pieces[i].row === row && Pieces[i].col === col){
			return true
		}
	}
}

// Legal pawn moves
function isLegalPawn(obj_id, col, row){
	let piece = Pieces[obj_id]
	let col0 = piece.col
	let row0 = piece.row
	
	if(piece.colour === "white"){
		if(!pawnAttack(obj_id, col, row) && (row0-row)<=2 && col === col0 && piece.moved === false){
			return true;
		} 
		else if(!pawnAttack(obj_id, col, row) && (row0-row) === 1 && col === col0 && piece.moved === true){
			return true;
		}
		else if(pawnAttack(obj_id, col, row) && row0-row === 1 && Math.abs(col0-col) === 1 ){
			return true;
		}
	}
	if(piece.colour === "black"){	
		if(!pawnAttack(obj_id, col, row) && (row-row0)<=2 && col == col0 && piece.moved === false ){
			return true;
		} 
		else if(!pawnAttack(obj_id, col, row) && (row-row0) === 1 && col === col0 && piece.moved === true){
			return true;
		}
		else if(pawnAttack(obj_id, col, row) && row-row0 === 1 && Math.abs(col0-col) === 1 ){
			return true;
		}
	}
}

// Updates piece coordinates 
function update(col, row, obj_id){
	Pieces[obj_id].row = row;
	Pieces[obj_id].col = col;
	Pieces[obj_id].moved = true;
}


