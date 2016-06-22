/*
	Interactivity - using the mouse!

	New p5 variables and functions:
		mouseIsPressed
		mouseButton
		mouseX, mouseY
*/ 


// Setup runs ONCE at the start of the sketch
function setup() {

	// Create a drawing surface
	createCanvas(windowWidth, windowHeight);	

	// Give the screen an initial color of black
	background(0);

}


// After setup is run, draw runs continuously at 60 fps
function draw() {

	// Regular solution: draw a opaque background
	// background(0);

	// EXTRA 2
	// Clear the screen using transparency - this creates a motion trail effect
	background(0, 0, 0, 5);

	// Pick a style
	fill(255, 255, 255);
	stroke(255, 204, 0);
	strokeWeight(10);

	// Draw a circle at the mouse position when the left mouse button is pressed
	if (mouseIsPressed) {
		if (mouseButton === LEFT) {

			// Regular solution: draw a single circle at the mouse position
			// ellipse(mouseX, mouseY, 100, 100);

			// EXTRA 4
			for (var radius = 20; radius <= 300; radius += 20) {
				fill(255, 0, 0, 3);
				noStroke();
				ellipse(mouseX, mouseY, radius, radius);
			}
		}		
		// EXTRA 3 
		else if (mouseButton === RIGHT) {
			background(0);
		}
	}

	// EXTRAS: 
	// 	1) Don't clear the screen at the start of draw().  What happens?
	// 	2) Instead of completely clearing the screen at the start of draw(), 
	// 	   draw a transparent background (try an alpha of 5).  Hint: you'll 
	// 	   probably want to start the background at an initial color in setup().
	// 	3) Now make the the screen clear when the user presses the right mouse
	//     button.
	//  4) Instead of drawing a single circle where the mouse is, draw a series
	//     of transparent, overlapping circles.  Hint: you'll want to *loop* 
	//     through a series of radius values...


}
