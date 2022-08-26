let body = document.querySelector("body");
let cells = new Array 
let pieces = new Array
let shows = new Array
let takenPieces = [[],[]]



class Cell{
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }
    makeCell() {
        let cell = document.createElement("div");
        cell.className = "cell";
        if (this.row % 2 == 0) {
            if (this.col % 2 === 0) {
                cell.style.backgroundColor = "rgb(129, 125, 125)"
            }

        }
        else if (this.col % 2 === 1) {
                cell.style.backgroundColor = "rgb(129, 125, 125)"
        }
        return cell
    }
}
    
class Board {
    constructor() {
        this.createBoard();
    }
    createBoard() {
        let board = document.createElement("div");
        board.className = "board";
        for (let i = 0; i < 2; i++) {
            let film = document.createElement("div");
            film.className = "film";
            let takenholder = document.createElement("div");
            takenholder.className = "takenholder";
            body.append(takenholder);
            takenholder.append(film)
            if (i == 0) {
                body.append(board);
            }
        }
        for (let i = 0; i < 8; i++){
            let row = document.createElement("div");
            row.className = "row";
            board.append(row);
            cells.push([])
            for (let j = 0; j < 8; j++){
                let cell = new Cell(i, j).makeCell();
                cells[i].push(cell)
                if (i === 0) {
                    if (j === 0 || j === 7) {
                        let piece = new Piece("black", "rook", i, j).makePiece();
                    cell.append(piece);
                    pieces.push(piece);}
                    if (j === 1 || j === 6) {
                        let piece = new Piece("black", "knight", i, j).makePiece();
                    cell.append(piece);
                    pieces.push(piece);}
                    if (j === 2 || j === 5) {
                        let piece = new Piece("black", "bishop", i, j).makePiece();
                    cell.append(piece);
                    pieces.push(piece);}
                }
                
                if (i === 1) {
                    let piece = new Piece("black", "pawn", i, j).makePiece();
                    cell.append(piece);
                    pieces.push(piece);
                }
                if (i === 6) {
                    let piece = new Piece("red", "pawn", i, j).makePiece();
                    cell.append(piece);
                    pieces.push(piece);
                    
                }
                if (i === 7) {
                    if (j === 0 || j === 7) {
                    let piece = new Piece("red", "rook", i, j).makePiece();
                    cell.append(piece);
                    pieces.push(piece);}
                    if (j === 1 || j === 6) {
                        let piece = new Piece("red", "knight", i, j).makePiece();
                    cell.append(piece);
                    pieces.push(piece);}
                    if (j === 2 || j === 5) {
                        let piece = new Piece("red", "bishop", i, j).makePiece();
                    cell.append(piece);
                    pieces.push(piece);}
                }
                row.append(cell)
            }           
        }        
       
}}


class Piece {
    constructor(color, type, row, col) {
        this.color = color;
        this.type = type;
        this.row = row;
        this.col = col;
        this.target = getTarget(this.type, this.row, this.col, this.color);
        this.trow = this.target[0][0];
        this.tcol = this.target[0][1];
        if (this.type === "rook" || this.type === "bishop") {
            this.trow = this.target[0];
            this.tcol = this.target[1];
        }
        this.targets = this.target[1]
        
        
    }
    makePiece() {
        let piece = document.createElement("img");
        
            piece.src = `${this.color}_${this.type}.svg`;
        piece.classList.add(this.color, this.type, "piece");
        piece.style.color = this.color;
        move(piece, this.trow, this.tcol, this.color, this.targets, this.type);
        return piece;
    }
    
}

function getTarget(type, row, col, color) {
    if (type === "pawn") {
        
        if (color === "black") {
           if (col === 0 ) {
            return [[row + 1, col], [[row + 1, col + 1]]]
           }
           if (col === 7) {
            return [[row + 1, col], [[row + 1, col - 1]]]
           }
            return [[row + 1, col], [[row + 1, col + 1], [row + 1, col - 1]]]
        }
        else {

            return [[row - 1, col], [[row - 1, col + 1], [row - 1, col - 1]]]
    }}
    else if (type === "rook") {
        console.log([row, col])
        return [row, col];
    }
    else if (type === "knight") {
        return [[row, col], [[row + 1, col + 2], [row + 1, col - 2], [row - 1, col + 2], [row - 1, col - 2], [row + 2, col + 1], [row + 2, col - 1], [row - 2, col + 1], [row - 2, col - 1]]];
    }
    else if (type === "bishop") {
        return [row, col];
    }
    else if (type === "queen") {
        return [row, col];
    }
    else if (type === "king") {
        return [row, col];
    }
}

function move (piece, trow, tcol, color, targets, type) {
    let moveCount = 0;
    let moveRow = trow
    let moveCol = tcol;
    let moveTargets = targets;
    piece.addEventListener("click", function c (e) {
        if (piece.style.transform === "scale(1.15)"){
            removeShow();
            removeFocus();
            return
        }
        removeShow();
        removeFocus();
        
        targetLogic(piece, moveRow, moveCol, color, moveTargets, moveCount, type);
        shows.forEach(function (show) {
            show.addEventListener("click", function (e) {
                moveCount++;
                removeFocus();
                removeShow();
                let moveArray = moveLogic(piece, moveTargets, show, type);
                moveRow = moveArray[0];
                moveCol = moveArray[1];
                moveTargets = moveArray[2];
                if (shows === []) {
                    piece.style.transform === '';
                }
                addTaken()
            })})})}
            
function targetLogic(piece, moveRow, moveCol, color, moveTargets, moveCount, type) {
    for (let i = 0; i < moveTargets.length; i++) {
        for (let j = 0; j < 2; j++) {
        if (moveTargets[i][j] < 0 || moveTargets[i][j] > 7) {
            moveTargets.splice(moveTargets.indexOf(moveTargets[i]), 1);
            break;
    }}}

    if (type === "pawn") {
            if(cells[moveRow][moveCol].children.length === 0){
                piece.style.transform = "scale(1.15)";
                    let show = createShow()
                    show.id = `${moveRow}${moveCol}`
                    cells[show.id[0]][show.id[1]].append(show);
                    setTimeout(function () {show.classList.add("transition");}, 10)
                    if (moveRow !== 7 && moveRow !== 0) {
                        if (color === "black") {
                            if (cells[moveRow + 1][moveCol].children.length === 0) {
                                if (moveCount === 0)   {
                                    let show = createShow()
                                    show.id = `${moveRow + 1}${moveCol}`
                                    cells[show.id[0]][show.id[1]].append(show);
                                    setTimeout(function () {show.classList.add("transition");}, 10)}}
                        }
                        else if (color === "red") {
                            if (cells[moveRow - 1][moveCol].children.length === 0) {
                                if (moveCount === 0)   {
                                    let show = createShow()
                                    show.id = `${moveRow - 1}${moveCol}`
                                    cells[show.id[0]][show.id[1]].append(show);
                                    setTimeout(function () {show.classList.add("transition");}, 10)}}
            }}}
        for (let i = 0; i < moveTargets.length; i++) {
            if (cells[moveTargets[i][0]][moveTargets[i][1]].children.length > 0) {
                if (!cells[moveTargets[i][0]][moveTargets[i][1]].children[0].classList.contains(color)) {
                    piece.style.transform = "scale(1.15)";
                    let show = createShow()
                    cells[moveTargets[i][0]][moveTargets[i][1]].append(show);
                    setTimeout(function () {show.classList.add("transition");}, 10);
                    show.id = `${moveTargets[i][0]}${moveTargets[i][1]}`
                    console.log(show)
                }
                
            }
        }

    }
    else if (type === "rook") {
        for(let i = moveRow + 1; i < 8; i++) {
            console.log(i)
            if (cells[i][moveCol].children.length === 0 || !cells[i][moveCol].children[0].classList.contains(color)) {
                let show = createShow()
                show.id = `${i}${moveCol}`
                cells[show.id[0]][show.id[1]].append(show);
                setTimeout(function () {show.classList.add("transition");}, 10)
                if (cells[i][moveCol].children.length > 1) {
                    break;}
            }
            else {
                break;
            }
        }
        for(let i = moveRow - 1; i >= 0; i--) {
            console.log(i)
            if (cells[i][moveCol].children.length === 0 || !cells[i][moveCol].children[0].classList.contains(color)) {
                let show = createShow()
                show.id = `${i}${moveCol}`
                cells[show.id[0]][show.id[1]].append(show);
                setTimeout(function () {show.classList.add("transition");}, 10)
                if (cells[i][moveCol].children.length > 1) {
                    break;}
            }
            else {
                break;
            }
        }
        for (let i = moveCol + 1; i < 8; i++){
            if (cells[moveRow][i].children.length === 0 || !cells[moveRow][i].children[0].classList.contains(color)) {
                piece.style.transform = "scale(1.15)";
                let show = createShow()
                show.id = `${moveRow}${i}`
                cells[show.id[0]][show.id[1]].append(show);
                setTimeout(function () {show.classList.add("transition");}, 10)
                if (cells[moveRow][i].children.length > 1) {
                    break;}
                

            }
            else {
                break;
            }
            
        }
        for (let i = moveCol - 1; i >= 0; i--){
            if (i === -1){
                i = 0;
            }
            if (cells[moveRow][i].children.length === 0 || !cells[moveRow][i].children[0].classList.contains(color)){
                piece.style.transform = "scale(1.15)";
                let show = createShow()
                show.id = `${moveRow}${i}`
                cells[show.id[0]][show.id[1]].append(show);
                setTimeout(function () {show.classList.add("transition");}, 10)
                if (cells[moveRow][i].children.length > 1) {
                    break;}

            }
            else {
                break;
            }
        }
}
    else if (type === "knight") {
    for (let i = 0; i < moveTargets.length; i++) {
        for (let j = 0; j < 2; j++) {
        if (moveTargets[i][j] < 0 || moveTargets[i][j] > 7) {
            moveTargets.splice(moveTargets.indexOf(moveTargets[i]), 1);
            break;
        }
        
    }}
        for (let i = 0; i < moveTargets.length; i++) {
            if (cells[moveTargets[i][0]][moveTargets[i][1]].children.length === 0 || !cells[moveTargets[i][0]][moveTargets[i][1]].children[0].classList.contains(color)) {
                    piece.style.transform = "scale(1.15)";
                    let show = createShow()
                    cells[moveTargets[i][0]][moveTargets[i][1]].append(show);
                    setTimeout(function () {show.classList.add("transition");}, 10)
                    show.id = `${moveTargets[i][0]}${moveTargets[i][1]}`
                    console.log(show)
                
        }

        }
        
    }
    else if (type === "bishop") {
        for (let i = moveRow + 1; i < 8; i++) {
              console.log(cells[i][i + 2].children)
            if (cells[i][i+2].children.length === 0 || !cells[i][i+2].children[0].classList.contains(color)) {
                let show = createShow()
                show.id = `${i}${i + 2}`
                cells[show.id[0]][show.id[1]].append(show);
                setTimeout(function () {show.classList.add("transition");}, 10)
                if (cells[i][i + 2].children.length > 1) {
                    break;}
                }
            else {
                break;


            }}}
        
}

function moveLogic(piece, moveTargets, show, type) {
    removeShow();
    let targets = moveTargets
    let moveRow = parseInt(show.id[0]);
    let moveCol = parseInt(show.id[1]);
    if (cells[moveRow][moveCol].children.length > 0) {
        cells[moveRow][moveCol].children[0].style.color === "red" ? takenPieces[0].push(cells[moveRow][moveCol].children[0]) : takenPieces[1].push(cells[moveRow][moveCol].children[0])
        cells[moveRow][moveCol].children[0].remove()
    }
    cells[moveRow][moveCol].append(piece);
    console.log(moveRow, moveCol)
    if (type === "pawn") {
        piece.style.color === "black"? moveRow++ : moveRow--;
        targets = [[moveRow, moveCol +1], [moveRow, moveCol - 1]]
        return [moveRow, moveCol, targets]}

    else if (type === "rook") {
        return [moveRow, moveCol, targets];
    }
    else if (type === "knight") {
        let targets = getTarget(type, moveRow, moveCol)
        console.log(targets)
        return [targets[0][0], targets[0][1], targets[1]];
    }
    else if (type === "bishop") {
        console.log(moveRow, moveCol, targets)
        return [moveRow, moveCol, targets];
    }

    
        
    
}


function createShow(){
    let show = document.createElement("div");
    show.className = "show";
    shows.push(show);
    return show
}
    
function removeShow() {
    for (let i = 0; i < shows.length; i++) {
        shows[i].remove();
    }
    shows = [];
}

    
function addTaken() {
    let taken = document.querySelectorAll('.takenholder')
    for (let i = 0; i < takenPieces.length; i++) {
        for (let j = 0; j < takenPieces[i].length; j++) {
            takenPieces[i][j].style.transform = "scale(0.8)";
            takenPieces[i][j].style.marginRight = "-40px";
            
            if (i === 0) {
                taken[0].append(takenPieces[i][j])
            }
            else {
                taken[1].append(takenPieces[i][j])
            }
        }
        }
 }



function removeFocus() {
    for (let j = 0; j < pieces.length; j++) {
        if (pieces[j].style.transform != "scale(0.8)") {
        pieces[j].style.transform = "";
    }
}}


let board = new Board();
