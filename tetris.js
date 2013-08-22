
//lengths
var GAME_AREA_HEIGHT = 640;
var GAME_AREA_WIDTH = 400;
var BLOCK_MEDIAN = 20;
var BLOCK_WIDTH = BLOCK_MEDIAN * 2;
var NUM_COLUMNS = GAME_AREA_WIDTH / BLOCK_WIDTH;
var NUM_ROWS = GAME_AREA_HEIGHT / BLOCK_WIDTH;
var LINE_WIDTH = 1;

//colors
var BLUE 	= '#003DF5';
var GREEN	= '#33FF66';
var RED 	= '#FF3366';
var YELLOW 	= '#CCFF29';
var ORANGE 	= '#FFCC33';
var CYAN 	= '#33FFCC';
var PURPLE 	= '#CC33FF';
var PINK 	= '#FF33FF';
var BROWN	= '#B88A00';
var WHITE	= '#FFFFFF';
var BLACK	= '#000000';

var square1 = new Square(20, 20, BLUE);
var square2 = new Square(60, 20, RED);
var oblock	= new OBlock(240,40);
var tblock	= new TBlock(100,60);
var iblock	= new IBlock(100,60);
var jblock 	= new JBlock(100,60);
var lblock 	= new LBlock(100,60);
var sblock	= new SBlock(100,60);
var zblock	= new ZBlock(100,60);

function loadGame(){
	var x = document.getElementById('canvas');
	canvas = x.getContext('2d');

	//square1.draw();
	//square2.draw();
	//oblock.draw();
	//tblock.draw();
	//iblock.draw();
	//jblock.draw();
	//lblock.draw();
	//sblock.draw();
	zblock.draw();

	function loop()
	{
		square1.clear();
		square1.y = square1.y + BLOCK_WIDTH;
		square1.draw();
	}
	
	setInterval(loop, 1000);
}

/*
	Square
*/
function Square(x, y, color) {
	this.x = x;
	this.y = y;
	this.color = color;
}

Square.prototype.moveUp = function() {
	this.y = this.y - BLOCK_WIDTH;
}

Square.prototype.moveDown = function() {
	this.y = this.y + BLOCK_WIDTH;
}

Square.prototype.moveLeft = function() {
	this.x = this.x - BLOCK_WIDTH;
}

Square.prototype.moveRight = function() {
	this.x = this.x + BLOCK_WIDTH;
}

Square.prototype.rotate = function() {
	//rotate clockwise
	old_x = this.x;
	old_y = this.y;
	this.x = -old_y;
	this.y = old_x;
}

Square.prototype.rotateCCW = function() {
	//rotate counter-clockwise
	old_x = this.x;
	old_y = this.y;
	this.x = old_y;
	this.y = -old_x;
}

Square.prototype.clear = function() {
	canvas.clearRect(this.x-BLOCK_MEDIAN-1,this.y-BLOCK_MEDIAN-1, BLOCK_WIDTH+2, BLOCK_WIDTH+2);
}

Square.prototype.draw = function() {
	canvas.fillStyle = this.color;
	canvas.strokeStyle = BLACK;
	canvas.lineWidth = LINE_WIDTH;
	
	canvas.strokeRect(this.x-BLOCK_MEDIAN,this.y-BLOCK_MEDIAN, BLOCK_WIDTH, BLOCK_WIDTH);
	
	/* same issue
	canvas.beginPath();
	canvas.moveTo(this.x-BLOCK_MEDIAN, this.y-BLOCK_MEDIAN);
	canvas.lineTo(this.x+BLOCK_MEDIAN, this.y-BLOCK_MEDIAN);
	canvas.lineTo(this.x+BLOCK_MEDIAN, this.y+BLOCK_MEDIAN);
	canvas.lineTo(this.x-BLOCK_MEDIAN, this.y+BLOCK_MEDIAN);
	canvas.closePath();
	canvas.stroke();
	*/

	canvas.fillRect(this.x-BLOCK_MEDIAN,this.y-BLOCK_MEDIAN, BLOCK_WIDTH, BLOCK_WIDTH);
}

/*
	Block
*/
function Block(centerX, centerY) {
	this.centerX = centerX;
	this.centerY = centerY;
}

Block.prototype.getX = function() {
	return this.centerX;
}

Block.prototype.getY = function() {
	return this.centerY;
}

Block.prototype.moveUp = function(squares) {
	for(var i=0; i<squares.length; i++) {
		squares[i].moveUp();
	};
}

Block.prototype.moveDown = function(squares) {

	this.centerY = this.centerY + 2*BLOCK_MEDIAN;

	for(var i=0; i<squares.length; i++) {
		squares[i].moveDown();
	};
}

Block.prototype.moveLeft = function(squares) {
	for(var i=0; i<squares.length; i++) {
		squares[i].moveLeft();
	};
}

Block.prototype.moveRight = function(squares) {
	for(var i=0; i<squares.length; i++) {
		squares[i].moveRight();
	};
}

Block.prototype.rotate = function(squares, centerX, centerY) {
	for(var i=0; i<squares.length; i++) {
		squares[i].x -= centerX;
		squares[i].y -= centerY;

		squares[i].rotate();

		squares[i].x += centerX;
		squares[i].y += centerY;
	};
}

Block.prototype.clear = function(squares) {
	for(var i=0; i<squares.length; i++) {
		squares[i].clear();
	};
}

Block.prototype.draw = function(squares) {
	for(var i=0; i<squares.length; i++) {
		squares[i].draw();
	};
}

/*
	OBlock Type
*/
function OBlock(centerX, centerY) {
	Block.call(this, centerX, centerY);
	
	var squares = new Array();
	squares.push( new Square(centerX-BLOCK_MEDIAN, centerY-BLOCK_MEDIAN, WHITE) );
	squares.push( new Square(centerX+BLOCK_MEDIAN, centerY-BLOCK_MEDIAN, WHITE) );
	squares.push( new Square(centerX-BLOCK_MEDIAN, centerY+BLOCK_MEDIAN, WHITE) );
	squares.push( new Square(centerX+BLOCK_MEDIAN, centerY+BLOCK_MEDIAN, WHITE) );
	
	this.squares = squares;
	
	this.moveUp = function() {
		Block.prototype.moveUp(squares);
	}
	
	this.moveDown = function() {
		Block.prototype.moveDown(squares);
	}
	
	this.moveLeft = function() {
		Block.prototype.moveLeft(squares);
	}
	
	this.moveRight = function() {
		Block.prototype.moveRight(squares);
	}

	this.rotate = function() {
		Block.prototype.rotate(squares, centerX, centerY);
	}
	
	this.draw = function() {
		Block.prototype.draw(squares);
	}
	
	this.clear = function() {
		Block.prototype.clear(squares);
	}
}

OBlock.prototype = new Block();
OBlock.prototype.constructor = OBlock;

/*
	TBlock Type
*/
function TBlock(centerX, centerY) {
	Block.call(this, centerX, centerY);
	
	var squares = new Array();
	squares.push( new Square(centerX, centerY-2*BLOCK_MEDIAN, BLUE) );
	squares.push( new Square(centerX, centerY, BLUE) );
	squares.push( new Square(centerX-2*BLOCK_MEDIAN, centerY, BLUE) );
	squares.push( new Square(centerX+2*BLOCK_MEDIAN, centerY, BLUE) );
	
	this.squares = squares;
	
	this.moveUp = function() {
		Block.prototype.moveUp(squares);
	}
	
	this.moveDown = function() {
		Block.prototype.moveDown(squares);
	}
	
	this.moveLeft = function() {
		Block.prototype.moveLeft(squares);
	}
	
	this.moveRight = function() {
		Block.prototype.moveRight(squares);
	}
	
	this.rotate = function() {
		Block.prototype.rotate(squares, centerX, centerY);
	}

	this.draw = function() {
		Block.prototype.draw(squares);
	}
	
	this.clear = function() {
		Block.prototype.clear(squares);
	}
}

TBlock.prototype = new Block();
TBlock.prototype.constructor = TBlock;

/*
	IBlock Type
*/
function IBlock(centerX, centerY) {
	Block.call(this, centerX, centerY);
	
	var squares = new Array();
	squares.push( new Square(centerX, centerY, CYAN) );
	squares.push( new Square(centerX, centerY-2*BLOCK_MEDIAN, CYAN) );
	squares.push( new Square(centerX, centerY+2*BLOCK_MEDIAN, CYAN) );
	squares.push( new Square(centerX, centerY+4*BLOCK_MEDIAN, CYAN) );
	
	this.squares = squares;
	
	this.moveUp = function() {
		Block.prototype.moveUp(squares);
	}
	
	this.moveDown = function() {
		Block.prototype.moveDown(squares);
	}
	
	this.moveLeft = function() {
		Block.prototype.moveLeft(squares);
	}
	
	this.moveRight = function() {
		Block.prototype.moveRight(squares);
	}
	
	this.rotate = function() {
		Block.prototype.rotate(squares, centerX, centerY);
	}

	this.draw = function() {
		Block.prototype.draw(squares);
	}
	
	this.clear = function() {
		Block.prototype.clear(squares);
	}
}

IBlock.prototype = new Block();
IBlock.prototype.constructor = IBlock;

/*
	JBlock Type
*/
function JBlock(centerX, centerY) {
	Block.call(this, centerX, centerY);
	
	var squares = new Array();
	squares.push( new Square(centerX, centerY, PURPLE) );
	squares.push( new Square(centerX+2*BLOCK_MEDIAN, centerY, PURPLE) );
	squares.push( new Square(centerX-2*BLOCK_MEDIAN, centerY, PURPLE) );
	squares.push( new Square(centerX-2*BLOCK_MEDIAN, centerY-2*BLOCK_MEDIAN, PURPLE) );
	
	this.squares = squares;
	
	this.moveUp = function() {
		Block.prototype.moveUp(squares);
	}
	
	this.moveDown = function() {
		Block.prototype.moveDown(squares);
	}
	
	this.moveLeft = function() {
		Block.prototype.moveLeft(squares);
	}
	
	this.moveRight = function() {
		Block.prototype.moveRight(squares);
	}
	
	this.rotate = function() {
		Block.prototype.rotate(squares, centerX, centerY);
	}

	this.draw = function() {
		Block.prototype.draw(squares);
	}
	
	this.clear = function() {
		Block.prototype.clear(squares);
	}
}

JBlock.prototype = new Block();
JBlock.prototype.constructor = JBlock;

/*
	LBlock Type
*/
function LBlock(centerX, centerY) {
	Block.call(this, centerX, centerY);
	
	var squares = new Array();
	squares.push( new Square(centerX, centerY, PINK) );
	squares.push( new Square(centerX-2*BLOCK_MEDIAN, centerY, PINK) );
	squares.push( new Square(centerX+2*BLOCK_MEDIAN, centerY, PINK) );
	squares.push( new Square(centerX+2*BLOCK_MEDIAN, centerY-2*BLOCK_MEDIAN, PINK) );
	
	this.squares = squares;
	
	this.moveUp = function() {
		Block.prototype.moveUp(squares);
	}
	
	this.moveDown = function() {
		Block.prototype.moveDown(squares);
	}
	
	this.moveLeft = function() {
		Block.prototype.moveLeft(squares);
	}
	
	this.moveRight = function() {
		Block.prototype.moveRight(squares);
	}
	
	this.rotate = function() {
		Block.prototype.rotate(squares, centerX, centerY);
	}

	this.draw = function() {
		Block.prototype.draw(squares);
	}
	
	this.clear = function() {
		Block.prototype.clear(squares);
	}
}

LBlock.prototype = new Block();
LBlock.prototype.constructor = LBlock;

/*
	SBlock Type
*/
function SBlock(centerX, centerY) {
	Block.call(this, centerX, centerY);
	
	var squares = new Array();
	squares.push( new Square(centerX, centerY, YELLOW) );
	squares.push( new Square(centerX+2*BLOCK_MEDIAN, centerY, YELLOW) );
	squares.push( new Square(centerX, centerY+2*BLOCK_MEDIAN, YELLOW) );
	squares.push( new Square(centerX-2*BLOCK_MEDIAN, centerY+2*BLOCK_MEDIAN, YELLOW) );
	
	this.squares = squares;
	
	this.moveUp = function() {
		Block.prototype.moveUp(squares);
	}
	
	this.moveDown = function() {
		Block.prototype.moveDown(squares);
	}
	
	this.moveLeft = function() {
		Block.prototype.moveLeft(squares);
	}
	
	this.moveRight = function() {
		Block.prototype.moveRight(squares);
	}
	
	this.rotate = function() {
		Block.prototype.rotate(squares, centerX, centerY);
	}
	
	this.draw = function() {
		Block.prototype.draw(squares);
	}
	
	this.clear = function() {
		Block.prototype.clear(squares);
	}
}

SBlock.prototype = new Block();
SBlock.prototype.constructor = SBlock;

/*
	ZBlock Type
*/
function ZBlock(centerX, centerY) {
	Block.call(this, centerX, centerY);
	
	var squares = new Array();
	squares.push( new Square(centerX, centerY, ORANGE) );
	squares.push( new Square(centerX-2*BLOCK_MEDIAN, centerY, ORANGE) );
	squares.push( new Square(centerX, centerY+2*BLOCK_MEDIAN, ORANGE) );
	squares.push( new Square(centerX+2*BLOCK_MEDIAN, centerY+2*BLOCK_MEDIAN, ORANGE) );
	this.squares = squares;

	this.centerX = centerX;
	this.centerY = centerY;
	

	this.moveUp = function() {
		Block.prototype.moveUp(squares);
	}
	
	this.moveDown = function() {
		Block.prototype.moveDown(squares);
	}
	
	this.moveLeft = function() {
		Block.prototype.moveLeft(squares);
	}
	
	this.moveRight = function() {
		Block.prototype.moveRight(squares);
	}
	
	this.rotate = function() {
		Block.prototype.rotate(squares, centerX, centerY);
	}

	this.draw = function() {
		Block.prototype.draw(squares);
	}
	
	this.clear = function() {
		Block.prototype.clear(squares);
	}
	this.getX = function() {
		return Block.prototype.getX();
	}
	this.getY = function() {
		return Block.prototype.getY();
	}
}

ZBlock.prototype = new Block();
ZBlock.prototype.constructor = ZBlock;

/*
	Event Handlers
*/
function keyDown() {
	switch (event.keyCode) {
		case 37:
			square2.clear();
			square2.moveLeft();
			square2.draw();
			
			oblock.clear();
			oblock.moveLeft();
			oblock.draw();
		break;
	
		case 38:
			square2.clear();
			square2.moveUp();
			square2.draw();
			
			oblock.clear();
			oblock.moveUp();
			oblock.draw();
		break;
		
		case 39:
			square2.clear();
			square2.moveRight();
			square2.draw();
			
			oblock.clear();
			oblock.moveRight();
			oblock.draw();
		break;
	
		case 40:
			square2.clear();
			square2.moveDown();
			square2.draw();
			
			zblock.clear();
			zblock.moveDown();
			//moveDown.apply(zblock);
			zblock.draw();
		break;

		//"R" button for rotate
		case 82:
			square2.clear();
			square2.rotate();
			square2.draw();
			
			zblock.clear();
			zblock.rotate();
			zblock.draw();
		break;
	}
}

window.addEventListener("load", loadGame, false);
window.addEventListener('keydown', keyDown, false);
