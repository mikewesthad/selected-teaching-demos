/*
	Music visualizer
	
	Since this sketch loads a sound file, it *needs* to be viewed through a 
	local server.

	1. Grab an mp3 track (soundcloud is a good place to find free downloads)
	2. Save it to the "assets/" folder
	3. Load the sound in a preload() function
	4. Play the sound in the setup() function
	5. Visualize and play with the sound in draw()

	Note: each browser supports a different set of sound file format.  To ensure
	compatibility, you need your track in multiple formats.  Check out this p5
	example: http://p5js.org/examples/examples/Sound_soundFormats.php

	New p5 variables and functions:
		preload()
		loadSound
		SoundFile.play()
		SoundFile.getLevel(...)
		SoundFile.rate(...)
*/ 


// GLOBAL VARIABLES
var musicTrack; 
// This needs to be global so we can access it from preload, setup & draw


// preload() runs before anything else
function preload() {

	// It is convention to keep your assets (images, sounds, etc.) in assets/
	musicTrack = loadSound("assets/CarriedAway_DillonFrancisRemix.mp3");

	// Don't leave this function empty!
	// If you leave it empty, your sketch may never load.  If you don't need
	// preload for your sketch, go ahead and delete the function.
}


// setup() runs ONLY after preload is finished loading
function setup() {
	createCanvas(windowWidth, windowHeight);
	musicTrack.loop(); // Start the music playing
	background(0); // Initialize the screen with a coat of black
}


// draw() runs after setup is done
function draw() {

	// Slowly clears the screen with a transparent black
	background(0, 0, 0, 20);

	// Map the mouseX to a playback speed for the track
	var speed = map(mouseX, 0, width, 0.05, 1);
	musicTrack.rate(speed);

	// Styling for drawing
	fill(255, 255, 255);
	stroke(255, 204, 0);
	strokeWeight(25);

	// Get the volume of the track.
	// Passing a parameter to getLevel smooths out the levels so we get a value
	// that is less "jumpy."  This doesn't actually change the playback volume
	// that we hear through the speakers. 
	var level = musicTrack.getLevel(0.25);  
	// Map the level to the radius of an ellipse.  The level is a value between
	// 0 and 1.
	var radius = map(level, 0, 1, 0, width/2);	
	ellipse(width/2, height/2, radius, radius);

}
