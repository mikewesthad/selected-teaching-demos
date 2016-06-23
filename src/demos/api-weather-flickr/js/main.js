// _____________________________________________________________________________
// Setting up API requests

// For OpenWeatherMap, we want to get the 15 day forecast in imperial units, 
// because our brains can't think in the crazy crazy metric system.
var owmEndpoint = "http://api.openweathermap.org/data/2.5/forecast/daily";
var owmParameters = {
	"mode": "json",
	"units": "imperial",
	"cnt": "15",
	"appid": "a50c6ea2b89ef47f2b4da5cbb3c8b2ff"
}

// For flickr, we want to perform a photo search for interesting images from
// the location that the user searched.  We'll get the 10 most interesting 
// images to give us some options from which to choose.
// 	https://www.flickr.com/services/api/flickr.photos.search.html
var flickrEndpoint = "https://api.flickr.com/services/rest/";
var flickrParameters = {
	"method": "flickr.photos.search",
	"api_key": "0e9a3b35d1051515bd41a61b8250c175",
	"format": "json",
	"per_page": "10",
	"page": "1",
	"nojsoncallback": "1",
	"media": "1",
	"sort": "interestingness-desc"
};



// _____________________________________________________________________________
// Getting elements from the DOM

var form = document.getElementById("city-search-form");
var wrapDiv = document.getElementById("wrap");
var weatherCard = document.querySelector(".weather-card");
var weatherCardWrap = document.getElementById("weather-cards-wrap");
var weatherBackground = document.getElementById("background");

weatherCardWrap.removeChild(weatherCard);


// _____________________________________________________________________________
// Setting up the events so that the APIs are called when a query is entered 
// into the form

form.onsubmit = function (event) {
	event.preventDefault();

	var cityName = form.elements["city-name"].value;

	owmParameters.q = cityName;
	var owmCall = buildApiRequest(owmEndpoint, owmParameters);
	// NOTE: This next line is something I've had to add after the class. Since I'm
	// hosting this via HTTPS, no APIs can be reached via HTTP. Instead, this 
	// request is going to be forwarded through a node app of mine: 
	owmCall = "https://api-forwarding.herokuapp.com/?url=" + 
		encodeURIComponent(owmCall);
	callApi(owmCall, processWeatherReport);

	flickrParameters.text = cityName;
	var flickrCall = buildApiRequest(flickrEndpoint, flickrParameters);
	callApi(flickrCall, processFlickr);
}

// Make the weather report clear when the text inside the form is changed
form.elements["city-name"].oninput = clearWeatherReport;
// Make the search bar get focus as soon as the page loads (e.g. as if the user
// had clicked within the text input)
form.elements["city-name"].focus();


// _____________________________________________________________________________
// Weather Reporting Functions

function clearWeatherReport() {
	weatherCardWrap.innerHTML = "";
}

function processWeatherReport () {
	if (this.readyState === 4 && this.status === 200) {
		var jsonResponse = JSON.parse(this.responseText);

		// Clear any cards on the screen
		clearWeatherReport();

		// Loop through the daily reports
		var dailyReports = jsonResponse.list;
		var numDays = dailyReports.length;
		for (var i = 0; i < numDays; i += 1) {
			var dayReport = dailyReports[i];

			// Pull the data from the daily report
			var highTemp = Math.round(dayReport.temp.max);
			var lowTemp = Math.round(dayReport.temp.min);
			var weatherId = dayReport.weather[0].id;
			var windSpeed = mphToBeaufort(dayReport.speed);
			var windDirection = dayReport.deg;

			// Use the dt from the report to calculate the date.  The dt is in 
			// seconds, but the Date object wants to get milliseconds
			var date = new Date(dayReport.dt * 1000);
			var day = dayNumToString(date.getDay());

			// Clone the weather card template
			var clonedCard = weatherCard.cloneNode(true);
			// Animate the card so that it fades in
			clonedCard.style.display = "inline-block";
			clonedCard.className += " animated fadeIn";
			// Fill out the clone with the day and temps
			clonedCard.querySelector(".day").textContent = day;
			clonedCard.querySelector(".max-temp").textContent = highTemp;
			clonedCard.querySelector(".min-temp").textContent = lowTemp;
			// Get the fontawesome icons from the clone
			var weatherIcon = clonedCard.querySelector(".weather");
			var windDirIcon = clonedCard.querySelector(".wind-direction");
			var windSpeedIcon = clonedCard.querySelector(".wind-speed");
			// Update the fontawesome icons to fit the current weather
			weatherIcon.className += " wi wi-owm-" + weatherId;
			windDirIcon.className += " wi wi-wind towards-" + windDirection + "-deg";
			windSpeedIcon.className += " wi wi-wind-beaufort-" + windSpeed;
		
			// Add the clone to the page
			weatherCardWrap.appendChild(clonedCard);
		}
	}
}

function dayNumToString(d) {
	if (d === 0) return "SUN";
	if (d === 1) return "MON";
	if (d === 2) return "TUE";
	if (d === 3) return "WED";
	if (d === 4) return "THU";
	if (d === 5) return "FRI";
	if (d === 6) return "SAT";
}

function mphToBeaufort(mph) {
	if (mph < 0.7) return 0;
	if (mph < 3.4) return 1;
	if (mph < 7.4) return 2;
	if (mph < 12.2) return 3;
	if (mph < 17.9) return 4;
	if (mph < 24.1) return 5;
	if (mph < 31) return 6;
	if (mph < 38.4) return 7;
	if (mph < 46.3) return 8;
	if (mph < 54.8) return 9;
	if (mph < 63.9) return 10;
	if (mph < 72.9) return 11;
	return 12;
}


// _____________________________________________________________________________
// Flickr Grabbing Functions

function processFlickr() {
	if (this.readyState === 4 && this.status === 200) {
		var jsonResponse = JSON.parse(this.responseText);
		var searchResults = jsonResponse["photos"]["photo"];

		// Pick a random image from the flickr results
		var numResults = searchResults.length;
		var randomIndex = Math.floor(Math.random() * numResults);
		var randomResult = searchResults[randomIndex];

		// Once we have an image, we can figure out the URL for that particular 
		// image:
		// 	https://www.flickr.com/services/api/misc.urls.html
		var id = randomResult["id"];
		var secret = randomResult["secret"]; 
		var server = randomResult["server"]; 
		var farm = randomResult["farm"];  
		var photoURL = "https://farm" + farm + ".staticflickr.com/";
		photoURL += server + "/" + id + "_" + secret + "_z.jpg";

		// Update the background image to be the flickr URL
		weatherBackground.style.backgroundImage = "url('" + photoURL + "')";

	}	
}
