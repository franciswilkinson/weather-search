var cities = ["London"];
var city = "London";
var Day = [0,1,2,3,4,5];

console.log(cities);
renderButtons();
// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayWeatherInfo() {

// Add your own API key between the ""
var APIKey = "30deb5d8ff82c53f9be157c4f5caa581";

var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q={" + city + "}&limit=5&appid=" + APIKey;
// Here we are building the URL we need to query the database

// We then created an Fetch call
fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {

    // Create CODE HERE to Log the queryURL
    console.log(queryURL);
    // Create CODE HERE to log the resulting object
    console.log(data)
    console.log(data[0].lat);
    console.log(data[0].lon);

    queryURL2 = "https://api.openweathermap.org/data/2.5/forecast?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=" + APIKey;
    fetch(queryURL2)
  .then(function (response) {
    return response.json();
  })
  .then(function (data2) {
    console.log(data2);
    // Transfer content to HTML
    // Convert the temp to Celsius
    for(var i=0; i<=5; i++){
    var tempC = data2.list[i*8].main.temp - 273.15;
      console.log(tempC);
    // add temp content to html
    
    $(".tempC").text("Temperature (C) " + tempC.toFixed(2));
    $(".city-weather").html("<h1>" + city + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + data2.list[i*8].wind.speed);
    $(".humidity").text("Humidity: " + data2.list[i*8].main.humidity);
    }
    //list[1].dt_txt
    
  })
  
    $("#time-heading").text(dayjs().format("DD/MM/YYYY"));

  
  });
}
  // Function for displaying data
function renderButtons() {

  // Deletes the buttons prior to adding new cities
  // (this is necessary otherwise you will have repeat buttons)
  $("#history").empty();

  // Loops through the array of cities
  for (var i = 0; i < cities.length; i++) {

    // Then dynamicaly generates buttons for each city in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adds a class of city to our button
    a.addClass("city");
    // Added a data-attribute
    a.attr("data-name", cities[i]);
    // Provided the initial button text
    a.text(cities[i]);
    // Added the button to the buttons-view div
    $("#history").append(a);
  }
}

// This function handles events where the search button is clicked
$("#search-button").on("click", function (event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  city = $("#search-input").val().trim();
  console.log(city);
  // The city from the textbox is then added to our array
  cities.push(city);
  console.log(cities);

  displayWeatherInfo();

  localStorage.setItem('#search-input', city);


  // Calling renderButtons which handles the processing of our cities array
  renderButtons();
  return city;

});

  console.log(city);
  console.log(cities);
// Adding click event listeners to all elements with a class of "city"
$(document).on("click", ".city", displayWeatherInfo);
// localStorage.getItem('#search-input', city);


// Calling the renderButtons function to display the initial buttons
renderButtons();