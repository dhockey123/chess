function uniqid() {
  return Math.round(Math.random() * 1e6);
}

const Pieces = {};

const grid = document.querySelectorAll('.grid')

function createPiece(name, colour, value, col, row) {
  this.name = name;
  this.colour = colour;
  this.value = value;
  this.col = col;
  this.row = row;
  this.alive = true;
	this.moved = false;
}

function setBoard() {
  grid.forEach((cell) => {
    const row = Number(cell.getAttribute('row'))
    const col = Number(cell.getAttribute('col'));
    let id = uniqid();

    if ((row % 2 === 0) && (col % 2 === 1)) {
      cell.style.background = '#769656';
    } else if ((row % 2 === 1) && (col % 2 === 0)) {
      cell.style.background = '#769656';
    } else cell.style.background = '#eeeed2';

    if ((row === 7)) {
      const pawnW = document.createElement('img');
      pawnW.src = './icons/pawnW.svg';
      pawnW.setAttribute('id', id)
			Pieces[id] = new createPiece('pawn', 'white', 1, col, row)
      cell.appendChild(pawnW);
    }
    if ((row === 2)) {
      const pawnB = document.createElement('img');
      pawnB.src = './icons/pawnB.svg';
			pawnB.setAttribute('id', id)
			Pieces[id] = new createPiece('pawn', 'black', 1, col, row)
      cell.appendChild(pawnB);
    }

    if (row === 1 && (col === 1 || col === 8)) {
      const rookB = document.createElement('img');
      rookB.src = './icons/rookB.svg';
			rookB.setAttribute('id', id)
			Pieces[id] = new createPiece('rook', 'black', 5, col, row)

      cell.appendChild(rookB);
    }
    if (row === 8 && (col === 1 || col === 8)) {
      const rookW = document.createElement('img');
      rookW.src = './icons/rookW.svg';
			rookW.setAttribute('id', id)
			Pieces[id] = new createPiece('rook', 'white', 5, col, row)

      cell.appendChild(rookW);
    }

    if (row === 1 && (col === 2 || col === 7)) {
      const knightB = document.createElement('img');
      knightB.src = './icons/knightB.svg';
			knightB.setAttribute('id', id)
			Pieces[id] = new createPiece('knight', 'black', 3, col, row)

      cell.appendChild(knightB);
    }
    if (row === 8 && (col === 2 || col === 7)) {
      const knightW = document.createElement('img');
      knightW.src = './icons/knightW.svg';
			knightW.setAttribute('id', id)
			Pieces[id] = new createPiece('knight', 'white', 3, col, row)

      cell.appendChild(knightW);
    }

    if (row === 1 && (col === 3 || col === 6)) {
      const bishopB = document.createElement('img');
      bishopB.src = './icons/bishopB.svg';
			bishopB.setAttribute('id', id)
			Pieces[id] = new createPiece('bishop', 'black', 3, col, row)
      cell.appendChild(bishopB);
    }
    if (row === 8 && (col === 3 || col === 6)) {
      const bishopW = document.createElement('img');
      bishopW.src = './icons/bishopW.svg';
			bishopW.setAttribute('id', id)
			Pieces[id] = new createPiece('bishop', 'white', 3, col, row)
      
      cell.appendChild(bishopW);
    }

    if (row === 1 && (col === 4)) {
      const queenB = document.createElement('img');
      queenB.src = './icons/queenB.svg';
			queenB.setAttribute('id', id)
      Pieces[id] = new createPiece('queen', 'black', 9, col, row)
      cell.appendChild(queenB);
    }
    if (row === 8 && (col === 4)) {
      const queenW = document.createElement('img');
      queenW.src = './icons/queenW.svg';
			queenW.setAttribute('id', id)
      Pieces[id] = new createPiece('queen', 'white', 9, col, row)
      cell.appendChild(queenW);
    }

    if (row === 1 && (col === 5)) {
      const kingB = document.createElement('img');
      kingB.src = './icons/kingB.svg';
			kingB.setAttribute('id', id)
      Pieces[id] = new createPiece('king', 'black', 1000, col, row)
      cell.appendChild(kingB);
    }
    if (row === 8 && (col === 5)) {
      const kingW = document.createElement('img');
      kingW.src = './icons/kingW.svg';
			kingW.setAttribute('id', id)
      Pieces[id] = new createPiece('king', 'white', 1000, col, row)
      cell.appendChild(kingW);
    }
  });
}