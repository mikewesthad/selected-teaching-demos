/*
	Interactive APIs

	Now that we know how to make a call to an API and process the response, we 
	can make the process interactive by using forms!
*/


// _____________________________________________________________________________
// CACHING DOM ELEMENTS

// Search form
var dataForm = document.getElementById("movie-form");
var movieNameInput = dataForm.elements["movie-name"];
movieNameInput.focus(); // Give the search bar focus when the page loads
// Wrappers
var searchResultsDiv = document.getElementById("search-results");
// Templates
var movieDisplayTemplate = document.querySelector(".movie-result");
searchResultsDiv.removeChild(movieDisplayTemplate);


// _____________________________________________________________________________
// SETUP

// Load & render the favorites
var movieFavorites = new StorableData("movieFavorites");

// Set up the movie searh API request information
var movieEndpoint = "http://api.themoviedb.org/3/search/movie";
var movieParameters = { 
	api_key: "90310868ad519e2d04de29e0873f434b",
	movie: "",
	page: "1"
}

// Global variable to hold onto the search results
var searchResults;


// _____________________________________________________________________________
// SEARCH FORM API REQUEST

dataForm.onsubmit = function (event) {
	event.preventDefault(); // Hey browser-dude, don't refresh the page onsubmit
	
	// Validate input
	var movieName = movieNameInput.value;
	if (movieName === "") return false;

	// Call API
	movieParameters.query = movieName; // Modify only one parameter
	var movieSearchCaller = new ApiCaller(movieEndpoint, movieParameters);
	movieSearchCaller.getJson(displayMovieData);
}

function displayMovieData(jsonMovie) {
	console.log(jsonMovie)
	searchResultsDiv.innerHTML = ""; // Clear previous search results
	var movies = jsonMovie.results;
	searchResults = movies; // Store the searchResults globally for use later
	for (var i = 0; i < movies.length; i += 1) {	
		var movie = movies[i];
		var clone = movieDisplayTemplate.cloneNode(true);
		clone.dataset.index = i;	 
		clone.querySelector(".title").textContent = movie.title;
		clone.querySelector(".plot").textContent = movie.overview;
		clone.querySelector(".release-date").textContent = movie.release_date;
		clone.querySelector(".popularity").textContent = movie.popularity;
		if (movie.poster_path) {
			var base = "http://image.tmdb.org/t/p/";
			var posterSize = "w154";
			var url = base + posterSize + movie.poster_path;
			clone.querySelector(".poster").src = url;
		}	
		searchResultsDiv.appendChild(clone);
	}
}


// _____________________________________________________________________________
// ADDING SEARCH RESULTS TO FAVORITES

searchResultsDiv.onclick = function (event) {
	if (event.target.classList.contains("favorite-button")) {		
		var favoriteButton = event.target;
		favoriteButton.className = "favorite-added fa fa-check-circle";

		var movieDisplay = favoriteButton.parentElement.parentElement;
		var movieIndex = movieDisplay.dataset.index;
		var movieData = searchResults[movieIndex];
		movieFavorites.add(movieData);
	}
};
