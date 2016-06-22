/*
	Interactive APIs

	Now that we know how to make a call to an API and process the response, we 
	can make the process interactive by using forms!
*/


// _____________________________________________________________________________
// CACHING DOM ELEMENTS

// Wrappers
var favoritesDiv = document.getElementById("favorites");
// Templates
var favoriteMovieDisplayTemplate = document.querySelector(".favorite-display");
favoritesDiv.removeChild(favoriteMovieDisplayTemplate);



// _____________________________________________________________________________
// SETUP

// Load & render the favorites
var movieFavorites = new StorableData("movieFavorites");
renderFavorites();


// _____________________________________________________________________________
// DISPLAYING FAVORITES AND MAKING THEM INTERACTIVE

function renderFavorites() {
	favoritesDiv.innerHTML = "";
	for (var i = 0; i < movieFavorites.getLength(); i++) {
		var fav = movieFavorites.get(i);
		var clone = favoriteMovieDisplayTemplate.cloneNode(true);
		clone.dataset.index = i;
		clone.querySelector(".title").textContent = fav.title;
		
		if (fav.backdrop_path) {
			var base = "http://image.tmdb.org/t/p/";
			var posterSize = "w780";
			var url = base + posterSize + fav.backdrop_path;
			clone.querySelector(".poster").src = url;
		}	
		favoritesDiv.appendChild(clone);
	}
}

favoritesDiv.onclick = function (event) {
	if (event.target.classList.contains("remove-button")) {
		var favoriteDisplay = event.target.parentElement.parentElement;
		var favoriteIndex = favoriteDisplay.dataset.index;
		movieFavorites.delete(favoriteIndex);
		renderFavorites();
	}
};