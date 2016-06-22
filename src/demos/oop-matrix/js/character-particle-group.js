/*
	CharacterParticleGroup
	
	A class that creates, updates and draws a whole mess of CharacterParticles.
*/

function CharacterParticleGroup(size) {
	this.particles = [];

	// Create the number of particles specified and store them in the group
	for (var i = 0; i < size; i += 1) {
		var x = random(0, width);
		var y = random(0, height);
		var xVelocity = 0;
		var yVelocity = random(2, 4);
		var color = [41, random(200, 255), 123]; // Random green color
		var particle = new CharacterParticle("A", x, y, xVelocity, yVelocity, color);
		this.particles.push(particle);
	}
}


CharacterParticleGroup.prototype.update = function () {
	for (var i = 0; i < this.particles.length; i++) {
		this.particles[i].update(); 
	}
};


CharacterParticleGroup.prototype.draw = function () {
	for (var i = 0; i < this.particles.length; i++) {
		this.particles[i].draw(); 
	}
};
