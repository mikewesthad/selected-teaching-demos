/*
	Matrix™ Falling Text

	See assignment.txt.
*/ 


var particleGroup;


function getRandomCharacter() {
	// The char(...) function from p5 takes a number and converts it into a 
	// character using an ASCII table.  ASCII is one of the standards for how 
	// letters get represented by a computer. 
	// Specifically, char(...) looks up the "Dec" column in this table: 
	// 	http://www.asciitable.com/
	// And then returns the "Char" column.
	var num = round(random(32, 255));
	var character = char(num);
	// This function skips the ASCII characters for 0 - 32 which won't display 
	// as anything visible. Using numbers between 65 and 90 would give 
	// uppercase letters only.
	return character;
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0); // Initial black coat of color
	textFont("Lucida Console"); // Set the font to be the font we loaded
	textSize(30); // Set the text size for the rest of the sketch
	particleGroup = new CharacterParticleGroup(700);
}


function draw() {
	background(0, 10); // Slowly clear to black
	particleGroup.update();
	particleGroup.draw();
}
