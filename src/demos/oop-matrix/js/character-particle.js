/*
	CharacterParticle
	
	A particle that draws a character to the screen.  It has a velocity and when
	the particle leaves the screen, it wraps around to the other side, 
	asteroids-style.
*/

function CharacterParticle(character, x, y, xVeloctiy, yVelocity, fillColor) {
	this.character = character; // Character to draw on the screen
	this.x = x;
	this.y = y;
	this.xVelocity = xVeloctiy;
	this.yVelocity = yVelocity;
	this.fillColor = fillColor; 
}


// update() moves the particle, checks the boundries and changes the particle's
// character
CharacterParticle.prototype.update = function () {
	// BONUS 1
	// this.xVelocity = map(mouseX, 0, width, -10, 10);
	// this.yVelocity = map(mouseY, 0, height, -10, 10);

	this.x += this.xVelocity;
	this.y += this.yVelocity;

	// Instead of bouncing, these character particles wrap around the screen.  
	// If they move off the bottom edge of the screen, they should appear back
	// at the top of the screen.
	if (this.y > height) {
		this.y = 0;
	}
	else if (this.y < 0) {
		this.y = height;
	}
	if (this.x > width) {
		this.x = 0;
	}
	else if (this.x < 0) {
		this.x = width;
	}

	this.changeCharacter();
};


CharacterParticle.prototype.changeCharacter = function () {
	// The char(...) function from p5 takes a number and converts it into a 
	// character using an ASCII table.  ASCII is one of the standards for how 
	// letters get represented by a computer. 
	// Specifically, char(...) looks up the "Dec" column in this table: 
	// 	http://www.asciitable.com/
	// And then returns the "Char" column.
	var num = round(random(32, 255));
	var newCharacter = char(num);
	// This function skips the ASCII characters for 0 - 32 which won't display 
	// as anything visible.  Using numbers between 65 and 90 would give 
	// uppercase letters only.
	this.character = newCharacter;
}


CharacterParticle.prototype.draw = function () {
	// BONUS 2: let the mouse position control HSB	
	// colorMode(HSB, 360, 100, 100);	
	// var h = map(mouseX, 0, width, 0, 360);
	// var s = map(mouseY, 0, height, 0, 100);
	// fill(h, s, 100);	
	
	stroke(0);
	strokeWeight(1);
	fill(this.fillColor);
	text(this.character, this.x, this.y);
}