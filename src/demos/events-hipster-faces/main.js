/*
	HIPSTER MIX-AND-MATCH

	We're going to create a hipster face in which we can click to mix &	match 
	the different components of the hipster face: glasses, mustache or bowtie.

	Check out index.html.  The page is super simple - just three images in a 
	wrapper.  Check out the "images/" folder.  I've given you 6 of each type of 
	image: bowties, glasses and mustaches.

	The goal is that when someone clicks on a component of the face (e.g. bowtie) 
	that the img element cycles through the 6 images for that component 
	(e.g. bowtie1 -> bowtie2 -> bowtie3 -> ...).

			    (-(-_(-_-)_-)-)   (-(-_(-_-)_-)-)   (-(-_(-_-)_-)-)
*/


// _____________________________________________________________________________
// STEP 1 - get the DOM elements that we will need

// Get a reference to the <img> DOM elements
var glassesImg = document.getElementById("glasses");
var stasheImg = document.getElementById("stashe");
var bowtieImg = document.getElementById("bowtie");


// _____________________________________________________________________________
// STEP 2 - making the glasses interactive

// Define a function to make the glasses <img> interactive.  It will be bound to
// the onclick event of the <img>.  On every click, we want to load the next 
// glasses image in the sequence (e.g. the src changes from glasses1.gif to 
// glasses2.gif).  
// Hints: 
// 	- We will want a global variable that allows us to track where we are in 
//    the sequence of images. 
//  - This is a very similar task to what we did 25_Events_Basics with a 
// 	  click counter, except with one additional wrinkle...
// 	- Don't forget to bind the function to the onclick event

var glassesIndex = 1;
function glassesClick() {
	glassesIndex += 1;
	if (glassesIndex > 6) {
		glassesIndex = 1;
	}
	glassesImg.setAttribute("src", "images/glasses" + glassesIndex + ".gif");
}
glassesImg.onclick = glassesClick;


// _____________________________________________________________________________
// STEP 3 - making the mustashe and bowtie interactive

// Repeat step 2 for the other two <img> elements.

var stasheIndex = 1;
function stasheClick() {	
	stasheIndex += 1;
	if (stasheIndex > 6) {
		stasheIndex = 1;
	}
	stasheImg.setAttribute("src", "images/stashe" + stasheIndex + ".gif");
}
stasheImg.onclick = stasheClick;

var bowtieIndex = 1;
function bowtieClick() {
	bowtieIndex += 1;
	if (bowtieIndex > 6) {
		bowtieIndex = 1;
	}
	bowtieImg.setAttribute("src", "images/bowtie" + bowtieIndex + ".gif");
}
bowtieImg.onclick = bowtieClick;