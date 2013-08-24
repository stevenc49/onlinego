//code for grid from: http://jsfiddle.net/alnitak/xN45K/
//firefox mouse event fix from: http://stackoverflow.com/questions/12704686/html5-with-jquery-e-offsetx-is-undefined-in-firefox

function loadGame() {
	// block size`
	var size = 20;

	// get some info about the canvas
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');

	// how many cells fit on the canvas
	var w = ~~ (canvas.width / size);
	var h = ~~ (canvas.height / size);

	// create empty state array
	var state = new Array();
	//var state = [];
	//state.length = 0;	

	for (var y = 0; y < h; ++y) {
	    state[y] = new Array(w);
		//state[y] = [];
		//state[y].length[w]
	}

	// click event, using jQuery for cross-browser convenience
	$(canvas).click(function(e) {

	    // quick fill function to save repeating myself later
	    function fill(s, gx, gy) {
			ctx.fillStyle = s;
			ctx.fillRect(gx * size, gy * size, size, size);
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
			fill('red', gx, gy);
			setTimeout(function() {
		    	fill('black', gx, gy)
			}, 1000);
	    } else {
			state[gy][gx] = true;
			fill('black', gx, gy);
	    }
	});
}

window.addEventListener("load", loadGame, false);
