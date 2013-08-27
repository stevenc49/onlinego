//code for grid from: http://jsfiddle.net/alnitak/xN45K/
//firefox mouse event fix from: http://stackoverflow.com/questions/12704686/html5-with-jquery-e-offsetx-is-undefined-in-firefox

function loadGame() {
	// block size
	var size = 32;

	// get some info about the canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	// load go board
	//var imageObj = new Image();
	
	//imageObj.onload = function() {
	//	ctx.drawImage(imageObj, 0, 0, canvas.width, canvas.height);
	//}

	//imageObj.src = 'http://www.mashbout.com/wp-content/uploads/2013/06/Blank_Go_board.png';
	//imageObj.src = 'Blank_Go_board.png';
	
	// how many cells fit on the canvas
	var w = ~~ (canvas.width / size);
	var h = ~~ (canvas.height / size);

	//var w = 19;
	//var h = 19;

	// create empty state array
	var state = new Array();
	//var state = [];
	//state.length = 0;	

	for (var y = 0; y < h; ++y) {
	    state[y] = new Array(w);
		//state[y] = [];
		//state[y].length[w]
	}

	// Helper Functions
	function clearBoard() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function clearCell(x, y) {
		ctx.clearRect((x*size), (y*size), size, size);
	}

	// keyboard event, testing purposes
	//$(document).keydown(function(e) {
	//	if(e.which == 76) {
	//		clearBoard();
	//});

	// click event, using jQuery for cross-browser convenience
	$(canvas).click(function(e) {

		console.log("Mouse Click Detected");

	    // quick fill function to save repeating myself later
	    function fill(oc, ic, gx, gy) {
			
			// Gradient offset
			var grdOffset = (size/4)+1;

			// Create gradient
			var grd = ctx.createRadialGradient((gx * size)+grdOffset, (gy * size)+grdOffset, 1, (gx * size)+grdOffset, (gy * size)+grdOffset, 20)
			grd.addColorStop(0, ic);
			grd.addColorStop(1, oc);

			ctx.beginPath();
			//ctx.fillRect(gx * size, gy * size, size, size);
	   		ctx.arc((gx * size)+16, (gy * size)+16, (size/2)-1, 0, 2 * Math.PI, false);
			ctx.fillStyle = grd;
			//ctx.fillStyle = s;
			ctx.fill();
			ctx.closePath(); 
		}

	    // get mouse click position
	    var mx = e.offsetX;
	    var my = e.offsetY;

		// if this browser firefox, define these
		if( (e.offsetX || e.offsetY) == undefined) {
			mx = e.pageX-$('canvas').offset().left;
			my = e.pageY-$('canvas').offset().top;
		}

	    // calculate grid square numbers
	    var gx = ~~ (mx / size);
	    var gy = ~~ (my / size);
	    
	    // make sure we're in bounds
	    if (gx < 0 || gx >= w || gy < 0 || gy >= h) {
		return;
	    }

	    if (state[gy][gx]) {
		// if pressed before, flash red
			//fill('grey', 'white', gx, gy);
			state[gy][gx] = false;
			//ctx.clearRect((gx * size), (gy * size), size, size);			
			clearCell(gx, gy);

			//ctx.clearRect(gx, gy, (gx * size)-1, (gy * size)-1);
			//setTimeout(function() {
		    //	fill('black', 'grey', gx, gy)
				//ctx.clearRect(gx, gy, (gx*size), (gy*size));
			//}, 1000);
	    } else {
			state[gy][gx] = true;
			fill('black', 'grey', gx, gy);
	    }
	});
}

window.addEventListener("load", loadGame, false);
